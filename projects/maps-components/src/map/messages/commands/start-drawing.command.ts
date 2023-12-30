import { PostboyCallbackMessage } from '@artstesh/postboy';
import { DrawingType, FeatureOutputFormat } from '../../models';
import Style from "ol/style/Style";
import { Geometry } from "ol/geom";
import { Feature } from "ol";

export class StartDrawingCommand extends PostboyCallbackMessage<Feature<Geometry> | null> {
  public static readonly ID: string = 'da904f4b-a1c8-4db7-a6af-14d9ee18ec8c';

  constructor(public type: DrawingType, public style: Style) {
    super();
  }

  public get id(): string {
    return StartDrawingCommand.ID;
  }
}
