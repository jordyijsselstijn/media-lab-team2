import * as _ from 'lodash';
import { GeoJSONGeometry } from 'mapbox-gl';
import { PolygonBounds } from './PolygonBounds';

export class DrawPolygonService {
    constructor() { }

    static getBoundsOfPolygon(polygon: any): PolygonBounds {
        return new PolygonBounds(polygon);
    }
}