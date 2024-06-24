import {create} from 'zustand';
import createUserSlice from './userSlice';
import createNotificationSlice from './notificationSlice';

const useStore = create((set) => ({
  ...createUserSlice(set),
  ...createNotificationSlice(set),
}));

export default useStore;
