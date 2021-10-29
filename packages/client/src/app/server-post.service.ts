import { Injectable } from "@angular/core";
import { promises as fsp } from "fs";
import { from, Observable } from "rxjs";

@Injectable()
export class ServerPostService {
    constructor() {
    }
    public getData(): Observable<any> {
        return from(fsp.readFile('src/assets/posts/test.md', { encoding: "utf8" }));
    }
}
