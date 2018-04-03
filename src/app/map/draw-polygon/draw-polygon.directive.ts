import { Directive, OnInit, AfterViewInit, ViewContainerRef, Input } from '@angular/core';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as mapboxGl from 'mapbox-gl';
import * as turf from "@turf/turf";
import { Units } from '@turf/helpers';
import { GeoJSONGeometry } from 'mapbox-gl';
import { DrawPolygonConfig, LayerConfig } from './DrawPolygonConfig';

@Directive({
  selector: '[DrawPolygon]'
})
export class DrawPolygonDirective implements OnInit, AfterViewInit {

  @Input('DrawPolygon') public config: DrawPolygonConfig = { markerSpread: 30, markerSpreadUnit: 'meters' };
  private _componentView: ViewContainerRef;
  private parent: any;
  private drawControl: any;
  private isCursorOverPoint: boolean;
  private isDragging: boolean;

  constructor(private _view: ViewContainerRef) {
    this._componentView = _view;
  }

  ngOnInit() {
    this.parent = (<any>this._view)._data.componentView.component;
    this.drawControl = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      }
    });
    setTimeout(() => {
      this.setupDrawControls();
    }, 0);
  }

  setupDrawControls() {
    let mapInstance = this.parent.mapInstance;
    mapInstance.addControl(this.drawControl);
    mapInstance.on('draw.create', this.generatePointGrid.bind(this));
    mapInstance.on('draw.delete', this.removePointGrid.bind(this));
    mapInstance.on('draw.update', this.updatePointGrid.bind(this));
  }

  removePointGrid() {
    let map = this.parent.mapInstance;
    map.removeLayer('points');
    map.removeSource('points');
  }

  updatePointGrid() {
    let points = this.getPointGrid();
    let map = this.parent.mapInstance;
    map.getSource('points')
      .setData(points);
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

  getPointGrid() {
    let data = this.getDrawControlData().features[0].geometry;
    return turf.pointGrid(
      turf.bbox(
        data),
      this.config.markerSpread,
      {
        units: this.config.markerSpreadUnit,
        mask: data
      });
  }

  generatePointGrid(e) {
    let points = this.getPointGrid();
    let map = this.parent.mapInstance;
    let layerConfig = this.getLayerConfig();
    // map.addSource('points',
    //   {
    //     "type": "geojson",
    //     "data": points
    //   })
    // map.addLayer(layerConfig);
    let features = map.queryRenderedFeatures(points)
      .filter((value) => value.layer['source-layer'] == 'water');
    console.log(features[0]._vectorTileFeature.toGeoJSON());
    console.log(points);
    // map.getSource('points')
    //   .setData({ type: "featureCollection", features: features });
  }

  getLayerConfig(): LayerConfig {
    let config = new LayerConfig('points');
    config.type = 'symbol';
    config.id = 'points';
    config.layout = {
      "icon-image": "custom-marker",
      "text-field": "Navigation point",
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      "text-offset": [0, 0.6],
      "text-anchor": "top"
    };
    return config;
  }
  ngAfterViewInit() {

  }
}
