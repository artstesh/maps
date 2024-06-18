import { PostboyGenericMessage } from '@artstesh/postboy';
import { MapPosition } from '../../models';

export class MapMoveEndEvent extends PostboyGenericMessage {
  public static readonly ID: string = 'f21f783e-b5af-4489-9fec-8027fd07a8ad';

  constructor(public position: MapPosition | null) {
    super();
  }

  public get id(): string {
    return MapMoveEndEvent.ID;
  }
}
