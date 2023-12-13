import { GenericMessage } from "../generic-message";
import BaseLayer from "ol/layer/Base";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";

export class RemoveTileCommand extends GenericMessage {
  public static readonly ID = 'c36ccc0b-5638-4819-b148-2de57a59a5b7';

  constructor(public layer: TileLayer<XYZ>) {
    super();
  }

  public get id(): string {
    return RemoveTileCommand.ID;
  }
}
