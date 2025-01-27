import { PostboyGenericMessage } from '@artstesh/postboy';

/**
 * A command class that represents the action to close a tooltip.
 */
export class CloseTooltipCommand extends PostboyGenericMessage {

  /**
   * Creates an instance of the class with the specified tooltip ID.
   *
   * @param {string} tooltipId - The unique identifier for the tooltip.
   */
  constructor(public tooltipId: string) {
    super();
  }
}
