import { PostboyGenericMessage } from "@artstesh/postboy";

/**
 * Forces map to move to a specific point
 */
export class SetMapCenterCommand extends PostboyGenericMessage {
  static readonly ID = 'd4e3cf4f-0be7-4c1a-8355-8607d02c3dea'

  /**
   *
   * @param lat - the desired latitude
   * @param lng - the desired longitude
   * @param zoom - the desired zoom; doesn't change zoom if undefined
   */
  constructor(public lat: number, public lng: number, public zoom?: number) {
    super();
  }
}
