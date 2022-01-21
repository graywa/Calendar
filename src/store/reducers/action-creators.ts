import { AuthActionCreators } from './authReducer'
import { EventActionCreators } from './eventReducer'

export const allActionCreators = {
  ...AuthActionCreators,
  ...EventActionCreators
}