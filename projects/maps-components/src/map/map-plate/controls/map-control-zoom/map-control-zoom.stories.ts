import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { MapSettings, MarkerModel } from '../../../models';
import { MarkerStyleHelper } from '../../../helpers';
import { MapPlateComponent } from '../../map-plate.component';
import { FeatureLayerComponent, FeatureLayerSettings } from '../../layers';
import { MarkersComponent } from '../../features/markers/markers.component';
import { MapControlZoomComponent } from './map-control-zoom.component';
import { ZoomControlSettings } from './zoom-control.settings';

const meta: Meta<MapPlateComponent> = {
  title: 'Controls/Zoom Control',
  component: MapPlateComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [MapControlZoomComponent, FeatureLayerComponent, MarkersComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<MapPlateComponent>;

const zoomSettings = new ZoomControlSettings().setZoomInLabel('+').setZoomOutLabel('−');
const layerSettings = new FeatureLayerSettings().setStyle((s) => MarkerStyleHelper.circle(10, '#fff', '#1976d2'));

export const CustomZoomButtons: Story = {
  args: {
    settings: new MapSettings().setCenter([30.5, -1.8]).setZoom(8),
    zoomSettings,
    layerSettings,
    markers: [new MarkerModel(-1.8, 30.5, 'marker1')],
  } as any,
  render: (args: any) => ({
    props: args,
    template:
      '<art-map-plate [settings]="settings" [contentRef]="content">' +
      '<ng-template #content>' +
      '<art-map-control-zoom [settings]="zoomSettings"></art-map-control-zoom>' +
      '<art-feature-layer [settings]="layerSettings">' +
      '<art-markers [layerName]="layerSettings.name" [markers]="markers"></art-markers>' +
      '</art-feature-layer>' +
      '</ng-template>' +
      '</art-map-plate>',
  }),
};
