import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestructibleComponent } from './common/destructible.component';
import { MapPlateComponent } from './map-plate/map-plate.component';
import { TileLayerComponent } from './map-plate/layers/tile-layer/tile-layer.component';
import { OsmTileLayerComponent } from './map-plate/layers/osm-tile-layer/osm-tile-layer.component';
import { FeatureLayerComponent } from './map-plate/layers/feature-layer/feature-layer.component';
import { MarkersComponent } from './map-plate/features/markers/markers.component';
import { TooltipComponent } from './map-plate/tooltips/tooltip/tooltip.component';
import { PolygonsComponent } from './map-plate/features/polygons/polygons.component';
import { ClusterLayerComponent } from './map-plate/layers/cluster-layer/cluster-layer.component';
import { MapControlZoomComponent } from './map-plate/controls/map-control-zoom/map-control-zoom.component';
import { ImageLayerComponent } from './map-plate/layers/image-layer/image-layer.component';
import { RasterTileLayerComponent } from './map-plate/layers/raster-tile/raster-tile-layer.component';
import { CogLayerComponent } from './map-plate/layers/cog-layer/cog-layer.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DestructibleComponent,
    MapPlateComponent,
    TileLayerComponent,
    OsmTileLayerComponent,
    FeatureLayerComponent,
    MarkersComponent,
    TooltipComponent,
    PolygonsComponent,
    ClusterLayerComponent,
    MapControlZoomComponent,
    ImageLayerComponent,
    RasterTileLayerComponent,
    CogLayerComponent,
  ],
  exports: [
    MapPlateComponent,
    FeatureLayerComponent,
    MarkersComponent,
    TileLayerComponent,
    TooltipComponent,
    PolygonsComponent,
    ClusterLayerComponent,
    MapControlZoomComponent,
    ImageLayerComponent,
    RasterTileLayerComponent,
    CogLayerComponent,
  ],
})
export class MapModule {}
