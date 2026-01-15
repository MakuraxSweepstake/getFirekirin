import { GlobalResponse } from "@/types/config";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

type PaymentRequestProps = {
    idem_payment_uri: string,
    idem_hashkey: string,
    idem_merchant_id: string,
}
export const paymentSetupApi = createApi({
    reducerPath: "paymentSetupApi",
    baseQuery: baseQuery,
    tagTypes: ['PaymentSetup'],
    endpoints: (builder) => ({
        createPaymentSetup: builder.mutation<GlobalResponse, PaymentRequestProps>({
            query: (body) => ({
                url: "/api/admin/payment-setup",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["PaymentSetup"]
        }),
        getPaymentSetup: builder.query<{ data: PaymentRequestProps; message: string }, void>({
            query: () => ({
                url: "/api/admin/payment-setup",
                method: "GET"
            })
            , providesTags: ["PaymentSetup"]
        }),
    })
})

export const { useCreatePaymentSetupMutation, useGetPaymentSetupQuery } = paymentSetupApi;