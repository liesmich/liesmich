import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarkdownModule } from '../markdown';
import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';

@NgModule({
    declarations: [
        PostComponent
    ],
    imports: [
        CommonModule,
        PostRoutingModule,
        MarkdownModule,
    ],
    providers: [
    ],
    exports: [
        PostComponent,
    ],
})
export class PostModule { }
