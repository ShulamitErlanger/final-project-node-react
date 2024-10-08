import apiSlice from '../../../app/apiSlice'
const UserApiSlice = apiSlice.injectEndpoints({
endpoints: (build) => ({
getUsers: build.query({
query:(s)=>({
url: '/api/users'
}),
providesTags:["Users"]

}),
getUser: build.query({
    query:(id)=>({
    url: '/api/users/id'
    }),
    invalidatesTags:["Users"]
    
    }),
addUser: build.mutation({
    query: (user) =>({
    url: "/api/users/add",
    method: "POST",
    body: user
    }),
    invalidatesTags:["Users"]

}),

updateUser: build.mutation({
    query: (user) =>({
    url: "/api/users/update",
    method: "PUT",
    body: user
    }),
    invalidatesTags:["Users"]

}),
deleteUser: build.mutation({
    query: (user) =>({
    url: "/api/users/delete",
    method: "DELETE",
    body: user
    }),
    invalidatesTags:["Users"]
}),
addUserSurvey: build.mutation({
    query: (user) =>({
    url: "/api/users/survey",
    method: "PUT",
    body: user
    }),
    invalidatesTags:["Users"]
}),
})
})
export const {useGetUsersQuery,useGetUserQuery, useAddUserMutation,useUpdateUserMutation,useDeleteUserMutation,useAddUserSurveyMutation}=UserApiSlice

