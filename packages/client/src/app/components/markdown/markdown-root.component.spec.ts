import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By, Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { from, } from 'rxjs';
import { MarkdownRoot } from '.';
import { MarkdownInline } from './markdown-inline.component';

@Component({
  selector: '[liesmich-md]',
  template: '<h1></h1>',
})
export class TestMarkdownComponent {
  @Input('liesmich-md')
  public data: any;
}
function filterComments(el: HTMLElement): ChildNode[] {
  if (!el.hasChildNodes()) {
    throw new Error('No Child Nodes');
  }
  return Array.from(el.childNodes)
    .filter((item: ChildNode): boolean => {
      return item.nodeType !== Node.COMMENT_NODE;
    })
}
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        MarkdownRoot,
        MarkdownInline,
      ],
      providers: [
      ]
    }).compileComponents();
  });

  describe('init', (): void => {
    let fixture: ComponentFixture<MarkdownRoot>;
    let app: MarkdownRoot;
    beforeEach((): void => {
      fixture = TestBed.createComponent(MarkdownRoot);
      app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    it(`should have as title 'liesmich'`, fakeAsync(() => {
      app.parse = '# data';
      fixture.detectChanges();
      const children: ChildNode[] = filterComments(fixture.nativeElement);
      expect(children.length).toEqual(1);
      expect(children[0].nodeType)
        .withContext('should be a header type')
        .toEqual(Node.ELEMENT_NODE);
      expect(children[0].nodeName)
        .withContext('should be a header type')
        .toEqual('H1');
    }));

  });
});
