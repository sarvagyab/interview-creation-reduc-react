import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    loading: false,
    hasErrors: false,
    users: {},
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers: (state) => {
            state.loading = true
        },
        getUsersSuccess: (state, { payload }) => {
            payload.forEach(user=>{
                state.users[user.id] = user;
            })
            // console.log('Im getting called here')
            state.loading = false
            state.hasErrors = false
        },
        getUsersFailure: (state) => {
            state.loading = false
            state.hasErrors = true
        },
        deleteUsers: (state) => {
            state.loading = true;
        },
        deleteUsersSuccess: (state,{payload}) =>{
            state.loading = false;
            console.log(payload);
            delete state.users[payload.id]
        },
        deleteUsersFail: (state) =>{
            state.loading = false;
            state.hasErrors = true;
        },
        postUsers: (state) => {
            state.loading = true;
        },
        postUsersSuccess: (state,{payload}) =>{
            console.log(payload);
            state.loading = false;
        },
        postUsersFail: (state) =>{
            state.loading = false;
            state.hasErrors = true;
        },
        updateUsers: (state) => {
            state.loading = true;
        },
        updateUsersSuccess: (state,{payload}) =>{
            console.log(payload);
            state.loading = false;
        },
        updateUsersFail: (state) =>{
            state.loading = false;
            state.hasErrors = true;
        }
    },
})


// Three actions generated from the slice
export const {getUsers, getUsersSuccess, getUsersFailure,deleteUsers,deleteUsersSuccess,deleteUsersFail,postUsers,postUsersSuccess,postUsersFail,updateUsers,updateUsersSuccess,updateUsersFail} = usersSlice.actions

// A selector
export const usersSelector = (state) => state.users

// The reducer
export default usersSlice.reducer


export function fetchUsers() {
    return async (dispatch) => {
        dispatch(getUsers())

        try {
            const response = await fetch('http://localhost:3000/users.json/');
            const data = await response.json()
            dispatch(getUsersSuccess(data))
        } catch (error) {
            dispatch(getUsersFailure())
        }
    }
}


export function deleteUser(id){
    return async(dispatch) => {
        dispatch(deleteUsers());
        try{
            const response = await fetch(`http://localhost:3000/users/${id}.json`,{
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8' 
                },
            });
            const data = await response.json();
            dispatch(deleteUsersSuccess({id,...data}));
        }catch(error){
            console.log(error);
            dispatch(deleteUsersFail());
        }
    }
}


export function postUser(formData){
    return async(dispatch) => {
        dispatch(postUsers());
        try{
            const response = await fetch(`http://localhost:3000/users.json`,{
                method: 'POST',
                body:formData
            });
            const data = await response.json();
            console.log('response - ',data);
            dispatch(postUsersSuccess(data));
        }catch(error){
            console.log(error);
            dispatch(postUsersFail());
        }
    }
}

export function updateUser(formData,id){
    return async(dispatch) => {
        dispatch(updateUsers());
        try{
            const response = await fetch(`http://localhost:3000/users/${id}.json`,{
                method: 'PATCH',
                body:formData
            });
            const data = await response.json();
            console.log('response - ',data);
            dispatch(updateUsersSuccess(data));
        }catch(error){
            console.log(error);
            dispatch(updateUsersFail());
        }
    }
}