import { Directive, OnInit, AfterViewInit, ViewContainerRef } from '@angular/core';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';

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
    mapInstance.on('draw.create', this.getData.bind(this));
    mapInstance.on('draw.delete', this.getData.bind(this));
    mapInstance.on('draw.update', this.getData.bind(this));
  }

  getData(e) {
    var data = this.drawControl.getAll();
    console.log(data);
  }

  ngAfterViewInit() {

  }
}

/* 
[
  [-74.01121234037177, 40.71458856797463]
  [-74.00710049383024, 40.71462306961982]
  [-74.0071763581577, 40.71229991905943]
  [-74.01159166200478, 40.71186288167783]
  [-74.01121234037177, 40.71458856797463]
]

https://gis.stackexchange.com/questions/163044/mapbox-how-to-generate-a-random-coordinate-inside-a-polygon

*/




