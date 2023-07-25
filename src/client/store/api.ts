import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./slices/authSlice";

const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";
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

export interface Task {
  id: number;
  profile: Profile;
  deadline: Date | null;
  description: string;
  completed: boolean;
}
// TODO: CRUD FEATURE ON TASKS (PROVIDE AND INVALIDATE TAGS)
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Profile", "Task"],
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (data) => ({
        url: "login",
        method: POST,
        body: data,
      }),
    }),
    logout: builder.mutation<MessageResponse, void>({
      query: () => ({
        url: "logout",
        method: DELETE,
      }),
      onQueryStarted(_arg, { dispatch }) {
        dispatch(logout());
      },
    }),
    createProfile: builder.mutation<MessageResponse, Partial<Profile>>({
      query: (data) => ({
        url: "profiles",
        method: POST,
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    getAllProfiles: builder.query<Profile[], void>({
      query: () => ({
        url: "profiles",
        method: GET,
      }),
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<MessageResponse, Profile>({
      query: (data) => ({
        url: `profiles/${data.id}`,
        method: PUT,
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    deleteProfile: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `profiles/${id}`,
        method: DELETE,
      }),
      invalidatesTags: ["Profile"],
    }),
    createTask: builder.mutation<MessageResponse, Partial<Task>>({
      query: (data) => ({
        url: "tasks",
        method: POST,
        body: data,
      }),
    }),
    deleteTask: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: DELETE,
      }),
    }),
    updateTask: builder.mutation<MessageResponse, Task>({
      query: (data) => ({
        url: `tasks/${data.id}`,
        method: PUT,
        body: data,
      }),
    }),
    // updateTask,
  }),
});

export const {
  useGetAllProfilesQuery,
  useLoginMutation,
  useLogoutMutation,
  useCreateProfileMutation,
  useDeleteProfileMutation,
  useUpdateProfileMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = api;
