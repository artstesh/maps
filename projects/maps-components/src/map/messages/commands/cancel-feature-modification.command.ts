import { PostboyGenericMessage } from "@artstesh/postboy";

export class CancelFeatureModificationCommand extends PostboyGenericMessage {
  public static readonly ID: string = '9c9fb40f-ea95-4704-8177-0e9ecabf36fa';

  public get id(): string {
    return CancelFeatureModificationCommand.ID;
  }
}
