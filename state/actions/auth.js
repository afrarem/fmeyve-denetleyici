import {ACTIONS} from '../action';

export const getToken = () => (dispatch) => {
  dispatch({action: ACTIONS.AUTH_TOKEN_START, payload: null});
};