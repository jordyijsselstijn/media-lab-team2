import { NgModule } from '@angular/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MAPBOX_API_KEY } from 'ngx-mapbox-gl';

import { MapComponent } from './map.component';
import { environment } from '../../environments/environment';

@NgModule({
    declarations: [
        MapComponent
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