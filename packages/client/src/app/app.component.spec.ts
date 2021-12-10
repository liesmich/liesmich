/*
 * Package @liesmich/client
 * Source undefined
 */

import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By, Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { from, } from 'rxjs';
import { AppComponent } from './app.component';
import { PostService } from './post.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[liesmich-md]',
  template: '<h1></h1>',
})
export class TestMarkdownComponent {
  @Input('liesmich-md')
  public data: any;
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TestMarkdownComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: Title,
          useValue: {
            setTitle: (title: string): void => { return; }
          }
        },
        {
          provide: PostService,
          useValue: {
            getData: () => from(['# markdown']),
          }
        }
      ]
    }).compileComponents();
  });

  describe('init', (): void => {
    let fixture: ComponentFixture<AppComponent>;
    let app: AppComponent;
    beforeEach((): void => {
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    it(`should have as title 'liesmich'`, () => {
      expect(app.title).toEqual('liesmich');
    });

    it('should render title', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.content span')?.textContent).not.toBeDefined();
    });
    it('should read title', fakeAsync(() => {
      fixture.detectChanges();
      fixture.detectChanges();
      fixture.detectChanges(); tick();
      const childs: DebugElement[] = fixture.debugElement.queryAll(By.directive(TestMarkdownComponent));
      expect(childs.length).toEqual(2);
      const testMarkdown: string = '# yes\n i dont know\n 1. a\n2. b\n3. c\n\n| a | b | c | d |\n' +
        '|---|---|---|---|\n| 1 | 2 | 3 | 4 |\n| 5 | 6 | 7 | 8 |\n\n' +
        '`typescript asdf`\n\n```typescript\nconst a=2;\n```\n\n no';
      expect((childs[0].componentInstance as TestMarkdownComponent).data).toEqual(testMarkdown);
      expect((childs[1].componentInstance as TestMarkdownComponent).data).toEqual('# markdown');
    }));
  });
});
