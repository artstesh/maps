import {PostboyGenericMessage} from "@artstesh/postboy";
import TileLayer from "ol/layer/WebGLTile";

export class RemoveGeotiffTileCommand extends PostboyGenericMessage {
  static readonly ID = '5545a521-62c4-4b25-a555-ee264258799b';

  constructor(public layer: TileLayer) {
    super();
  }
}
