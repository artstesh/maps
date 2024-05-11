import { IdGenerator } from '../common/id.generator';
import { Feature } from 'ol';
import { Geometry, Point } from 'ol/geom';
import { MapConstants } from './map.constants';

export class MarkerModel {
  public readonly id: string | number;

  constructor(
    public readonly lat: number,
    public readonly lng: number,
    id?: string | number,
    public info?: {
      [id: string]: any;
    },
  ) {
    this.id = id == null ? IdGenerator.get() : id;
    this._feature = this.getFeature();
  }

  private _feature: Feature<Geometry>;

  public get feature(): Feature<Geometry> {
    return this._feature;
  }

  private getFeature(): Feature<Geometry> {
    const feature = new Feature(new Point([this.lng, this.lat]));
    feature.setId(this.id);
    if (this.info) feature.set(MapConstants.FeatureInfo, this.info);
    return feature;
  }
}
