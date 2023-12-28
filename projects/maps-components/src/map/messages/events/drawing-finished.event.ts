import { PostboyGenericMessage } from '@artstesh/postboy';

export class DrawingFinishedEvent extends PostboyGenericMessage {
  public static readonly ID: string = 'c724b68e-b4eb-4783-90f1-a8e31973fd36';

  constructor() {
    super();
  }

  public get id(): string {
    return DrawingFinishedEvent.ID;
  }
}
