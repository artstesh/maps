import { PostboyCallbackMessage } from '@artstesh/postboy';
import { DrawingType, FeatureOutputFormat } from '../../models';
import Style from "ol/style/Style";

export class StartDrawingCommand extends PostboyCallbackMessage<string | null> {
  public static readonly ID: string = 'da904f4b-a1c8-4db7-a6af-14d9ee18ec8c';

  constructor(public type: DrawingType, public format: FeatureOutputFormat = FeatureOutputFormat.GeoJson,
              public style?: Style) {
    super();
  }

  public get id(): string {
    return StartDrawingCommand.ID;
  }
}
