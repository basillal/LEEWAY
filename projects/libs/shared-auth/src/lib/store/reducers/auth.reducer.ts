import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { AuthState, initialAuthState } from '../state/auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, AuthActions.refreshToken, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { user, token, refreshToken }) => ({
    ...state,
    user,
    token,
    refreshToken,
    isAuthenticated: true,
    isLoading: false,
  })),
  on(AuthActions.loginFailure, AuthActions.refreshTokenFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(AuthActions.logout, () => initialAuthState),
  // on(AuthActions.refreshTokenSuccess, (state, { token }) => ({
  //   ...state,
  //   token,
  //   isLoading: false,
  // }))
);
