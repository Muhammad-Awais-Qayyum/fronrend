import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

type RegistrationResponse = {
    message: string;
    activationToken: string;
};

type RegistrationData = {
    // Define your registration data types here
};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Register endpoint
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "registration",
                method: "POST",
                body: data,
                credentials: "include",
            }),

            // dispatch the token and save in redux
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegistration({
                            token: result.data.activationToken,
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        // Activate user endpoint
        activation: builder.mutation({
            query: ({ activation_token, activation_code }) => ({
                url: "activate-user",
                method: 'POST',
                body: { activation_code, activation_token },
            }),
        }),

        // Login user endpoint
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: "login",
                method: 'POST',
                body: { email, password },
                credentials: "include"
            }),
            // dispatch the token and user and save in redux
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),


        //social auth endpoint
        socialAuth: builder.mutation({
            query: ({ email, name, avatar }) => ({
                url: "social-auth",
                method: 'POST',
                body: { email, name, avatar },
                credentials: "include"
            }),
            // dispatch the token and user and save in redux
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),


        //Log out endpoint
        logout: builder.query({
            query: () => ({
                url: "logout",
                method: 'GET',

                credentials: "include"
            }),
            // dispatch the token and user and save in redux
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {

                    dispatch(
                        userLoggedOut()
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        })
    }),
});

export const { useRegisterMutation, useActivationMutation, useLoginMutation, useSocialAuthMutation, useLogoutQuery } = authApi;
