import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/authService.service';
import * as AuthActions from '../actions/auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authService.login(action).pipe(
          map(response => AuthActions.loginSuccess(response)),
          catchError(error => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => this.router.navigate(['/dashboard']))
    ),
    { dispatch: false }
  );

  // refreshToken$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.refreshToken),
  //     mergeMap(() =>
  //       this.authService.refreshAccessToken().pipe(
  //         map(response => response ? AuthActions.refreshTokenSuccess(response) : AuthActions.refreshTokenFailure({ error: 'Token refresh failed' })),
  //         catchError(error => of(AuthActions.refreshTokenFailure({ error: error.message })))
  //       )
  //     )
  //   )
  // );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.authService.logout();
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
