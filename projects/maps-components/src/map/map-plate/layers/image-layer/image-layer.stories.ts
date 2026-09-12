import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { MapSettings } from '../../../models';
import { MapPlateComponent } from '../../map-plate.component';
import { ImageLayerComponent } from './image-layer.component';
import { ImageLayerSettings } from './image-layer.settings';

const meta: Meta<MapPlateComponent> = {
  title: 'Layers/Image',
  component: MapPlateComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ImageLayerComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<MapPlateComponent>;

// A self-contained SVG picture stretched over a geographic extent.
const svg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">' +
  '<rect width="400" height="300" fill="#22364f"/>' +
  '<text x="200" y="150" font-size="28" fill="#fff" text-anchor="middle" font-family="monospace">' +
  'IMAGE LAYER</text></svg>';
const overlay = new ImageLayerSettings()
  .setUrl('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg))
  .setExtent([29.5, -3.2, 31.5, -0.4])
  .setOpacity(0.8);

export const ImageOverlay: Story = {
  args: {
    settings: new MapSettings().setCenter([30.5, -1.8]).setZoom(7),
    layerSettings: overlay,
  } as any,
  render: (args: any) => ({
    props: args,
    template:
      '<art-map-plate [settings]="settings" [contentRef]="content">' +
      '<ng-template #content><art-image-layer [settings]="layerSettings"></art-image-layer></ng-template>' +
      '</art-map-plate>',
  }),
};
