import UserService from '../../api/UserService'
import { AppDispatch } from './../redux-store'
import { IUser } from './authReducer'

export interface IEvent {
  author: string
  guest: string
  date: string
  description: string
}

export interface EventState {
  guests: IUser[],
  events: IEvent[]
}

enum EventActionEnum {
  SET_GUESTS = 'SET_GUESTS',
  SET_EVENTS = 'SET_EVENTS'
}

interface SetGuestAction {
  type: EventActionEnum.SET_GUESTS,
  payload: IUser[]
}

interface SetEventsAction {
  type: EventActionEnum.SET_EVENTS,
  payload: IEvent[]
}

type EventAction = SetGuestAction | SetEventsAction

export const EventActionCreators = {
  setGuests: (guests: IUser[]): SetGuestAction => ({type: EventActionEnum.SET_GUESTS, payload: guests}),
  setEvents: (events: IEvent[]): SetEventsAction => ({type: EventActionEnum.SET_EVENTS, payload: events}),
  fetchGuests: () => async(dispatch: AppDispatch) => {
    try {
      const response = await UserService.getUsers()      
      dispatch(EventActionCreators.setGuests(response.data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState: EventState = {
  guests: [],
  events: []
}

const eventReducer = (state = initialState, action: EventAction ): EventState => {
  switch (action.type) {
    case EventActionEnum.SET_GUESTS:
      return {...state, guests: action.payload}
    case EventActionEnum.SET_EVENTS:
      return {...state, events: action.payload}
    default:
      return state
  }    
}

export default eventReducer