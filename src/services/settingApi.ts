import { GlobalResponse } from "@/types/config";
import { BannerResponseProps, ChatbotProps, SiteSettingResponseProps } from "@/types/setting";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const settingApi = createApi({
    reducerPath: "settingApi",
    baseQuery: baseQuery,
    tagTypes: ['settings', 'banners', "Chatbot"],
    endpoints: (builder) => ({
        updateSetting: builder.mutation<GlobalResponse, FormData>({
            query: (body) => ({
                url: "/api/admin/settings",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ['settings']
        }),
        getSettings: builder.query<SiteSettingResponseProps, void>({
            query: () => ({
                url: "/api/admin/settings",
                method: "GET",
            }),
            providesTags: ['settings']
        }),
        updateBanner: builder.mutation<GlobalResponse, FormData>({
            query: (body) => ({
                url: "/api/admin/setting/banner",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ['banners']
        }),
        getAllBanner: builder.query<BannerResponseProps, void>({
            query: () => ({
                url: "/api/admin/setting/banner",
                method: "GET",
            }),
            providesTags: ['banners']
        }),

        updateChatbot: builder.mutation<GlobalResponse, FormData>({
            query: (body) => ({
                url: "/api/admin/setting/chatbot",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ['Chatbot']
        }),
        getChatbotSetting: builder.query<{ data: ChatbotProps }, void>({
            query: () => ({
                url: "/api/setting/chatbot",
                method: "GET",
            }),
            providesTags: ['Chatbot']
        }),

    })
})

export const {
    useUpdateSettingMutation,
    useGetSettingsQuery,
    useUpdateBannerMutation,
    useGetAllBannerQuery,
    useUpdateChatbotMutation,
    useGetChatbotSettingQuery
} = settingApi;