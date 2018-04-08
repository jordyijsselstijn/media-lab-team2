import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MAPBOX_API_KEY } from 'ngx-mapbox-gl';
import { DrawPolygonDirective } from './draw-polygon/draw-polygon.directive';
import { MapComponent } from './map.component';
import { environment } from '../../environments/environment';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
        MapComponent,
        DrawPolygonDirective
    ],
    imports: [
        MatButtonModule,
        NgxMapboxGLModule.forRoot({
            accessToken: environment.mapbox_access_token
        }),
        HttpClientModule
    ],
    exports: [
        MapComponent
    ]
})
export class MapsModule {
    constructor() {

    }
}