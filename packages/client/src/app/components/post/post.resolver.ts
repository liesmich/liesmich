import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { PostService } from "../../post.service";

@Injectable({ providedIn: 'root' })
export class PostResolver implements Resolve<string> {
    constructor(@Inject(PostService) private service: PostService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<string> {
        return this.service.getData()
    }
}
