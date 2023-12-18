import { MapClickEvent } from '../../../messages';
import { IdGenerator } from '../../../common/id.generator';

export class TooltipSettings {
  public readonly id: string;
  containerClass: string = 'custom-tooltip-class';
  show: (ev: MapClickEvent) => boolean = (e) => true;

  public constructor(id?: string) {
    this.id = id ?? IdGenerator.get();
  }

  public static copy(model: TooltipSettings): TooltipSettings {
    const result = new TooltipSettings(model.id);
    result.show = model.show;
    result.containerClass = model.containerClass;
    return result;
  }

  setShow(show: (ev: MapClickEvent) => boolean): TooltipSettings {
    return TooltipSettings.copy({ ...this, show });
  }

  setClass(containerClass: string): TooltipSettings {
    return TooltipSettings.copy({ ...this, containerClass });
  }

  public isSame(model: TooltipSettings): boolean {
    if (this.show !== model.show) return false;
    if (this.containerClass !== model.containerClass) return false;
    if (this.id !== model.id) return false;
    return true;
  }
}
