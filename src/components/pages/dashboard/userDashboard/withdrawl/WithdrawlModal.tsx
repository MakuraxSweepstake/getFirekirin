"use client";
import GlassWrapper from "@/components/molecules/GlassWrapper";
import { useAppDispatch } from "@/hooks/hook";
import { useGetMassPayPaymentFieldsMutation, useGetMassPayPaymentMethodsQuery } from "@/services/transaction";
import { showToast, ToastVariant } from "@/slice/toastSlice";
import { MasspayPaymentFields } from "@/types/transaction";
import { Box, Button, Modal } from "@mui/material";
import { BitcoinRefresh, SecuritySafe, TickCircle } from "@wandersonalwes/iconsax-react";
import { FormikProps } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { WithdrawlFormValues } from ".";
import { RenderFields } from "./renderFields";

const ShimmerCard = () => (
    <div className="col-span-1">
        <GlassWrapper>
            <div className="py-5 px-4 flex justify-between items-center animate-pulse">
                <div className="flex items-center gap-2 flex-1">
                    <div className="w-5 h-5 bg-white/20 rounded-full"></div>
                    <div className="h-4 bg-white/20 rounded w-24"></div>
                </div>
                <div className="w-5 h-5 bg-white/20 rounded-full"></div>
            </div>
        </GlassWrapper>
    </div>
);

export default function WithdrawlModal({
    open,
    handleClose,
    formik,
    isLoading
}: {
    open: boolean;
    handleClose: () => void;
    formik: FormikProps<WithdrawlFormValues>;
    isLoading: boolean
}) {
    const [fields, setFields] = useState<MasspayPaymentFields[]>([]);
    const dispatch = useAppDispatch();
    const { data: withdrawlOptions, isLoading: loadingWithdrawlOptions } = useGetMassPayPaymentMethodsQuery();
    const [getMassPayFields, { isLoading: gettingFields }] = useGetMassPayPaymentFieldsMutation();

    const handleTypeChange = (value: string) => {
        formik.setFieldValue("type", value);
        formik.setFieldValue("payment_fields", {});
        setFields([]);
    };

    const handleContinueWithdrawl = async () => {
        if (!formik.values.type) {
            dispatch(
                showToast({
                    message: "Please select a payment method",
                    variant: ToastVariant.ERROR
                })
            );
            return;
        }

        try {
            const response = await getMassPayFields({ token: formik.values.type }).unwrap();
            const fetchedFields = response?.data || [];

            setFields(fetchedFields);

            formik.setFieldValue(
                "payment_fields",
                fetchedFields.map((item) => ({
                    ...item,
                    value: item.value || "",
                }))
            );


        } catch (e: any) {
            dispatch(
                showToast({
                    message: e?.data?.message || "Failed to get payment fields. Please try again.",
                    variant: ToastVariant.ERROR
                })
            );
        }
    };

    const handleBackToPaymentMethods = () => {
        setFields([]);
        formik.setFieldValue("payment_fields", {});
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: "24px",
                    maxWidth: "992px",
                    width: "100%",
                    background:
                        "linear-gradient(0deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.04) 100%), #3A013F",
                    boxShadow: 24,
                    p: { xs: 3, sm: 4 },
                    textAlign: "center",
                    overflow: "auto",
                    maxHeight: "90vh"
                }}
            >
                {/* Wallet Banner */}
                <Image
                    src={"/assets/images/wallet-featured-image.png"}
                    alt=""
                    width={174}
                    height={140}
                    className="mx-auto"
                />

                <span className="py-2 px-3 rounded-3xl bg-[#DBFBF6] border border-[#426A66] text-[#426A66] flex justify-center items-center max-w-fit mx-auto my-4 lg:my-6">
                    <SecuritySafe />
                    Safe and secure
                </span>

                <h1 className="text-[24px] leading-[120%] font-[700]">
                    {fields.length > 0 ? "Enter Payment Details" : "Confirm your Wallet Address"}
                </h1>

                <p className="text-[11px] leading-[150%] text-center max-w-[420px] mx-auto mt-3 mb-6">
                    {fields.length > 0
                        ? "Please fill in all the required information to complete your withdrawal."
                        : "Your Withdrawn amount will be sent to the following address."}
                </p>

                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 h-full overflow-auto">
                    {fields.length > 0 ? (
                        <>
                            <div className="flex flex-col md:grid grid-cols-2 gap-4">
                                {fields.map((field) => (
                                    <div className={field.type === "IDSelfieCollection" ? "col-span-2" : "col-span-1"} key={field.token}>
                                        {field.type === "IDSelfieCollection" ? <Link href={field.value} className="bg-primary-grad ss-btn">{field.label}</Link> : <RenderFields field={field} formik={formik} />}
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-3 mt-4">
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth
                                    onClick={handleBackToPaymentMethods}
                                    type="button"
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                >
                                    {isLoading ? "Processing..." : "Withdraw Now"}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 mb-8 gap-6">
                                {loadingWithdrawlOptions && (
                                    <>
                                        <ShimmerCard />
                                        <ShimmerCard />
                                    </>
                                )}
                                {!loadingWithdrawlOptions && withdrawlOptions?.data && withdrawlOptions?.data?.length > 0 &&
                                    withdrawlOptions?.data?.map((option) => (
                                        <div className="col-span-1" key={option?.id}>
                                            <GlassWrapper>
                                                <div
                                                    className="py-5 px-4 flex justify-between items-center cursor-pointer transition-all hover:bg-white/5"
                                                    onClick={() => handleTypeChange(option?.destination_token)}
                                                >
                                                    <span className="text-[12px] flex items-center justify-start gap-2 max-w-[80%] text-start">
                                                        <BitcoinRefresh />
                                                        {option?.name}
                                                    </span>
                                                    {formik.values.type === option?.destination_token ? (
                                                        <TickCircle className="text-green-400" />
                                                    ) : ""}
                                                </div>
                                            </GlassWrapper>
                                        </div>
                                    ))
                                }
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                className="!mt-3"
                                onClick={handleContinueWithdrawl}
                                disabled={!formik.values.type || gettingFields}
                            >
                                {gettingFields ? "Loading Fields..." : "Continue Withdrawal"}
                            </Button>
                        </>
                    )}
                </form>

                {/* Powered by */}
                <p className="text-[11px] leading-[120%] mt-8 mb-2">Powered By</p>
                <div className="flex justify-center items-center gap-4">
                    <Image src="/assets/images/payment-01.png" alt="" width={78} height={24} />
                    <Image src="/assets/images/payment-02.png" alt="" width={78} height={24} />
                    <Image src="/assets/images/payment-03.png" alt="" width={78} height={24} />
                </div>
            </Box>
        </Modal>
    );
}