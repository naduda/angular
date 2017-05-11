import { Component, Input, OnInit } from '@angular/core';
import { LangService } from './lang.service';

@Component({
  selector: 'app-lang',
  template: `
    <div ngbDropdown class="d-inline-block nav-link">
      <span class="btn btn-sm" ngbDropdownToggle [hidden]="!locale.ico">
        <img src="{{locale.ico}}" alt="{{locale.name}}">
        <span>{{locale.text}}</span>
      </span>
      <div class="dropdown-menu" aria-labelledby="dropdownMenu1">
        <button *ngFor="let l of lang.locales"
          class="dropdown-item" (click)="changeLang(l)">
          <img src="{{l.ico}}" alt="{{l.name | uppercase}}"
            style="height: auto; width: 1rem;">
          <span>{{l.text}}</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    *[ngbDropdownToggle]:hover,
    button:hover, i:hover { cursor: pointer; }
    .dropdown-menu { min-width: 0; }
    button { font-size: 0.8rem; padding-left: 0.5rem; }
    img { width: 1.25rem; margin-right: 0.25rem; }
  `]
})
export class LangComponent implements OnInit {
  public locale: any;
  @Input() private storageName: string;
  @Input() private apiUrl: string;

  constructor(public lang: LangService) {
    this.locale = new Object();
  }

  ngOnInit() {
    if (this.apiUrl) {
      this.lang.setApiUrl(this.apiUrl);
    }
    this.lang.getLocales()
    .then((data: any[]) => {
      const key: any = localStorage.getItem(this.storageName);
      const loc = key ? JSON.parse(key).locale : data[0];
      this.locale = loc;
    })
    .then(() => {
      this.lang.getMap(this.locale.name);
    });
  }

  changeLang(item: any) {
    this.locale = item;
    const key: any = localStorage.getItem(this.storageName);
    const value = key ? JSON.parse(key) : new Object();
    value.locale = this.locale;
    localStorage.setItem(this.storageName, JSON.stringify(value));
    this.lang.getMap(this.locale.name).then(ready => {
      this.lang.languageChange(this.locale.name);
    });
  }
}
