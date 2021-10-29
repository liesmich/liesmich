import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { PostService } from './post.service';
import { ServerPostService } from './server-post.service';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: PostService,
      useClass: ServerPostService,
    }
  ]
})
export class AppServerModule { }
