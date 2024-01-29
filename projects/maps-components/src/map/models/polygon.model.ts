import { IdGenerator } from '../common/id.generator';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { GeoJSON, WKT } from 'ol/format';
import { getCenter } from 'ol/extent';
import { MapConstants } from "./map.constants";

export class PolygonModel {
  public readonly id: string | number;
  public readonly lat: number;
  public readonly lng: number;
  private _feature: Feature<Geometry>;

  public static fromGeoJson(id: string | number, json: string, info?: { [id: string]: any }): PolygonModel {
    let feature = new GeoJSON().readFeature(json);
    feature.setId(id);
    return new PolygonModel(feature, id, info);
  }

  public static fromWKT(id: string | number, wkt: string, info?: { [id: string]: any }): PolygonModel {
    let feature = new WKT().readFeature(wkt);
    feature.setId(id);
    return new PolygonModel(feature, id, info);
  }

  private constructor(feature: Feature<Geometry>, id?: string | number, public info?: { [id: string]: any }) {
    this.id = id == null ? IdGenerator.get() : id;
    this._feature = feature;
    if (this.info) this._feature?.set(MapConstants.FeatureInfo, this.info);
    [this.lng, this.lat] = getCenter(this._feature.getGeometry()?.getExtent()!);
  }

  public get feature(): Feature<Geometry> {
    return this._feature;
  }
}
