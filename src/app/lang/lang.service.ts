import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class LangService {
  private ready: boolean;
  private langLocalesUrl: string = environment.langLocales;
  private langUrl: string = environment.langUrl;

  private _locales: any[];
  private onChangeCallbacks: any[];

  constructor(private http: Http) {
    this.onChangeCallbacks = [];
  }

  public get locales() {
    return this._locales;
  }

  languageChange(locale) {
    for (const cb of this.onChangeCallbacks) {
      if (cb) {
        cb(locale);
      }
    }
  }

  onLanguageChange(cb) {
    this.onChangeCallbacks.push(cb);
  }

  removeOnLanguageChange(cb) {
    for (let i = 0; i < this.onChangeCallbacks.length; i++) {
      if (cb === this.onChangeCallbacks[i]) {
        this.onChangeCallbacks.splice(i, 1);
        break;
      }
    }
  }

  getLocales(): Promise<any[]> {
    if (this._locales) {
      return Promise.resolve(this._locales);
    } else {
      return this.http.get(this.langLocalesUrl)
      .toPromise().then(response => {
        this._locales = response.json() as any[];
        return this._locales;
      })
      .catch(this.handleError);
    }
  }

  getMap(locale: string): Promise<any> {
    if (locale === undefined) {
      return Promise.resolve(null);
    } else {
      this.ready = false;
      return this.http.get(this.langUrl + locale + '_lang.json')
      .toPromise().then(response => {
        const values = response.json();
        for (const key in values) {
          if (values.hasOwnProperty(key)) {
            this[key] = values[key];
          }
        }
        this.ready = true;
        return Promise.resolve(null);
      })
      .catch(this.handleError);
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
