import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { MapSettings } from '../../../models';
import { MapPlateComponent } from '../../map-plate.component';
import { TooltipComponent } from './tooltip.component';
import { TooltipSettings } from './tooltip.settings';

const meta: Meta<MapPlateComponent> = {
  title: 'Tooltips/Tooltip',
  component: MapPlateComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TooltipComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<MapPlateComponent>;

const tipSettings = new TooltipSettings().setShow(() => true);

export const ClickTooltip: Story = {
  args: {
    settings: new MapSettings().setCenter([30.5, -1.8]).setZoom(8),
    tipSettings,
  } as any,
  render: (args: any) => ({
    props: args,
    template:
      '<art-map-plate [settings]="settings" [contentRef]="content">' +
      '<ng-template #content>' +
      '<art-tooltip [settings]="tipSettings" [contentRef]="tipContent">' +
      '<ng-template #tipContent><div class="story-tooltip">Map clicked</div></ng-template>' +
      '</art-tooltip>' +
      '</ng-template>' +
      '</art-map-plate>',
  }),
};
