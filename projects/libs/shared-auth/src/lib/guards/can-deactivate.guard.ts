import { CanActivateFn } from '@angular/router';

export const canDeactivateGuard: CanActivateFn = (route, state) => {
  return true;
};
