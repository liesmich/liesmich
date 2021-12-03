import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Data } from '@angular/router';
import { MdContent } from '@liesmich/parser';
import { from, Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'liesmich-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  constructor(private route: ActivatedRoute) {
  }

  public get data(): Observable<string | MdContent> {
    return this.route.data.pipe(map((val: Data) => {
      if (val.post) {
        return val.post;
      }
      return ''
    }), startWith(this.route.snapshot.data.post!),
      distinctUntilChanged());
  }

  public a() {

  }
}
