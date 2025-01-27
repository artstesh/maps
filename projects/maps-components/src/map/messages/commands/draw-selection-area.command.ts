import { PostboyCallbackMessage } from '@artstesh/postboy';
import Style from 'ol/style/Style';
import { IIdentified } from '../../models/i-identified';
import { Dictionary } from '@artstesh/collections';
import { DrawingType } from '../../models';

/**
 * Class representing a command to draw a selection area with a specific type and style.
 *
 * @return {Dictionary<IIdentified[]>} - a collection of features inside the selected area, grouped by a layer's name
 */
export class DrawSelectionAreaCommand extends PostboyCallbackMessage<Dictionary<IIdentified[]>> {

  /**
   * Constructs a new instance with the specified type, style, and optional set of ignored items.
   *
   * @param {DrawingType} type - The type of drawing to be created.
   * @param {Style} style - The style information for the drawing.
   * @param {Set<string>} [ignore=new Set<string>()] - Optional set of items to be ignored.
   */
  constructor(public type: DrawingType, public style: Style, public ignore: Set<string> = new Set<string>()) {
    super();
  }
}
