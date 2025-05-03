import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const appAPI=createApi({
    reducerPath:"appAPI",
    baseQuery:fetchBaseQuery({baseUrl:`${import.meta.env.VITE_BACKEND_URL}/auth`}),
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(user)=>({
                url:"/register",
                method:"POST",
                body:user,
            })
        }),
        login:builder.mutation({
            query:(user)=>({
                url:"/login",
                method:"POST",
                body:user,
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:"/logout",
                method:"POST",
            })
        })
    })
})
export const {useRegisterMutation,useLoginMutation,useLogoutMutation}=appAPI;
export default appAPI;