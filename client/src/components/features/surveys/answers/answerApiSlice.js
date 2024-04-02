import apiSlice from '../../../../app/apiSlice'
const answerApiSlice = apiSlice.injectEndpoints({
endpoints: (build) => ({

addAnswer: build.mutation({
    query:(answer)=>({
    url:"api/surveys/questions/answers/add",
    method:"PUT",
    body: answer
    }),
    providesTags:["Answers"]
    
}),
updateAnswer: build.mutation({
    query:(answer)=>({
    url:"api/surveys/questions/answers/update",
    method:"PUT",
    body: answer
    }),
    invalidatesTags:["Answers"]
}),
deleteAnswer: build.mutation({
    query:(answer)=>({
    url:"api/surveys/questions/answers/delete",
    method:"PUT",
    body: answer
    }),
    invalidatesTags:["Answers"]
}),
changeAnswerData: build.mutation({
    query:(answer)=>({
    url:"api/surveys/questions/answers/answer",
    method:"PUT",
    body: answer
    }),
    invalidatesTags:["Answers"]
})
}),


})
export const {useAddAnswerMutation,useUpdateAnswerMutation,useDeleteAnswerMutation,useChangeAnswerDataMutation} = answerApiSlice