import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { MapSettings } from '../models';
import { MapPlateComponent } from './map-plate.component';

const meta: Meta<MapPlateComponent> = {
  title: 'Map Plate/Map Plate',
  component: MapPlateComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({})],
};

export default meta;
type Story = StoryObj<MapPlateComponent>;

const template =
  '<art-map-plate [settings]="settings" [contentRef]="content">' +
  '<ng-template #content></ng-template>' +
  '</art-map-plate>';

export const Primary: Story = {
  args: {
    settings: new MapSettings().setCenter([30.5, -1.8]).setZoom(9),
  } as any,
  render: (args: any) => ({ props: args, template }),
};

export const TranslucentBasemap: Story = {
  args: {
    settings: new MapSettings().setCenter([30.5, -1.8]).setZoom(6).setOsmOpacity(0.3),
  } as any,
  render: (args: any) => ({ props: args, template }),
};

export const LockedInteractions: Story = {
  args: {
    settings: new MapSettings()
      .setCenter([30.5, -1.8])
      .setZoom(9)
      .setInteractionSettings({ altShiftDragRotate: false, pinchRotate: false, doubleClickZoom: false }),
  } as any,
  render: (args: any) => ({ props: args, template }),
};
