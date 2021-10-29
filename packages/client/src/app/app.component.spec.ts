import { Component, Input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { from, } from 'rxjs';
import { AppComponent } from './app.component';
import { PostService } from './post.service';

@Component({
  selector: '[liesmich-md]',
  template: '<h1></h1>',
})
export class TestMarkdownComponent {
  @Input('listmich-md')
  public data: any;
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        TestMarkdownComponent
      ],
      providers: [
        {
          provide: Title,
          useValue: {

          }
        },
        {
          provide: PostService,
          useValue: {
            getData: () => from([]),
          }
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'liesmich'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('liesmich');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).not.toBeDefined();
  });
});
