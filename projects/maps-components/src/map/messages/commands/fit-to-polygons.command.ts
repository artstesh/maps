import { PostboyGenericMessage } from '@artstesh/postboy';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { PolygonModel } from '../../models';

export class FitToPolygonsCommand extends PostboyGenericMessage {
  public static readonly ID: string = 'a9e42b23-ffaf-4c46-8370-e0432cd14d60';

  constructor(public features: PolygonModel[], public zoomAfter = 0) {
    super();
  }

  public get id(): string {
    return FitToPolygonsCommand.ID;
  }
}
