import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/services/stock.service';
import { UtilitiesService } from 'src/utilities/utilities.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  public performanceDate: string = "";
  public yesterdayPrice: string = "";
  public lastQuotationVariation: string = "";
  public quotationLastPrice: string = "";
  public load = false;
  public valueIsUp = true;
  public lastUpdate = new Date().toLocaleString();
  public isMobile = false;

  constructor(
    private stockService: StockService,
    private utilitiesService: UtilitiesService) { }

  ngOnInit(): void {
    this.isMobile = this.utilitiesService.isMobile();
    this.utilitiesService.startSpinner();
    this.getQBUO();
  }

  getQBUO() {
    this.stockService.getQBUO().subscribe(data => {
      var parser = new DOMParser();
      var doc = parser.parseFromString(data.contents, 'text/html');
      // console.log(doc.body);
      this.performanceDate = doc.body.getElementsByClassName("performance-date")[0].textContent?.toString() || "";
      this.lastQuotationVariation = doc.body.getElementsByClassName("quotation last-quot-var")[0].getElementsByClassName("value")[0].textContent || "";
      this.quotationLastPrice = doc.body.getElementsByClassName("quotation last-price")[0].getElementsByClassName("value")[0].textContent || "";
      this.yesterdayPrice = doc.body.getElementsByClassName("yesterday-price")[0].textContent?.toString() || "";

      if (this.lastQuotationVariation.indexOf("-") >= 0) {
        this.valueIsUp = false;
      }

      this.utilitiesService.stopSpinner();
      this.load = true;
      this.lastUpdate = new Date().toLocaleString();
    });
  }
}
