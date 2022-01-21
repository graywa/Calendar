import axios from 'axios'
import { AppDispatch } from '../redux-store'


interface IUser {
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
  setAuth: (auth: boolean) => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
  setUser: (user: IUser) => ({type: AuthActionEnum.SET_USER, payload: user}),
  setIsLoading: (isLoad: boolean) => ({type: AuthActionEnum.SET_IS_LOADING, payload: isLoad}),
  setError: (error: string) => ({type: AuthActionEnum.SET_ERROR, payload: error}),
  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {       
      // @ts-ignore
      dispatch(AuthActionCreators.setIsLoading(true))
      setTimeout(async() => {
        const response = await axios.get<IUser[]>('./users.json')  
        const mockUser = response.data.find(user => {
          return user.username === username && user.password === password
        }) 
        if(mockUser) {
          localStorage.setItem('auth', 'true')
          localStorage.setItem('user', mockUser.username)
          // @ts-ignore
          dispatch(AuthActionCreators.setAuth(true))
          // @ts-ignore
          dispatch(AuthActionCreators.setUser(mockUser))
        } else {
          // @ts-ignore
          dispatch(AuthActionCreators.setError('invalid username or password'))
        }
        // @ts-ignore
        dispatch(AuthActionCreators.setIsLoading(false))    
      }, 1000)
 
    } catch (e) {
      // @ts-ignore
      dispatch(AuthActionCreators.setError('an error accurred during login'))
    }    
  },
  logout: () => async (dispatch: AppDispatch) => {    
    localStorage.removeItem('auth')
    localStorage.removeItem('user')
    // @ts-ignore
    dispatch(AuthActionCreators.setAuth(false))
    // @ts-ignore
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
