import { Injectable } from '@angular/core';
import { IPostboyDependingService } from '@artstesh/postboy';
import { MapPostboyService } from '../map-postboy.service';
import { Draw } from 'ol/interaction';
import { DrawingType } from '../../models';
import { createRegularPolygon } from 'ol/interaction/Draw';
import { GenerateDrawQuery } from '../../messages/queries/generate-draw.query';

@Injectable()
export class DrawingGenerationService implements IPostboyDependingService {
  constructor(private postboy: MapPostboyService) {}

  up(): void {
    this.postboy.subscribe<GenerateDrawQuery>(GenerateDrawQuery.ID).subscribe((ev) => {
      ev.finish(
        new Draw({
          source: ev.layer.getSource()!,
          type: DrawingType[ev.type] as any,
          style: ev.style,
          geometryFunction: ev.type !== DrawingType.Circle ? undefined : createRegularPolygon(32),
        }),
      );
    });
  }
}
