import apiSlice from '../../../../app/apiSlice'
const questionApiSlice = apiSlice.injectEndpoints({
endpoints: (build) => ({

addQuestion: build.mutation({
    query:(question)=>({
    url:"api/surveys/questions/add",
    method:"PUT",
    body: question
    }),
    providesTags:["Questions"]
    
}),
updateQuestion: build.mutation({
    query:(question)=>({
    url:"api/surveys/questions/update",
    method:"PUT",
    body: question
    }),
    invalidatesTags:["Questions"]
}),
deleteQuestion: build.mutation({
    query:(question)=>({
    url:"api/surveys/questions/delete",
    method:"PUT",
    body: question
    }),
    invalidatesTags:["Questions"]
}),
chooseSegQuestion : build.mutation({
    query: (quest) =>({
    url: "/api/surveys/questions/chooseSeg",
    method: "PUT",
    body: quest
    }),invalidatesTags:["Questions"]

    })
}),
})
export const {useAddQuestionMutation,useUpdateQuestionMutation,useDeleteQuestionMutation,useChooseSegQuestionMutation} = questionApiSlice