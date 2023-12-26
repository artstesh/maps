import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { PostboyGenericMessage } from '@artstesh/postboy';

export class RemoveTileCommand extends PostboyGenericMessage {
  public static readonly ID: string = 'c36ccc0b-5638-4819-b148-2de57a59a5b7';

  constructor(public layer: TileLayer<XYZ>) {
    super();
  }

  public get id(): string {
    return RemoveTileCommand.ID;
  }
}
