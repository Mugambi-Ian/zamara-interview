import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { IStaff } from '../models/staff';

export interface IStaffContext {
  edit?: number;
  staff?: IStaff[];
  setEdit?: Dispatch<SetStateAction<number>>;
  updateStaff?: Dispatch<SetStateAction<IStaff[]>>;
}

export const StaffContext = createContext<IStaffContext>({});
export const useStaff = () => useContext(StaffContext);
