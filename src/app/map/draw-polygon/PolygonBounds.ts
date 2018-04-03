import { BBox } from "@turf/helpers";
import * as _ from 'lodash';

export class PolygonBounds {
    lattitude: Map<string, number>;
    longitude: Map<string, number>;
    private _originalCoordinates: Map<number, number>;

    constructor(coordinateMap: Map<number, number>) {
        this.lattitude = this.getMinMaxMap(coordinateMap, 0);
        this.longitude = this.getMinMaxMap(coordinateMap, 1);
    }

    getMinMaxMap(coordinateMap: Map<number, number>, searchIndex: number): Map<string, number> {
        let min: number = null;
        let max: number = null;
        let coordMap = new Map();

        _.maxBy(coordinateMap[searchIndex], function (o) {
            console.log(o);
        })
        coordinateMap.forEach((coordinates, key) => {
            if (min === null) {
                min = coordinates[searchIndex];
            }
            else if (coordinates[0] < min) {
                min = coordinates[searchIndex];
            }

            if (max === null) {
                max = coordinates[searchIndex];
            }
            else if (coordinates[0] > max) {
                max = coordinates[searchIndex];
            }
        });

        coordMap.set('min', min);
        coordMap.set('max', max);
        return coordMap;
    }

    getBoundingBox(): BBox {
        //minX, minY, maxX, maxY
        return [
            this.lattitude.get('min'),
            this.longitude.get('min'),
            this.lattitude.get('max'),
            this.longitude.get('max')
        ];
    }
}