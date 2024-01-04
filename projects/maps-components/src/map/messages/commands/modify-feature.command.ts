import { PostboyCallbackMessage } from '@artstesh/postboy';
import { FeatureOutputFormat, PolygonModel } from '../../models';
import Style from "ol/style/Style";

export class ModifyFeatureCommand extends PostboyCallbackMessage<string | null> {
  public static readonly ID: string = 'ead85caa-24c6-4844-a68c-2cea91774c8c';

  constructor(public model: PolygonModel,
              public style: Style,
              public format: FeatureOutputFormat = FeatureOutputFormat.GeoJson) {
    super();
  }

  public get id(): string {
    return ModifyFeatureCommand.ID;
  }
}
