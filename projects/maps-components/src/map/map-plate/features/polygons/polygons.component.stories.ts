import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import { MapSettings, PolygonModel } from '../../../models';
import { MapPlateComponent } from '../../map-plate.component';
import { FeatureLayerComponent, FeatureLayerSettings } from '../../layers';
import { PolygonsComponent } from './polygons.component';

const meta: Meta<MapPlateComponent> = {
  title: 'Features/Polygons',
  component: MapPlateComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [FeatureLayerComponent, PolygonsComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<MapPlateComponent>;

const polygon = (rings: number[][][], id: string) => PolygonModel.fromGeoJson(id, JSON.stringify({ type: 'Polygon', coordinates: rings }));

const polygons = [
  polygon([[[30, -2], [31.5, -2], [31.5, -1], [30, -1], [30, -2]]], 'alpha'),
  polygon([[[30.4, -3], [32, -3], [32, -2.4], [30.4, -2.4], [30.4, -3]]], 'beta'),
];

const layerSettings = new FeatureLayerSettings().setStyle(
  new Style({
    fill: new Fill({ color: 'rgba(255, 160, 0, 0.25)' }),
    stroke: new Stroke({ color: '#ff8c00', width: 2 }),
  }),
);

export const Primary: Story = {
  args: {
    settings: new MapSettings().setCenter([31, -2.5]).setZoom(8),
    layerSettings,
    polygons,
  } as any,
  render: (args: any) => ({
    props: args,
    template:
      '<art-map-plate [settings]="settings" [contentRef]="content">' +
      '<ng-template #content>' +
      '<art-feature-layer [settings]="layerSettings">' +
      '<art-polygons [layerName]="layerSettings.name" [polygons]="polygons"></art-polygons>' +
      '</art-feature-layer>' +
      '</ng-template>' +
      '</art-map-plate>',
  }),
};
