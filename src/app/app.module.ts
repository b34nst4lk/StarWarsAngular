import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { DetailsComponent } from './views/details/details.component';
import { CategoryItemsComponent } from './views/category-items/category-items.component';
import { RowComponent } from './components/row/row.component';
import { ImgComponent } from './components/img/img.component';
import { DetailsCardComponent } from './components/details-card/details-card.component';
import { CommentComponent } from './components/comment/comment.component';
import { swapiService } from './swapiService';

const appRoutes: Routes = [
  {path: "", component: CategoriesComponent},
  {path: ":category", component: CategoryItemsComponent},
  {path: ":category/:id", component: DetailsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    DetailsComponent,
    CategoryItemsComponent,
    RowComponent,
    ImgComponent,
    DetailsCardComponent,
    CommentComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [swapiService],
  bootstrap: [AppComponent]
})

export class AppModule { }