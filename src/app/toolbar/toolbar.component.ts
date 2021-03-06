import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  reload() {
    this.sharedService.messageSource.next(true);
  }
}
