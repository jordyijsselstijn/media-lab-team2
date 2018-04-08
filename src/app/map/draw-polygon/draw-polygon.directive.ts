import { Directive, OnInit, AfterViewInit, ViewContainerRef, Input, ViewChild, ElementRef } from '@angular/core';
import { MapService } from 'ngx-mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as mapboxGl from 'mapbox-gl';
import * as turf from "@turf/turf";
import { Units, BBox, FeatureCollection, Point } from '@turf/helpers';
import { GeoJSONGeometry, Map, GeoJSONSource, IControl } from 'mapbox-gl';
import { DrawPolygonConfig, LayerConfig } from './DrawPolygonConfig';
import { Observable } from 'rxjs/Observable';

@Directive({
  selector: '[DrawPolygon]'
})
export class DrawPolygonDirective implements OnInit {

  @ViewChild('content') content: ElementRef;
  @Input('DrawPolygon') public config: DrawPolygonConfig = { markerSpread: 0, markerSpreadUnit: 'meters' };
  private _componentView: ViewContainerRef;
  private parent: any;
  private drawControl: any;
  private isCursorOverPoint: boolean;
  private isDragging: boolean;
  private map: Map
  private layerConfig: LayerConfig;
  public initialized: boolean;

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.drawControl = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: false,
        trash: false
      }
    });
    this.layerConfig = new LayerConfig('points');
    this.layerConfig.type = 'circle';
    this.layerConfig.id = 'points';
    this.layerConfig.paint = {
      // make circles larger as the user zooms from z12 to z22
      'circle-radius': {
        'base': 1.75,
        'stops': [[12, 2], [22, 180]]
      },
      // color circles by ethnicity, using a match expression
      // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
      'circle-color': '#ccc'
    };
    this.mapService.mapLoaded$.subscribe(() => {
      this.map = this.mapService.mapInstance;
      this.setupDrawControls();
      this.initialized = true;
    });
  }

  draw() {
    this.drawControl.changeMode("draw_polygon")
  }

  trash() {
    this.drawControl.trash();
  }

  setupDrawControls() {
    this.map.addControl(this.drawControl);
    this.map.on('draw.create', this.generatePointGrid.bind(this));
    this.map.on('draw.delete', this.removePointGrid.bind(this));
    this.map.on('draw.update', this.updatePointGrid.bind(this));
  }

  removePointGrid() {
    this.map.removeLayer('points');
    this.map.removeSource('points');
    this.map.removeLayer('route');
    this.map.removeSource('route');
  }

  updatePointGrid() {
    let points = this.getPointGrid() as any;
    let source = this.map.getSource(this.layerConfig.id) as any;
    this.filterPointsInWater(points, this.getBoundingBox())
      .then((filteredPoints) => {
        source.setData(filteredPoints);
        this.generateDashedLine(filteredPoints);
      })
      .catch((e) => {
        source.setData(points);
        this.generateDashedLine(points);
      });
  }

  getDrawControlData() {
    var data = this.drawControl.getAll();
    if (data.features.length > 0) {
      return data;
    }
    else {
      throw new Error('No data in drawControl');
    }
  }

  getBoundingBox() {
    return turf.bbox(this.getDrawControlData().features[0].geometry);
  }

  getPointGrid() {
    let data = this.getDrawControlData().features[0].geometry;
    return turf.pointGrid(
      this.getBoundingBox(),
      this.config.markerSpread,
      {
        units: this.config.markerSpreadUnit,
        mask: data
      });
  }

  generateDashedLine(points) {
    let coordinates = points.features.map((feature) => {
      return feature.geometry.coordinates;
    });
    let lineSource = this.map.getSource('route') as any;
    if (lineSource) {
      lineSource.setData({
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": coordinates
        }
      });
    } else {
      this.map.addLayer({
        "id": "route",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": coordinates
            }
          }
        },
        "paint": {
          "line-color": "gray",
          "line-width": 2,
          "line-dasharray": [2, 1]
        }
      } as any);
    }

  }

  generatePointGrid(e) {
    let points = this.getPointGrid() as any;
    this.map.addSource('points',
      {
        "type": "geojson",
        "data": points
      })
    this.map.addLayer(this.layerConfig);
    let source = this.map.getSource(this.layerConfig.id) as any;
    this.filterPointsInWater(points, this.getBoundingBox())
      .then((filteredPoints) => {
        source.setData(filteredPoints);
        this.generateDashedLine(filteredPoints);
      })
      .catch((e) => {
        this.generateDashedLine(points);
      });
  }

  filterPointsInWater(originalPoints: FeatureCollection<Point>, boundingBox: BBox) {
    return new Promise((resolve, reject) => {
      let features = this.map.queryRenderedFeatures(this.getBoundingBox(), { layers: ['water'] }) as any;
      try {
        let waterPolygon = turf.polygon(features[0].geometry.coordinates);
        resolve(turf.pointsWithinPolygon(originalPoints, waterPolygon));
      }
      catch (e) {
        reject(e);
      }
    });

  }
}
