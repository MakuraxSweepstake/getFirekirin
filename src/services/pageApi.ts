import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { GlobalResponse, QueryParams } from "@/types/config";
import { PageListResponse, PageResponseProps } from "@/types/page";

export const pageApi = createApi({
    reducerPath: "pageApi",
    baseQuery: baseQuery,
    tagTypes: ['pages'],
    endpoints: (builder) => ({
        createPage: builder.mutation<GlobalResponse, FormData>({
            query: (body) => ({
                url: "/api/admin/page/store",
                method: "POST",
                body: body
            }),
            invalidatesTags: ['pages']
        }),
        getAllPage: builder.query<PageListResponse, QueryParams>({
            query: () => ({
                url: "/api/admin/page/list",
                method: "GET",
            }),
            providesTags: ['pages']
        }),
        getSinlgePageById: builder.query<PageResponseProps, { id: string | undefined }>({
            query: ({ id }) => ({
                url: `/api/admin/page/${id}`,
                method: "GET",
            }),
            providesTags: ['pages']
        }),
        updatePageById: builder.mutation<GlobalResponse, { id: string, body: FormData }>({
            query: ({ id, body }) => ({
                url: `/api/admin/page/update/${id}`,
                method: "POST",
                body: body
            }),
            invalidatesTags: ['pages']
        }),
        deletePageById: builder.mutation<GlobalResponse, { id: string }>({
            query: ({ id }) => ({
                url: `/api/admin/page/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['pages']
        })
    })
})

export const {
    useCreatePageMutation,
    useGetAllPageQuery,
    useUpdatePageByIdMutation,
    useDeletePageByIdMutation,
    useGetSinlgePageByIdQuery
} = pageApi;