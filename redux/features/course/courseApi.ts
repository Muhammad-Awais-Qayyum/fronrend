import { apiSlice } from "../api/apiSlice";


export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCousre: builder.mutation({
            query: (data) => ({
                url: 'create-course',
                method: 'POST',
                body: data,
                credentials: "include"
            })
        }),
        getAllAdminCousre: builder.query({
            query: () => ({
                url: 'get-all-admin',
                method: 'GET',
                credentials: "include"
            })
        }),
        deleteCourse: builder.mutation({
            query: ({ id }) => ({
                url: `delete-course`,
                method: "DELETE",
                body: { id },
                credentials: 'include' as const
            })
        }),
        UpdateCourse: builder.mutation({
            query: ({ id, data }) => ({
                url: `edit-course`,
                method: "PUT",
                body: { data, id },
                credentials: 'include' as const
            })
        }),
        UserAllCourse: builder.query({
            query: () => ({
                url: `get-all-course`,
                method: "GET",
                credentials: 'include' as const
            })
        }),
        getCourseDetails: builder.query({
            query: ({ id }) => ({
                url: `get-course/${id}`,
                method: "GET",
                credentials: 'include' as const
            })
        }),
        getCourseContent: builder.query({
            query: (id) => ({
                url: `get-course-content/${id}`,
                method: "GET",
                credentials: 'include' as const
            })
        }),
       addNewQuestion: builder.mutation({
            query: ({question,courseId,contentId}) => ({
                url: `add-question`,
                method: "PUT",
                body:{question,contentId,courseId},
                credentials: 'include' as const
            })
        }),
        addAnswerQuestion: builder.mutation({
            query: ({answer,courseId,contentId,questionId}) => ({
                url: `add-answer-question`,
                method: "PUT",
                body:{answer,questionId,contentId,courseId},
                credentials: 'include' as const
            })
        }),
        addReviewInCourse: builder.mutation({
            query: ({review,rating,courseId}) => ({
                url: `add-review/${courseId}`,
                method: "PUT",
                body:{review,rating},
                credentials: 'include' as const
            })
        }),
        addAnswerReview: builder.mutation({
            query: ({comment, courseId, reviewId}) => ({
                url: `add-answer-review`,
                method: "PUT",
                body:{comment, courseId, reviewId},
                credentials: 'include' as const
            })
        }),
    })
})

export const { useAddAnswerReviewMutation,useAddReviewInCourseMutation,useAddAnswerQuestionMutation,useAddNewQuestionMutation,useGetCourseContentQuery, useGetCourseDetailsQuery, useUserAllCourseQuery, useCreateCousreMutation, useGetAllAdminCousreQuery, useDeleteCourseMutation, useUpdateCourseMutation } = courseApi