import { PostboyGenericMessage } from '@artstesh/postboy';

/**
 * Represents a command to cancel a feature modification.
 */
export class CancelFeatureModificationCommand extends PostboyGenericMessage {
  static readonly ID = 'e7886353-53b3-4bbe-93b5-6490e5f1305e';
}
