/*
 * Package @liesmich/client
 * Source undefined
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostService {

    private cacheData!: string;
    constructor(private http: HttpClient) {
    }
    public getData(): Observable<string> {
        if (this.cacheData) {
            return of(this.cacheData);
        }
        return this.http
            .get('/assets/posts/test.md', { responseType: 'text', })
            .pipe(tap((val) => this.cacheData = val));
    }
}
