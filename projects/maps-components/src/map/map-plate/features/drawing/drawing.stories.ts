import { Component, inject } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import { MapSettings } from '../../../models';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { DrawingFinishedEvent } from '../../../messages/events/drawing-finished.event';
import { CancelDrawingCommand } from '../../../messages/commands/cancel-drawing.command';
import { StartDrawingCommand } from '../../../messages/commands/start-drawing.command';
import { DrawingType } from '../../../models';
import { MapPlateComponent } from '../../map-plate.component';

/**
 * Story-only toolbar: floats over the map, fires drawing commands into the
 * plate's postboy and shows the GeoJSON result of the finished drawing.
 */
@Component({
  selector: 'art-story-drawing-toolbar',
  standalone: true,
  template: `
    <div class="draw-toolbar">
      <button (click)="start(DrawingType.Polygon)">Polygon</button>
      <button (click)="start(DrawingType.Circle)">Circle</button>
      <button (click)="start(DrawingType.Square)">Square</button>
      <button (click)="start(DrawingType.Box)">Box</button>
      <button (click)="start(DrawingType.LineString)">Line</button>
      <button (click)="cancel()">Cancel</button>
      <span class="result">{{ last }}</span>
    </div>
  `,
  styles: [
    `
      .draw-toolbar {
        position: absolute;
        bottom: 12px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 5;
        display: flex;
        gap: 6px;
        align-items: center;
        background: rgba(255, 255, 255, 0.92);
        border: 1px solid #c8c8c8;
        border-radius: 6px;
        padding: 6px 10px;
        font-family: sans-serif;
        font-size: 12px;
      }
      .draw-toolbar .result {
        max-width: 260px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #555;
      }
    `,
  ],
})
export class DrawingToolbarComponent {
  DrawingType = DrawingType;
  last = 'pick a shape and draw on the map';
  private postboy = inject(MapPostboyService);

  constructor() {
    this.postboy.sub(DrawingFinishedEvent).subscribe(() => (this.last = 'drawing finished'));
  }

  start(type: DrawingType): void {
    const style = new Style({
      stroke: new Stroke({ color: '#e53935', width: 2 }),
      fill: new Fill({ color: 'rgba(229, 57, 53, 0.15)' }),
    });
    this.postboy.fireCallback(new StartDrawingCommand(type, style), (r) => {
      this.last = r ? 'result: ' + r.slice(0, 80) + '…' : 'drawing cancelled';
    });
  }

  cancel(): void {
    this.postboy.fire(new CancelDrawingCommand());
  }
}

const meta: Meta<MapPlateComponent> = {
  title: 'Features/Drawing',
  component: MapPlateComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DrawingToolbarComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<MapPlateComponent>;

export const Toolbar: Story = {
  args: {
    settings: new MapSettings().setCenter([30.5, -1.8]).setZoom(8),
  } as any,
  render: (args: any) => ({
    props: args,
    template:
      '<art-map-plate [settings]="settings" [contentRef]="content">' +
      '<ng-template #content><art-story-drawing-toolbar></art-story-drawing-toolbar></ng-template>' +
      '</art-map-plate>',
  }),
};
