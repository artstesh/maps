import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { PostboyGenericMessage } from '@artstesh/postboy';

export class AddTileCommand extends PostboyGenericMessage {
  public static readonly ID: string = '25b7df28-72ce-4453-9fe6-54285a2fdc57';

  constructor(public layer: TileLayer<XYZ>) {
    super();
  }

  public get id(): string {
    return AddTileCommand.ID;
  }
}

