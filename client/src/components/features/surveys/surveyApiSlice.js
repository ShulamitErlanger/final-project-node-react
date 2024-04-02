import apiSlice from "../../../app/apiSlice"
const surveyApiSlice = apiSlice.injectEndpoints({
endpoints: (build) => ({
getSurveys: build.query({
query:(obj)=>({
url: '/api/surveys?status='+obj.status
}),
providesTags:["Surveys"]
}),
getSurvey:build.query({
    query:(id)=>({
        url:'api/surveys/id'
    }),
    providesTags:["Surveys"]
}),
addSurvey: build.mutation({
    query:(survey)=>({
    url:"api/surveys/add",
    method:"POST",
    body: survey
    }),
    invalidatesTags:["Surveys"]
}),
updateSurvey: build.mutation({
    query:(survey)=>({
    url:"api/surveys/update",
    method:"PUT",
    body: survey
    }),
    invalidatesTags:["Surveys"]
}),
deleteSurvey: build.mutation({
    query:(survey)=>({
    url:"api/surveys/delete",
    method:"DELETE",
    body: survey
    }),
    invalidatesTags:["Surveys"]
}),
changeStatus: build.mutation({
    query:(survey)=>({
    url:"api/surveys/status",
    method:"PUT",
    body: survey
    }),
    invalidatesTags:["Surveys"]
}),
changeCount: build.mutation({
    query:(survey)=>({
    url:"api/surveys/count",
    method:"PUT",
    body: survey
    }),
    invalidatesTags:["Surveys"]
})
}),


})
export const {useGetSurveysQuery,useAddSurveyMutation,useUpdateSurveyMutation,useDeleteSurveyMutation,useChangeStatusMutation,useChangeCountMutation} = surveyApiSlice



