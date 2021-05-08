import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

let initialState = {
  users: [],
  selectedUser: {},
  errors: "",
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
          populateUsers(state, action) {
            state.users = action.payload;
          },
          selectUser(state, action) {
            state.selectedUser = action.payload;
          },
          unselectUser(state) {
            state.selectedUser = null;
          },
          deleteUser: (state, action) => {
            const payload = action.payload;
            const index = state.users.findIndex((item) => item._id === payload);
            if (index !== -1) {
                state.users.splice(index, 1);
            }
          },
          updateUser: (state, action) => {
            const payload = action.payload;
            const index = state.users.findIndex((item) => item._id === payload._id);
            if (index !== -1) {
              state.users[index] = payload;
            }
          },
          addUser: (state, action) => {
            const payload = action.payload;
            state.users.push(payload);
          },
          setErrors(state, action) {
            state.errors = action.payload;
          },       
    }
})

export const fetchUsers = () => async (dispatch) => {
    axios.get('/users',{withCredentials : true}).then((res,err)=>{
       /* if(err){
            dispatch(setErrors(err));
        }else {
            dispatch(populateUsers(res));
          }*/
          dispatch(populateUsers(res.data));
    })
  }

  export const selectUsers = (state) => {
    return [state.users.users,state.users.errors];
  }

  export const selectSelectedUser = (state) => {
    return state.users.selectedUser;
  };
  

  export const {
    populateUsers,
    selectUser,
    unselectUser,
    deleteUser,
    updateUser,
    addUser,
    setErrors
  } = usersSlice.actions;
  
  export default usersSlice.reducer;
  