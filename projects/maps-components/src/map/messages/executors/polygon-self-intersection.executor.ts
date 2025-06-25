import { PostboyGenericMessage } from '@artstesh/postboy';
import { PolygonModel } from '../../models';

export class PolygonSelfIntersectionExecutor extends PostboyGenericMessage {
  static readonly ID = 'a4ef116d-fe40-4e92-9d4a-653f8b398c62';

  constructor(public polygon: PolygonModel) {
    super();
  }
}
