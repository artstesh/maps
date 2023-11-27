import { IdGenerator } from "../common/id.generator";
import { Feature } from "ol";
import { Geometry } from "ol/geom";
import { WKT } from "ol/format";

export class MarkerModel {
  private _feature: Feature<Geometry>;
  public get feature(): Feature<Geometry> {
    return this._feature;
  }

  constructor(public lat: number, public lng: number, public id?: string | number, public info?: { [id: string]: any }) {
    if (!id) this.id = IdGenerator.get();
    this._feature = this.getFeature();
  }

  private getFeature(): Feature<Geometry> {
    const feature = new Feature();
    const geometry = new WKT().readGeometry(`POINT (${this.lng} ${this.lat})`);
    feature.setGeometry(geometry);
    feature.setId(this.id);
    if (this.info) {
      Object.keys(this.info).forEach((k) => feature.set(k, this.info![k]));
    }
    return feature;
  }
}
