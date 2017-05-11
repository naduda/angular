import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LangService } from './lang.service';
import { LangComponent } from './lang.component';

describe('LangComponent', () => {
  let langService: LangService;
  let component: LangComponent;
  let fixture: ComponentFixture<LangComponent>;
  let de: DebugElement;
  const langServiceStub: any = {
    locales: [
      {name: 'uk', text: 'Українська', ico: './assets/images/ukFlag.png'},
      {name: 'ru', text: 'Русский', ico: './assets/images/ruFlag.png'},
      {name: 'en', text: 'English', ico: './assets/images/enFlag.png'}
    ],
    getLocales: () => Promise.resolve(langServiceStub.locales),
    getMap: (locale: string) => Promise.resolve(new Object())
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangComponent ],
      providers: [{provide: LangService, useValue: langServiceStub}],
      imports: [HttpModule, NgbModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LangComponent);
    langService = fixture.debugElement.injector.get(LangService);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create component with 3 locales', async(() => {
    expect(component).toBeTruthy();
    const buttons = de.queryAll(By.css('button'));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(buttons.length).toBe(3);
      const names = langService.locales.map(e => e.text);
      for (const b of buttons) {
        const text = b.nativeElement.textContent.trim();
        expect(names).toContain(text);
      }
    });
  }));
});
