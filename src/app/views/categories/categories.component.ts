import { Component, OnInit } from '@angular/core';
import { RowComponent } from '../../components/row/row.component';
import { swapiService, Rows } from '../../swapiService';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Rows = {rows: []};
  constructor(private svc: swapiService) { }

  ngOnInit() {
    this.svc.getCategories()
      .then((data) => this.categories = data);
  }

}
