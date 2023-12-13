import { GenericMessage } from "../generic-message";
import { Vector as Layer } from "ol/layer";
import VectorSource from "ol/source/Vector";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";

export class AddTileCommand extends GenericMessage {
  public static readonly ID = '25b7df28-72ce-4453-9fe6-54285a2fdc57';

  constructor(public layer: TileLayer<XYZ>) {
    super();
  }

  public get id(): string {
    return AddTileCommand.ID;
  }
}

