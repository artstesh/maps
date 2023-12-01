import { Injectable } from '@angular/core';
import { MessageRegistratorService } from './message-registrator.service';
import { MapManagementService } from './map-management.service';
import { MapStateService } from './map-state.service';

@Injectable()
export class ServiceCollector {
  constructor(registrator: MessageRegistratorService, management: MapManagementService, state: MapStateService) {}
}
