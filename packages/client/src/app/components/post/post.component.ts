/*
 * Package @liesmich/client
 * Source undefined
 */

import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { MdContent } from '@liesmich/parser';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'liesmich-post',
  styleUrls: ['./post.component.scss'],
  templateUrl: './post.component.html',
})
export class PostComponent {
  constructor(private route: ActivatedRoute) {
  }

  public get data(): Observable<string | MdContent> {
    return this.route.data.pipe(map((val: Data): string | MdContent => {
      if (val.post) {
        return val.post as MdContent;
      }
      return ''
    }), startWith(this.route.snapshot.data.post!) as MonoTypeOperatorFunction<string | MdContent>,
      distinctUntilChanged());
  }

}
