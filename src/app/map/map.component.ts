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
    const layers = this.map.getStyle().layers!;

    for (let i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol' && (<SymbolLayout>layers[i].layout)['text-field']) {
        this.labelLayerId = layers[i].id;
        break;
      }
    }
  }
}
