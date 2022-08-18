import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/models/stock';
import { SharedService } from 'src/services/shared.service';
import { StockService } from 'src/services/stock.service';
import { UtilitiesService } from 'src/utilities/utilities.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  public stocks: Stock[] = [];
  public load = false;
  public lastUpdate = new Date().toLocaleString();
  public isMobile = false;

  constructor(
    private stockService: StockService,
    private utilitiesService: UtilitiesService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.messageSource.subscribe(data => {
      if (data)
        this.reload();
    });
    this.isMobile = this.utilitiesService.isMobile();
    this.utilitiesService.startSpinner();
    this.getQBUO();
  }

  getQBUO() {
    this.stockService.getQBUO().subscribe(data => {
      var parser = new DOMParser();
      var doc = parser.parseFromString(data.contents, 'text/html');
      this.stocks.push(this.parsePage(doc));
      this.getQBA8A();
    });
  }

  // TODO: spostare le chiamate per farle parallele e poi settare il load = true alla fine
  getQBA8A() {
    this.stockService.getQBA8A().subscribe(data => {
      var parser = new DOMParser();
      var doc = parser.parseFromString(data.contents, 'text/html');
      this.stocks.push(this.parsePage(doc));
      this.getQBFC();
    })
  }

  getQBFC() {
    this.stockService.getQBFC().subscribe(data => {
      var parser = new DOMParser();
      var doc = parser.parseFromString(data.contents, 'text/html');
      this.stocks.push(this.parsePage(doc));
      this.utilitiesService.stopSpinner();
      this.load = true;
      this.lastUpdate = new Date().toLocaleString();
    })
  }

  parsePage(doc: any): Stock {
    let s = new Stock;
    s.title = (doc.body as HTMLBodyElement).getElementsByTagName('h2')[0].innerHTML;
    s.performanceDate = doc.body.getElementsByClassName("performance-date")[0].textContent?.toString() || "";
    s.lastQuotationVariation = doc.body.getElementsByClassName("quotation last-quot-var")[0].getElementsByClassName("value")[0].textContent || "";
    s.quotationLastPrice = doc.body.getElementsByClassName("quotation last-price")[0].getElementsByClassName("value")[0].textContent || "";
    s.yesterdayPrice = doc.body.getElementsByClassName("yesterday-price")[0].textContent?.toString() || "";
    s.valueIsUp = !(s.lastQuotationVariation.indexOf("-") >= 0);
    return s;
  }

  reload() {
    this.utilitiesService.startSpinner();
    this.getQBUO();
  }
}
