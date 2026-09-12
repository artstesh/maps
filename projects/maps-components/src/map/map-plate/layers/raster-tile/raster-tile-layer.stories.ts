import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { MapSettings } from '../../../models';
import { MapPlateComponent } from '../../map-plate.component';
import { RasterTileLayerComponent } from './raster-tile-layer.component';
import { RasterTileLayerSettings } from './raster-tile-layer.settings';

const meta: Meta<MapPlateComponent> = {
  title: 'Layers/Raster Tile',
  component: MapPlateComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RasterTileLayerComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<MapPlateComponent>;

// The raster layer processes every source tile through `operation` before
// rendering - here a plain OSM raster is turned into a grayscale map.
const grayscale = new RasterTileLayerSettings()
  .setUrl('https://tile.openstreetmap.org/{z}/{x}/{y}.png')
  .setOpacity(0.9)
  .setOperation((sources: any) => {
    const src: ImageData = sources[0];
    const result = new ImageData(src.width, src.height);
    for (let i = 0; i < src.data.length; i += 4) {
      const v = (src.data[i] + src.data[i + 1] + src.data[i + 2]) / 3;
      result.data[i] = v;
      result.data[i + 1] = v;
      result.data[i + 2] = v;
      result.data[i + 3] = src.data[i + 3];
    }
    return result;
  });

export const GrayscaleOsm: Story = {
  args: {
    settings: new MapSettings().setCenter([30.5, -1.8]).setZoom(9).setOsmOpacity(0),
    layerSettings: grayscale,
  } as any,
  render: (args: any) => ({
    props: args,
    template:
      '<art-map-plate [settings]="settings" [contentRef]="content">' +
      '<ng-template #content><art-raster-tile-layer [settings]="layerSettings"></art-raster-tile-layer></ng-template>' +
      '</art-map-plate>',
  }),
};
