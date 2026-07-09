import {Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {MapSettings} from '../../../models';
import {MapPlateComponent} from '../../map-plate.component';
import {GeotiffTileLayerComponent} from "./geotiff-tile-layer.component";
import {GeotiffTileLayerSettings} from "./geotiff-tile-layer.settings";


const meta: Meta<MapPlateComponent> = {
  title: 'GeotiffTileLayerComponent',
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
  .setInteractionSettings({altShiftDragRotate: false, pinchRotate: false});
const layerSettings = new GeotiffTileLayerSettings()
  .setUrl('')
  .setMin(0)
  .setMax(1)
  .setStyle({
    color: [
      'case',
      ['<=', ['band', 1], 0.1], [0, 0, 0, 0],
      ['<=', ['band', 1], .3], [255, 0, 0, 255],
      ['<=', ['band', 1], 0.7], [255, 255, 0, 255],
      [0, .6, 0, 255]
    ],
  });
export const Primary: Story = {
  args: {
    settings: settings, layerSettings
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
