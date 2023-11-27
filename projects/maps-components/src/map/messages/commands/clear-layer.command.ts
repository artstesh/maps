import { GenericMessage } from "../generic-message";
import { Feature } from "ol";
import { Geometry } from "ol/geom";

export class ClearLayerCommand extends GenericMessage {
  public static readonly ID = 'd02842b7-fa62-458d-b1e4-12dd814610c5';
  public get id(): string {
    return ClearLayerCommand.ID;
  }
  constructor(public layer: string) {
    super();
  }
}
