import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/services/stock.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  public performanceDate: string = "";
  public yesterdayPrice: string = "";
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.getQBUO().subscribe(data => {
      var parser = new DOMParser();
      var doc = parser.parseFromString(data.contents, 'text/html');

      this.performanceDate = doc.body.getElementsByClassName("performance-date")[0].textContent?.toString() || "";
      this.yesterdayPrice = doc.body.getElementsByClassName("yesterday-price")[0].getElementsByClassName("value")[0].textContent || "";
    })


  }
}
