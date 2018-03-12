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
