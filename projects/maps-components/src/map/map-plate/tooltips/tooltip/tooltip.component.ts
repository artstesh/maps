import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TooltipSettings } from './tooltip.settings';
import { DestructibleComponent } from '../../../common/destructible.component';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { MapClickEvent, MapRenderedEvent } from '../../../messages';
import Map from 'ol/Map';
import { CloseTooltipCommand } from '../../../messages/commands/close-tooltip.command';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import Overlay, { Options as OverlayOptions } from 'ol/Overlay';

@Component({
  selector: 'lib-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent extends DestructibleComponent implements OnInit {
  @ViewChild('tip') container!: ElementRef<HTMLElement>;
  _settings: TooltipSettings = new TooltipSettings();
  private map?: Map;
  overlay?: Overlay;
  show = false;

  @Input() set settings(value: TooltipSettings | undefined) {
    if (!value || this._settings.isSame(value)) return;
    this._settings = value;
    this.detector.detectChanges();
  }
  constructor(private postboy: MapPostboyService,
              private detector: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.subs.push(this.observeMapRender());
    this.subs.push(this.observeMapClick());
    this.subs.push(this.observeClose());
  }

  private observeMapClick(): Subscription {
    return this.postboy
      .subscribe<MapClickEvent>(MapClickEvent.ID)
      .subscribe((ev) => {
        this._settings.show(ev) ? this.addOverlay(ev.coordinates) : this.removeOverlay();
      });
  }

  private observeClose(): Subscription {
    return this.postboy
      .subscribe<CloseTooltipCommand>(CloseTooltipCommand.ID)
      .pipe(filter((ev) => ev.tooltipId === this._settings.id))
      .subscribe(() => this.removeOverlay());
  }

  private observeMapRender() {
    return this.postboy.subscribe<MapRenderedEvent>(MapRenderedEvent.ID).subscribe((m) => {
      this.map = m.map;
    });
  }

  private removeOverlay = () => {
    !!this.overlay && this.map?.removeOverlay(this.overlay);
    this.show = false;
  };

  addOverlay(coordinates: number[]): void {
    this.removeOverlay();
    this.overlay = new Overlay(this.options(coordinates));
    this.map?.addOverlay(this.overlay);
    this.show = true;
    this.detector.detectChanges();
  }

  options = (coordinates: number[]): OverlayOptions => {
    return {
      element: this.container?.nativeElement,
      autoPan: false,
      autoPanAnimation: { duration: 0 },
      position: coordinates,
    };
  };
}
