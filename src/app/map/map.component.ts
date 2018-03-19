import { Component, ViewChild, Inject, ElementRef } from '@angular/core';
import { MapService, MapEvent } from 'ngx-mapbox-gl';
import { SymbolLayout } from 'mapbox-gl';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  map: any;
  labelLayerId: string;

  constructor() {
    
  }

  onMapClicked(event) {

  }

  onLoad(mapInstance) {
    this.map = mapInstance!;
    this.map.setCenter([4.490335, 51.914845]);
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
