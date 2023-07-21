import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./slices/authSlice";

interface MessageResponse {
  error: boolean;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  user: User;
}
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  industry: string;
  stage: string;
  notes: string;
}
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<MessageResponse, void>({
      query: () => ({
        url: "logout",
        method: "DELETE",
      }),
      onQueryStarted(_arg, { dispatch }) {
        dispatch(logout());
      },
    }),
    createProfile: builder.mutation<MessageResponse, Partial<Profile>>({
      query: (data) => ({
        url: "profiles",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    getAllProfiles: builder.query<Profile[], void>({
      query: () => ({
        url: "profiles",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<MessageResponse, Profile>({
      query: (data) => ({
        url: `profiles/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    deleteProfile: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `profiles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetAllProfilesQuery,
  useLoginMutation,
  useLogoutMutation,
  useCreateProfileMutation,
  useDeleteProfileMutation,
  useUpdateProfileMutation,
} = api;
