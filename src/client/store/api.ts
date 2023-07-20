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
export type Stage = "PROSPECT" | "CLIENT";

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  industry: string;
  stage: Stage | { label: string; value: string };
  notes: string;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
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
    createProfile: builder.mutation<MessageResponse, Profile>({
      query: (data) => ({
        url: "profiles",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useCreateProfileMutation } =
  api;
