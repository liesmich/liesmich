import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class PostService {

    private cacheData: any;
    constructor(private http: HttpClient) {
    }
    public getData(): Observable<any> {
        if (this.cacheData) {
            return of(this.cacheData);
        }
        return this.http
            .get('/assets/posts/test.md', { responseType: 'text', })
            .pipe(tap((val) => this.cacheData = val));
    }
}
