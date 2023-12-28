import { PostboyGenericMessage } from '@artstesh/postboy';

export class CancelDrawingCommand extends PostboyGenericMessage {
  public static readonly ID: string = '7d38d983-feba-4176-a66b-18175e5ecd6b';

  public get id(): string {
    return CancelDrawingCommand.ID;
  }
}
