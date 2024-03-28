import { apiSlice } from "../api/apiSlice";


export const notificationApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllNotificatin: build.query({
            query: () => ({
                url: 'all-notification',
                method: 'GET',
                credentials: 'include'
            })
        }),

        updateNotification:build.mutation({
            query:(id)=>({
                url:`update-notification/${id}`,
                method:'PUT',
                credentials: 'include'

            })
        })

    })
})


export const {useUpdateNotificationMutation,useGetAllNotificatinQuery} =notificationApi