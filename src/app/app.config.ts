import { InjectionToken } from '@angular/core';
import { Environment } from '../models/Environment';

export const APP_CONFIG = new InjectionToken<Environment>('app.config');