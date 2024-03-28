import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        CourseAnalytics: builder.query({
            query: () => ({
                url: 'get-course-analytics',
                method: 'GET',
                credentials: 'include' as const,
            }),
        }),
        UserAnalytics: builder.query({
            query: () => ({
                url: 'get-user-analytics',
                method: 'GET',
                credentials: 'include' as const,
            }),
        }),
        OrderAnalytics: builder.query({
            query: () => ({
                url: 'get-order-analytics',
                method: 'GET',
                credentials: 'include' as const,
            }),
        })
    }),
})


export const { useCourseAnalyticsQuery, useOrderAnalyticsQuery, useUserAnalyticsQuery } = analyticsApi