import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

let initialState = {
  companies: [],
  selectedCompany: {},
  errors: "",
};

const companiesSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
          populateCompanies(state, action) {
            state.companies = action.payload;
          },
          selectCompany(state, action) {
            state.selectedCompany = action.payload;
          },
          unselectCompany(state) {
            state.selectedCompany = null;
          },
          deleteCompany: (state, action) => {
            const payload = action.payload;
            const index = state.companies.findIndex((item) => item._id === payload);
            if (index !== -1) {
                state.companies.splice(index, 1);
            }
          },
          updateCompany: (state, action) => {
            const payload = action.payload;
            const index = state.companies.findIndex((item) => item._id === payload._id);
            if (index !== -1) {
              state.companies[index] = payload;
            }
          },
          addCompany: (state, action) => {
            const payload = action.payload;
            state.companies.push(payload);
          },
          setErrors(state, action) {
            state.errors = action.payload;
          },       
    }
})

export const fetchCompanies = () => async (dispatch) => {
    axios.get('/compwait',{withCredentials : true}).then((res,err)=>{
       /* if(err){
            dispatch(setErrors(err));
        }else {
            dispatch(populateUsers(res));
          }*/
          dispatch(populateCompanies(res.data));
    })
  }

  export const selectCompanies = (state) => {
    return [state.companies.companies,state.users.errors];
  }

  export const selectSelectedCompany = (state) => {
    return state.companies.selectedCompany;
  };
  

  export const {
    populateCompanies,
    selectCompany,
    unselectCompany,
    deleteCompany,
    updateCompany,
    addCompany,
    setErrors
  } = companiesSlice.actions;
  
  export default companiesSlice.reducer;
  