import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  token: string;
  user: User;
}
export interface User {
  id: number;
  name: string;
  email: string;
}

export const api = createApi({
  reducerPath: "/api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = api;
