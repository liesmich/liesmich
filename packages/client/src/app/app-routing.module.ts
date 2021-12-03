import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './components/post/post.component';
import { PostResolver } from './components/post/post.resolver';
import { PostService } from './post.service';

const routes: Routes = [{
  path: 'post',
  loadChildren: () => import('./components/post/post.module').then(m => m.PostModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
