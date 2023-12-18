import { GenericMessage } from "../generic-message";

export class CloseTooltipCommand  extends GenericMessage {
  public static readonly ID = '4896d52c-e34f-4994-bcfd-32832d12dbe4';

  constructor(public tooltipId: string) {
    super();
  }

  public get id(): string {
    return CloseTooltipCommand.ID;
  }
}
