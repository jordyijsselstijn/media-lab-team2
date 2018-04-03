import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Map } from 'mapbox-gl';

@Injectable()
export class DrawPolygonService {
    constructor(private http: HttpClient) { }

    filterFeatures(map: Map) {

    }
}