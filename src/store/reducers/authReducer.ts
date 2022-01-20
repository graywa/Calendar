interface AuthState {
  isAuth: boolean
}

enum AuthActionEnum {
  SET_AUTH = 'SET_AUTH'
}

interface SetAuthAction {
  type: AuthActionEnum.SET_AUTH
  payload: boolean
}

type AuthAction = SetAuthAction

const initialState: AuthState = {
  isAuth: false
}

 const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionEnum.SET_AUTH: 
      return {...state, isAuth: action.payload}
    default:
      return state
  }
}

export default authReducer