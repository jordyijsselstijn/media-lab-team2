import { Component, ViewChild, Inject, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { MapService, MapEvent } from 'ngx-mapbox-gl';
import { SymbolLayout } from 'mapbox-gl';
import { DrawPolygonDirective } from './draw-polygon/draw-polygon.directive';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {

  map: any;
  labelLayerId: string;
  public drawInitialized = false;
  @ViewChild(DrawPolygonDirective) drawDirective;

  constructor() {
  }

  ngOnInit() {
    this.drawInitialized = this.drawDirective.initialized;
  }
  onMapClicked(event) {

  }

  draw() {
    this.drawDirective.draw();
  }

  trash() {
    this.drawDirective.trash();
  }

  onLoad(mapInstance) {
    this.map = mapInstance!;
    const layers = this.map.getStyle().layers!;

    for (let i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol' && (<SymbolLayout>layers[i].layout)['text-field']) {
        this.labelLayerId = layers[i].id;
        break;
      }
    }
    this.loadMarkerImage("https://i.imgur.com/MK4NUzI.png")
      .then((image) => {
        this.map.addImage("custom-marker", image);
      });
  }

  loadMarkerImage(imageUrl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.map.loadImage("https://i.imgur.com/MK4NUzI.png", function (err, image) {
        if (err) reject(err);
        resolve(image);
      })
    })
  }
}
