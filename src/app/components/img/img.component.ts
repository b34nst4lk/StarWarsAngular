import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit {
@Input() label: string = "";
@Input() url: string = "";
@Input() id: number = 1;
@Input() category: string = "characters";

  constructor() { }

  ngOnInit() {
    const baseUrl = 'https://starwars-visualguide.com/assets/img';
	this.url = `${baseUrl}/${this.category}/${this.id+'.jpg'}`;
	console.log("url", this.url)
  }
}
