/*
 * Package @liesmich/client
 * Source undefined
 */

import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from '../../post.service';

@Injectable({ providedIn: 'root' })
export class PostResolver implements Resolve<string> {
    constructor(@Inject(PostService) private service: PostService) { }

    resolve(): Observable<string> {
        return this.service.getData()
    }
}
