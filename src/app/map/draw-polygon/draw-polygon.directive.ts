import { Directive, OnInit, AfterViewInit, ViewContainerRef } from '@angular/core';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as mapboxGl from 'mapbox-gl';
import * as turf from "@turf/turf";
import { Units } from '@turf/helpers';
import { GeoJSONGeometry } from 'mapbox-gl';
import { DrawPolygonService } from './draw-polygon.service';

@Directive({
  selector: '[DrawPolygon]'
})
export class DrawPolygonDirective implements OnInit, AfterViewInit {

  private _componentView: ViewContainerRef;
  private parent: any;
  private drawControl: any;

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
    var data = this.drawControl.getAll();
    if (data.features.length > 0) {
      let points = turf.pointGrid(
        turf.bbox(
          data.features[0]),
        30,
        {
          units: 'meters',
          mask: data.features[0]
        });
      let map = this.parent.mapInstance;
      map.getSource('points')
        .setData(points);
    }
  }


  generatePointGrid(e) {
    console.log('generate called');
    var data = this.drawControl.getAll();
    if (data.features.length > 0) {
      let points = turf.pointGrid(
        turf.bbox(
          data.features[0]),
        30,
        {
          units: 'meters',
          mask: data.features[0]
        });
      let map = this.parent.mapInstance;
      map.addSource('points',
        {
          "type": "geojson",
          "data": points
        })
      map.addLayer({
        "id": "points",
        "type": "symbol",
        "source": "points",
        "layout": {
          "icon-image": "custom-marker",
          "text-field": "{title}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top"
        }
      });

    }
  }

  ngAfterViewInit() {

  }
}




