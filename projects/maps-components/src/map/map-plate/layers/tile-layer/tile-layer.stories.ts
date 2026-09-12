import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { MapSettings } from '../../../models';
import { MapPlateComponent } from '../../map-plate.component';
import { TileLayerComponent } from './tile-layer.component';
import { TileLayerSettings } from './tile-layer.settings';

const meta: Meta<MapPlateComponent> = {
  title: 'Layers/Tile',
  component: MapPlateComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TileLayerComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<MapPlateComponent>;

const darkBasemap = new TileLayerSettings().setUrl('https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png');

export const DarkBasemap: Story = {
  args: {
    settings: new MapSettings().setCenter([30.5, -1.8]).setZoom(9).setOsmOpacity(0),
    layerSettings: darkBasemap,
  } as any,
  render: (args: any) => ({
    props: args,
    template:
      '<art-map-plate [settings]="settings" [contentRef]="content">' +
      '<ng-template #content><art-tile-layer [settings]="layerSettings"></art-tile-layer></ng-template>' +
      '</art-map-plate>',
  }),
};

const translucent = new TileLayerSettings()
  .setUrl('https://basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png')
  .setOpacity(0.8);

export const LabelsOverOsm: Story = {
  args: {
    settings: new MapSettings().setCenter([30.5, -1.8]).setZoom(9),
    layerSettings: translucent,
  } as any,
  render: (args: any) => ({
    props: args,
    template:
      '<art-map-plate [settings]="settings" [contentRef]="content">' +
      '<ng-template #content><art-tile-layer [settings]="layerSettings"></art-tile-layer></ng-template>' +
      '</art-map-plate>',
  }),
};
