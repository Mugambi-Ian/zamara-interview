import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { IUser } from '../models/user';

export interface IAuthContext {
  user?: IUser;
  updateUser?: Dispatch<SetStateAction<IUser>>;
}

export const AuthContext = createContext<IAuthContext>({});
export const useAuth = () => useContext(AuthContext);
