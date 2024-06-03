import apiSlice from '../../../app/apiSlice'
const mailApiSlice = apiSlice.injectEndpoints({
endpoints: (build) => ({
    
sendMail: build.mutation({
    query: (survey) =>({
    url: "/api/mail/",
    method: "POST",
    body: survey
    }),
    invalidatesTags:["Surveys"]

})

})
})
export const {useSendMailMutation}=mailApiSlice