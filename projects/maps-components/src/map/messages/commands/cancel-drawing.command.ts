import { PostboyGenericMessage } from '@artstesh/postboy';

/**
 * Represents a command to cancel a drawing action.
 */
export class CancelDrawingCommand extends PostboyGenericMessage {
  static readonly ID = '192d70f8-9d12-4cb3-a8ad-0fc2dc5af1de';
}
