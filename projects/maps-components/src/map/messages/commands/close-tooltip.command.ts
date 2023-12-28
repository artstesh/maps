import { PostboyGenericMessage } from '@artstesh/postboy';

export class CloseTooltipCommand extends PostboyGenericMessage {
  public static readonly ID: string = '4896d52c-e34f-4994-bcfd-32832d12dbe4';

  constructor(public tooltipId: string) {
    super();
  }

  public get id(): string {
    return CloseTooltipCommand.ID;
  }
}
