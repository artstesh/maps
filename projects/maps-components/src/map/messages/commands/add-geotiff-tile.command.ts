import {PostboyGenericMessage} from "@artstesh/postboy";
import TileLayer from "ol/layer/WebGLTile";

export class AddGeotiffTileCommand extends PostboyGenericMessage {
  static readonly ID = '80e1b7be-09cd-43de-b11c-e0699a91b287';

  constructor(public layer: TileLayer) {
    super();
  }
}
