/*
 * Package @liesmich/client
 * Source undefined
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { PostService } from './post.service';
import { ServerPostService } from './server-post.service';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    AppModule,
    ServerModule, // <--
    ServerTransferStateModule,
  ],
  providers: [
    {
      provide: PostService,
      useClass: ServerPostService,
    }
  ]
})
export class AppServerModule { }
