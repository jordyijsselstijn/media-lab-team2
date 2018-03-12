import { Directive, OnInit } from '@angular/core';
import { MapboxDraw } from '@mapbox/mapbox-gl-draw';

@Directive({
  selector: '[appDrawPolygon]'
})
export class DrawPolygonDirective implements OnInit {

  constructor() {

  }

  ngOnInit() {
    new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      }
    });
  }
}
