import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { MapSettings, MarkerModel } from '../../../models';
import { MarkerStyleHelper } from '../../../helpers';
import { MapPlateComponent } from '../../map-plate.component';
import { ClusterLayerComponent } from './cluster-layer.component';
import { ClusterLayerSettings } from './cluster-layer.settings';
import { MarkersComponent } from '../../features/markers/markers.component';

const meta: Meta<MapPlateComponent> = {
  title: 'Layers/Cluster',
  component: MapPlateComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ClusterLayerComponent, MarkersComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<MapPlateComponent>;

// Deterministic pseudo-random points around the center so the story is stable.
function points(count: number): MarkerModel[] {
  let seed = 42;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const markers: MarkerModel[] = [];
  for (let i = 0; i < count; i++) {
    markers.push(new MarkerModel(-2 + (rnd() - 0.5) * 3, 30.5 + (rnd() - 0.5) * 4, 'point-' + i));
  }
  return markers;
}

const clusterSettings = new ClusterLayerSettings()
  .setName('clusters')
  .setDistance(45)
  .setStyle((features: any[]) => MarkerStyleHelper.circle(features.length > 1 ? 18 : 10, '#fff', '#1976d2'));

export const ClusteredPoints: Story = {
  args: {
    settings: new MapSettings().setCenter([30.5, -1.8]).setZoom(8),
    clusterSettings,
    markers: points(80),
  } as any,
  render: (args: any) => ({
    props: args,
    template:
      '<art-map-plate [settings]="settings" [contentRef]="content">' +
      '<ng-template #content>' +
      '<art-cluster-layer [settings]="clusterSettings">' +
      '<art-markers [layerName]="clusterSettings.name" [markers]="markers"></art-markers>' +
      '</art-cluster-layer>' +
      '</ng-template>' +
      '</art-map-plate>',
  }),
};
