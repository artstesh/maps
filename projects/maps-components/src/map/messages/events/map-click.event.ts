import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { IIdentified } from '../../models/i-identified';
import { PostboyGenericMessage } from '@artstesh/postboy';

export class MapClickEvent extends PostboyGenericMessage {
  public static readonly ID: string = '323df526-8d9c-49c6-83e8-6e9a1e7762f7';

  constructor(
    public coordinates: number[],
    public entities: { [layer: string]: IIdentified[] },
    public features: { [layer: string]: Feature<Geometry>[] },
  ) {
    super();
  }

  public get id(): string {
    return MapClickEvent.ID;
  }
}
