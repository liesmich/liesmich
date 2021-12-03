import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PostService } from './post.service';

@Component({
  selector: 'liesmich-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'liesmich';
  testMarkdown = "# yes\n i dont know\n 1. a\n2. b\n3. c\n\n| a | b | c | d |\n|---|---|---|---|\n| 1 | 2 | 3 | 4 |\n| 5 | 6 | 7 | 8 |\n\n" +
    "`typescript asdf`\n\n```typescript\nconst a=2;\n```\n\n no";
  testMarkdown2 = "# yes\n i dont know\n 1. a\n2. b\n3. c\n\n| a | b | c | d |\n|---|---|---|---|\n| 1 | 2 | 3 | 4 |\n| 5 | 6 | 7 | 8 |\n\n" +
    "`typescript asdf`\n\n```markdown\n## hallo\n```\n\n no";
  constructor(private titleService: Title, private posts: PostService) {
  }

  public get data(): Observable<any> {
    return this.posts.getData()
      .pipe(tap({
        next: (val: any) => {
          this.titleService.setTitle('asn')
        }
      }));
  }
}
