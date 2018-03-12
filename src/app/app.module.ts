import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { APP_CONFIG } from './app.config';
import { MapsModule } from './map/map.module';
import { DrawPolygonDirective } from './draw-polygon/draw-polygon.directive';

@NgModule({
  declarations: [
    AppComponent,
    DrawPolygonDirective
  ],
  imports: [
    BrowserModule,
    MapsModule
  ],
  providers: [
    { provide: APP_CONFIG, useValue: environment }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
