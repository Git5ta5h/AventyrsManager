import {create} from 'zustand';

const useAdminStore = create((set) => ({
    Id: null,
    Username: '',
    Password: '',
    setAdminInfo: (Id, Username, Password) => set({ Id: Id, Username, Password }),
}));

export default useAdminStore;