import { action, on, payload, reducer } from 'ts-action';
import CastState = cast.framework.CastState;
import SessionState = cast.framework.SessionState;
import { AppState } from '@store';

export const CastStateChanged = action('[Casting] Cast state changed', payload<{state: string}>());
export const SessionStateChanged = action('[Casting] Session state changed',  payload<{state: string}>());

export interface CastingState {
  readonly castState: cast.framework.CastState;
  readonly sessionState: cast.framework.SessionState;
}

const initialState: CastingState = {
  castState: null,
  sessionState: null,
};

export const selectCastingEnabled = (state: AppState) => {
    return ['SESSION_STARTED', 'SESSION_RESUMED'].includes(state.casting.sessionState);
};

// tslint:disable no-shadowed-variable
export const castingReducer = reducer<CastingState>([
  on(SessionStateChanged, (state, { payload }) => ({
    ...state,
    sessionState: payload.state as SessionState,
  })),

  on(CastStateChanged, (state, { payload }) => ({
    ...state,
    castState: payload.state as CastState,
  })),
], initialState);
