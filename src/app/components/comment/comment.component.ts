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

  submitted = false;
  model = new Comment();
  insert_object = new Comment();
  
  constructor() { }

  ngOnInit() {
	  
  }
  
  onSubmit(comment) { 
	  this.submitted = true; 
	  addComment(this.sn,this.id,this.category,comment);  
  }
  
  function addComment(sn,id,category,comment){
	    var exist = false;
		var db = new Dexie("comments-database");
		db.version(1).stores({
			comments: "++sn, id, category, comment"
		});
	  
	    db.open(); 
		db.transaction('rw', db.comments, function () {
			db.comments.where({id: id, category: category}).count().then (function(c){
				if(c>0){
					exist = true;
				}
			}).then (function(c){
				if(!exist){
					this.insert_object = {sn:sn++,id:id,category:category,commentText:comment};
					db.comments.add(this.insert_object);	
				}else{
					var key;
					db.comments.where({id: id, category: category}).first(item => {
						key = item.sn;
					}).then (function(c){
						this.update_object = {commentText:comment};

						db.comments.update(key, this.update_object).then(function (updated) {
						  if (updated)
							console.log ("Updated comment.");
						  else
							console.log ("Nothing was updated.");
						});
					}.bind(this));
				}					
			}.bind(this));
			
		}).then(function (result) {
              alert ("New comment " + result);
	    }).catch(function(err) {
			console.error(err.stack || err);
		});    
  }

}
