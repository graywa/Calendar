import axios, { AxiosResponse } from 'axios'
import { IUser } from '../store/reducers/authReducer'

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return axios.get<IUser[]>('./users.json')
  }
}