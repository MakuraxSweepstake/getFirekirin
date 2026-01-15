import { GameProviderResponseProps } from "@/types/gameProvider";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const providerApi = createApi({
    reducerPath: "providerApi",
    baseQuery: baseQuery,
    tagTypes: ["providers"],
    endpoints: (builder) => ({
        getAllProvider: builder.query<GameProviderResponseProps, void>({
            query: () => ({
                url: "/api/admin/game/providers",
                method: "GET"
            })
        })
    })
})


export const { useGetAllProviderQuery } = providerApi;