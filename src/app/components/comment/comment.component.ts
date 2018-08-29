import { Component, OnInit, Input } from '@angular/core';
import {Comment} from './comment.ts'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit {
@Input() sn: number = 0; //to change this var here to count+1 of entries in dexie db
@Input() id: number = 0;
@Input() category: string = "";

  constructor() { }

  ngOnInit() {
  }
  
  submitted = false;
  model = new Comment();
  insert_object = new Comment();
  
  onSubmit(comment) { 
	  this.submitted = true; 
	  this.model = new Comment(this.sn, this.id, this.category,comment);
	  console.log('new comment',this.model);

	  addComment(this.sn,this.id,this.category,comment);  
  }
  
  function addComment(sn,id,category,comment){
	  var db = new Dexie("comments-database");
	  db.version(1).stores({
		comments: "++sn, id, category, comment"
	  });
	  
	  db.open(); 
		db.transaction('rw', db.comments, function () {
			this.insert_object = {sn:sn,id:id,category:category,commentText:comment};
			db.comments.add(this.insert_object);
		}).catch(function(err) {
			console.error(err.stack || err);
		});    
  }

}
