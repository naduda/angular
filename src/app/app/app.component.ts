import { Component } from '@angular/core';
import { LangService } from '../lang/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public lang: LangService) {}
}
