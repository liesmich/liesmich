import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
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
