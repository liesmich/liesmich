/*
 * Package @liesmich/client
 * Source undefined
 */

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarkdownModule } from './components/markdown';
import { PostService } from './post.service';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    //GhComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    MarkdownModule,
    HttpClientModule,
  ],
  providers: [PostService],
})
export class AppModule { }
