import {configureStore} from '@reduxjs/toolkit';
import { profileReducer, userReducer,subscriptionReducer } from './reducers/userReducers';
import { courseReducer } from './reducers/courseReducers';
import { adminReducer } from './reducers/adminReducers';
import { otherReducer } from './reducers/otherReducers';


// let initialState = {
//     user:{
//         user:localStorage.
//     }
// }

const store = configureStore({
    reducer:{
        user: userReducer,
        profile: profileReducer,
        course: courseReducer,
        subscription:subscriptionReducer,
        admin:adminReducer,
        other:otherReducer,
    }
})

export default store;

// export const server = 'https://ecommerce-jfiz.onrender.com/api/v1'
export const server = 'https://course-bundler-phi.vercel.app/api/v1'
// export const server = 'http://localhost:4000/api/v1'