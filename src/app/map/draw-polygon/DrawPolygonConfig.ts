import { Units } from "@turf/helpers";
import { Layer } from 'mapbox-gl';
export interface DrawPolygonConfig {
    markerSpread: number;
    markerSpreadUnit: Units;
}

export class LayerConfig {
    public id: string;
    public type: Layer['type']
    public layout?: MarkerLayoutConfig;
    public paint: any;
    public source: string;

    constructor(sourceId) {
        this.source = sourceId;
    }

}

export interface MarkerLayoutConfig {
    ['icon-image']: string;
    ['text-field']: string;
    ['text-font']: string | Array<string>;
    ['text-offset']: Array<number>;
    ['text-anchor']: 'top' | 'bottom' | 'right' | 'left';
}