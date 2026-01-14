// import { createApi } from "@reduxjs/toolkit/query/react";
// import { baseQuery } from "./baseQuery";
// import { GlobalResponse } from "@/types/config";

// export const downloadApi = createApi({
//     reducerPath: "downloadApi",
//     baseQuery: baseQuery,
//     tagTypes: ["Download"],
//     endpoints: (builder) => ({
//         downloadTransaction: builder.mutation<GlobalResponse, { user?: string; game?: string; search?: string }>({
//             query: ({ user, game, search }) => {
//                 const params = new URLSearchParams();
//                 if (user) params.append('user', user.toString());
//                 if (game) params.append('game', game.toString());
//                 if (search) params.append('search', search.toString());
//                 const queryString = params.toString();
//                 return {
//                     url: `/api/admin/download/transactions${queryString ? `?${queryString}` : ''}`,
//                     method: "GET",
//                 }
//             }
//         })
//     })
// })

// export const { useDownloadTransactionMutation } = downloadApi;
// src/services/downloadApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery"; // your custom base query

export const downloadApi = createApi({
    reducerPath: "downloadApi",
    baseQuery: baseQuery,
    tagTypes: ["Download"],
    endpoints: (builder) => ({
        downloadTransaction: builder.mutation<Blob, { user?: string; game?: string; search?: string; status?: string }>({
            async queryFn(args, _queryApi, _extraOptions, fetchWithBQ) {
                const params = new URLSearchParams();
                if (args.user) params.append("user", args.user.toString());
                if (args.game) params.append("game", args.game.toString());
                if (args.search) params.append("search", args.search.toString());
                if (args.status) params.append("status", args.status.toString());
                const queryString = params.toString();

                const response = await fetchWithBQ({
                    url: `/api/admin/download/transactions${queryString ? `?${queryString}` : ""}`,
                    method: "GET",
                    responseHandler: async (response) => response.blob(), // ⬅️ handle blob here
                });

                if (response.error) return { error: response.error };
                return { data: response.data as Blob };
            },
        }),
        downloadUser: builder.mutation<Blob, { search?: string; status?: string }>({
            async queryFn(args, _queryApi, _extraOptions, fetchWithBQ) {
                const params = new URLSearchParams();
                if (args.search) params.append("search", args.search.toString());
                if (args.status) params.append("status", args.status.toString());
                const queryString = params.toString();

                const response = await fetchWithBQ({
                    url: `/api/admin/download/users${queryString ? `?${queryString}` : ""}`,
                    method: "GET",
                    responseHandler: async (response) => response.blob(), // ⬅️ handle blob here
                });

                if (response.error) return { error: response.error };
                return { data: response.data as Blob };
            },
        }),
    }),
});

export const { useDownloadTransactionMutation, useDownloadUserMutation } = downloadApi;
