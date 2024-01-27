import { PostboyGenericMessage } from "@artstesh/postboy";

/**
 * Forces map to move to a specific point
 */
export class SetMapCenterCommand extends PostboyGenericMessage {
  public static readonly ID: string = 'd50e89c9-6707-4f8c-ab57-65fcef232182';

  /**
   *
   * @param lat - the desired latitude
   * @param lng - the desired longitude
   * @param zoom - the desired zoom; doesn't change zoom if undefined
   */
  constructor(public lat: number, public lng: number, public zoom?: number) {
    super();
  }

  public get id(): string {
    return SetMapCenterCommand.ID;
  }
}
