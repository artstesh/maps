import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { MapSettings } from '../../../models';
import { MapPlateComponent } from '../../map-plate.component';
import { GeotiffTileLayerComponent } from './geotiff-tile-layer.component';
import { GeotiffTileLayerSettings } from './geotiff-tile-layer.settings';

const meta: Meta<MapPlateComponent> = {
  title: 'Layers/GeoTIFF',
  component: MapPlateComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [GeotiffTileLayerComponent],
    }),
  ],
  argTypes: {},
};

export default meta;
type Story = StoryObj<MapPlateComponent>;

const settings = new MapSettings()
  .setCenter([30, -2])
  .setZoom(8)
  .setInteractionSettings({ altShiftDragRotate: false, pinchRotate: false });
const layerSettings = new GeotiffTileLayerSettings()
  .setUrl('')
  .setOpacity(1)
  .setNodata(255)
  .setNormalize(false)
  .setStyle({
    color: [
      'case',
      ['<=', ['band', 1], 0],
      [1, 0.05, 0.1, 0],
      ['<=', ['band', 1], 240],
      [0.9, 0.4, 0.5, 255],
      [0, 0, 0, 0],
    ],
  });
export const Primary: Story = {
  args: {
    settings: settings,
    layerSettings,
  } as any,
  render: (args: any) => ({
    props: args,
    template:
      '<art-map-plate [settings]="settings" [contentRef]="map">\n' +
      '\n' +
      '      </art-map-plate>\n' +
      '      <ng-template #map>\n' +
      '         <lib-geotiff-tile-layer [settings]="layerSettings">\n' +
      '         </lib-geotiff-tile-layer>\n' +
      '      </ng-template>',
  }),
};
