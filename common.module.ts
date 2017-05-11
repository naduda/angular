import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LangService } from './lang/lang.service';
import { LangComponent } from './lang/lang.component';

import { AppComponent } from './app/app.component';

@NgModule({
  declarations: [
    AppComponent,
    LangComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  exports: [
    LangComponent
  ],
  providers: [LangService],
  bootstrap: [AppComponent]
})
export class CommonModule { }
