import { NgModule } from '@angular/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MAPBOX_API_KEY } from 'ngx-mapbox-gl';
import { DrawPolygonDirective } from './draw-polygon/draw-polygon.directive';
import { MapComponent } from './map.component';
import { environment } from '../../environments/environment';

@NgModule({
    declarations: [
        MapComponent,
        DrawPolygonDirective
    ],
    imports: [
        NgxMapboxGLModule.forRoot({
            accessToken: environment.mapbox_access_token
        })
    ],
    exports: [
        MapComponent
    ]
})
export class MapsModule {
    constructor() {

    }
}