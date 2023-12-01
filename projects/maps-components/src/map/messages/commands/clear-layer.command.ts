import { GenericMessage } from '../generic-message';

export class ClearLayerCommand extends GenericMessage {
  public static readonly ID = 'd02842b7-fa62-458d-b1e4-12dd814610c5';

  constructor(public layer: string) {
    super();
  }

  public get id(): string {
    return ClearLayerCommand.ID;
  }
}
