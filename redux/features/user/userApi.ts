import { apiSlice } from "../api/apiSlice";




export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: 'update-avatar',
                method: "PUT",
                body: { avatar },
                credentials: 'include'
            })
        }),
        updateUser: builder.mutation({
            query: ({ name }) => ({
                url: 'update-user',
                method: "PUT",
                body: { name },
                credentials: 'include'
            })
        }),
        updatePassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
                url: 'update-password',
                method: "PUT",
                body: {
                    oldPassword,
                    newPassword
                },
                credentials: 'include'
            })
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: 'all-users',
                method: "GET",
                credentials: 'include'
            })
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `delete-user`,
                method: "DELETE",
                body: { id },
                credentials: 'include' as const
            })
        }),
        updateRole: builder.mutation({
            query: ({ email, role }) => ({
                url: 'update-role',
                method: "PUT",
                body: { email, role },
                credentials: 'include',
            })
        })
    })
})


export const { useDeleteUserMutation, useUpdateRoleMutation, useUpdateAvatarMutation, useUpdateUserMutation, useUpdatePasswordMutation, useGetAllUsersQuery } = userApi