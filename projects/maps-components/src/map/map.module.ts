import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestructibleComponent } from './common/destructible.component';
import { MapPlateComponent } from './map-plate/map-plate.component';
import { TileLayerComponent } from './map-plate/layers/tile-layer/tile-layer.component';
import { OsmTileLayerComponent } from './map-plate/layers/osm-tile-layer/osm-tile-layer.component';
import { FeatureLayerComponent } from './map-plate/layers/feature-layer/feature-layer.component';
import { MarkersComponent } from './map-plate/features/markers/markers.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DestructibleComponent,
    MapPlateComponent,
    TileLayerComponent,
    OsmTileLayerComponent,
    FeatureLayerComponent,
    MarkersComponent,
  ],
  exports: [MapPlateComponent, FeatureLayerComponent, MarkersComponent],
})
export class MapModule {}
