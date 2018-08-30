import { Component, OnInit, Input } from '@angular/core';
import { RowComponent } from '../../components/row/row.component';
import { swapiService, Rows } from '../../swapiService';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  items: Rows = {rows: []};
  @Input() id: number = 2;
  @Input() category: string = "people";
	@Input() comment: string = "";

  constructor(private svc: swapiService) { }

  ngOnInit() {
    this.svc.getItemDetailsById(this.id,this.category)
      .then((data) => this.items = data);
  }
 
}
