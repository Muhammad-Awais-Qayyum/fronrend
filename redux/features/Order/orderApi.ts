import { apiSlice } from "../api/apiSlice";



export const orderApi = apiSlice.injectEndpoints({
    endpoints: (bulider) => ({
        getAllOrder: bulider.query({
            query: () => ({
                url: 'get-all-order',
                method: 'GET',
                credentials: 'include'
            })
        }),
        getStripePublishableKey: bulider.query({
            query: () => ({
                url: 'payment/publishable',
                method: 'GET',
                credentials: 'include'
            })
        }),
        stripePayment: bulider.mutation({
            query: (amount) => ({
                url: 'payment',
                method: 'POST',
                body: { amount },
                credentials: 'include'
            })
        }),
        createOrder: bulider.mutation({
            query: ({ courseId, payment_info }) => ({
                url: 'create-order',
                method: 'POST',
                body: { courseId, payment_info },
                credentials: 'include'
            })
        })
    })
})


export const { useGetAllOrderQuery, useGetStripePublishableKeyQuery, useStripePaymentMutation, useCreateOrderMutation } = orderApi