import { PostboyCallbackMessage } from '@artstesh/postboy';
import Style from 'ol/style/Style';
import { IIdentified } from '../../models/i-identified';
import { Dictionary } from "@artstesh/collections";
import { DrawingType } from "../../models";

export class DrawSelectionAreaCommand extends PostboyCallbackMessage<Dictionary<IIdentified[]>> {
  public static readonly ID: string = '573d8a0d-f25b-42b7-9ad7-0ac6d86ac362';

  constructor(public type: DrawingType, public style: Style, public ignore: Set<string> = new Set<string>()) {
    super();
  }

  public get id(): string {
    return DrawSelectionAreaCommand.ID;
  }
}
