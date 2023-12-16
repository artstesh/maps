import { GenericMessage } from "../generic-message";

export class MapClickEvent extends GenericMessage {
  public static readonly ID = '323df526-8d9c-49c6-83e8-6e9a1e7762f7';

  constructor(public coordinates: number[], public entities: {[layer: string]: (string | number)[]}) {
    super();
  }

  public get id(): string {
    return MapClickEvent.ID;
  }
}
