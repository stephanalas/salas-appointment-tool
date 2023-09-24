import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logout } from "./slices/authSlice";
import { DateTime } from "luxon";

const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";
export interface MessageResponse {
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
  id?: number;
  profile: Profile | null;
  // deadline could be string from responses
  deadline: DateTime | string | null;
  urgency: string;
  description: string;
  completed: boolean;
}

export interface Appointment {
  id?: number;
  profile: Profile | null;
  contact: string;
  dateTime: DateTime | string | null;
  notes: string | null;
}

const baseQuery = fetchBaseQuery({ baseUrl: "/api" });
const baseQueryCheckToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const { error } = result;
  if (error && error.data && error.data === "Forbidden") {
    api.dispatch(logout());
  }
  return result;
};
// TODO: create profile import mutation
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryCheckToken,
  tagTypes: ["Profile", "Task", "Appointments"],
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
    createTask: builder.mutation<MessageResponse, Task>({
      query: (data) => ({
        url: "tasks",
        method: POST,
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
    getAllTasks: builder.query<Task[], void>({
      query: () => ({
        url: "tasks",
        method: GET,
      }),
      providesTags: ["Task"],
    }),
    deleteTask: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: DELETE,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation<MessageResponse, Task>({
      query: (data) => ({
        url: `tasks/${data.id}`,
        method: PUT,
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
    getAllAppointments: builder.query<Appointment[], void>({
      query: () => ({
        url: `appointments`,
        method: GET,
      }),
      providesTags: ["Appointments"],
    }),
    createAppointment: builder.mutation<MessageResponse, Appointment>({
      query: (data) => ({
        url: `appointments`,
        method: POST,
        body: data,
      }),
      invalidatesTags: ["Appointments"],
    }),
    cancelAppointment: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `appointments/${id}`,
        method: DELETE,
      }),
      invalidatesTags: ["Appointments"],
    }),
    updateAppointment: builder.mutation<MessageResponse, Appointment>({
      query: (data) => ({
        url: `appointments/${data.id}`,
        method: PUT,
        body: data,
      }),
      invalidatesTags: ["Appointments"],
    }),
  }),
});

export const {
  useGetAllProfilesQuery,
  useGetAllTasksQuery,
  useGetAllAppointmentsQuery,
  useLoginMutation,
  useLogoutMutation,
  useCreateProfileMutation,
  useDeleteProfileMutation,
  useUpdateProfileMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useCreateAppointmentMutation,
  useCancelAppointmentMutation,
  useUpdateAppointmentMutation,
} = api;
