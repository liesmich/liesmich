/*
 * Package @liesmich/client
 * Source undefined
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post.component';
import { PostResolver } from './post.resolver';

const routes: Routes = [{
  component: PostComponent,
  path: '**',
  resolve: {
    post: PostResolver,
  },
}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class PostRoutingModule { }
