import {applicationConfig, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {MapSettings, MarkerModel} from "../../../models";
import {MapPlateComponent} from "../../map-plate.component";
import {MarkersComponent} from "./markers.component";
import {FeatureLayerComponent, FeatureLayerSettings} from "../../layers";
import {MapPostboyService} from "../../../services/map-postboy.service";
import {MarkerStyleHelper} from "../../../helpers";

const markerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="28" viewBox="0 0 21 28">' +
                    <path data-name="pin green" d="M-18.7-9.292a10.112 10.112 0 0 0-10-10.2 10.112 10.112 0 0 0-10 10.2C-38.7-1.3-29.642 6.95-29.256 7.3a.825.825 0 0 0 .554.214.831.831 0 0 0 .554-.212c.386-.348 9.446-8.6 9.446-16.59" transform="translate(39.202 19.99)" style="fill:#fff;stroke:#ff00a0"/>' +
                </svg>`;

const meta: Meta<MapPlateComponent> = {
  title: 'MarkersComponent',
  component: MapPlateComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [MarkersComponent, FeatureLayerComponent],
    })
  ],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<MapPlateComponent>;

const settings = new MapSettings()
  .setCenter([30, -2])
  .setZoom(8)
  .setInteractionSettings({ altShiftDragRotate: false, pinchRotate: false });
const markers = [new MarkerModel(-2, 30, 'marker1'), new MarkerModel(-1, 30, 'marker2')]
const layerSettings = new FeatureLayerSettings()
  .setStyle(s => MarkerStyleHelper.circle(10, '#fff', '#ff0000'));

export const Primary: Story = {
  args: {
    settings: settings,
    markers, layerSettings
  } as any,
  play: async ({ canvas }: any) => {},
  render: (args: any) => ({
    props: args,
    template: '<art-map-plate [settings]="settings" [contentRef]="map">\n' +
      '\n' +
      '      </art-map-plate>\n' +
      '      <ng-template #map>\n' +
      '         <art-feature-layer [settings]="layerSettings">\n' +
      '            <art-markers [layerName]="layerSettings.name" [markers]="markers"></art-markers>\n' +
      '         </art-feature-layer>\n' +
      '      </ng-template>',
  }),
};

export const CustomMarker: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    layerSettings: new FeatureLayerSettings()
      .setStyle(s => MarkerStyleHelper.fromSvg(markerSvg))
  } as any
}
