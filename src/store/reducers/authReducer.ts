import UserService from '../../api/UserService'
import { AppDispatch } from '../redux-store'


export interface IUser {
  username: string
  password: string
}
interface AuthState {
  isAuth: boolean
  user: IUser
  isLoading: boolean
  error: string
}
enum AuthActionEnum {
  SET_AUTH = 'SET_AUTH',
  SET_USER = 'SET_USER',
  SET_ERROR = 'SET_ERROR',
  SET_IS_LOADING = 'SET_IS_LOADING',
}
interface SetAuthAction {
  type: AuthActionEnum.SET_AUTH
  payload: boolean
}
interface SetUserAction {
  type: AuthActionEnum.SET_USER
  payload: IUser
}
interface SetIsLoadingAction {
  type: AuthActionEnum.SET_IS_LOADING
  payload: boolean
}
interface SetErrorAction {
  type: AuthActionEnum.SET_ERROR
  payload: string
}

type AuthActions = SetAuthAction | SetUserAction | SetErrorAction | SetIsLoadingAction

export const AuthActionCreators = {
  setAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
  setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
  setIsLoading: (isLoad: boolean): SetIsLoadingAction => (
    {type: AuthActionEnum.SET_IS_LOADING, payload: isLoad}),
  setError: (error: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: error}),
  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {     
      dispatch(AuthActionCreators.setIsLoading(true))
      setTimeout(async() => {
        const response = await UserService.getUsers()  
        const mockUser = response.data.find(user => {
          return user.username === username && user.password === password
        }) 
        if(mockUser) {
          localStorage.setItem('auth', 'true')
          localStorage.setItem('user', mockUser.username)
          dispatch(AuthActionCreators.setAuth(true))
          dispatch(AuthActionCreators.setUser(mockUser))
        } else {
          dispatch(AuthActionCreators.setError('invalid username or password'))
        }
        dispatch(AuthActionCreators.setIsLoading(false))    
      }, 1000)
 
    } catch (e) {
      dispatch(AuthActionCreators.setError('an error accurred during login'))
    }    
  },
  logout: () => async (dispatch: AppDispatch) => {    
    localStorage.removeItem('auth')
    localStorage.removeItem('user')
    dispatch(AuthActionCreators.setAuth(false))
    dispatch(AuthActionCreators.setUser({} as IUser))    
  }

}    

const initialState: AuthState = {
  isAuth: false,
  user: {} as IUser,
  isLoading: false,
  error: ''
}

const authReducer = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AuthActionEnum.SET_AUTH: 
      return {...state, isAuth: action.payload, isLoading: false}
    case AuthActionEnum.SET_USER:
      return {...state, user: action.payload}
    case AuthActionEnum.SET_IS_LOADING:
      return {...state, isLoading: action.payload}
    case AuthActionEnum.SET_ERROR:
      return {...state, error: action.payload, isLoading: false}
    default:
      return state
  }
}

export default authReducer
