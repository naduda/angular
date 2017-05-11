import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LangService {
  private langLocalesUrl: string = environment.langLocales;
  private langUrl: string = environment.langUrl;

  private _locales: any[];
  private values: any;
  private onChangeCallbacks: any[];

  constructor(private http: Http) {
    this.onChangeCallbacks = [];
  }

  public get locales() {
    return this._locales;
  }

  public get lang() {
    return this.values;
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
      return this.http.get(this.langUrl + locale + '_lang.json')
      .toPromise().then(response => {
        this.values = response.json();
        return this.values;
      })
      .catch(this.handleError);
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
