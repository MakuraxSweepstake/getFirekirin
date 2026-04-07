"use client";

import { useAppDispatch } from "@/hooks/hook";
import { PATH } from "@/routes/PATH";
import { useForgotPasswordMutation } from "@/services/authApi";
import { showToast, ToastVariant } from "@/slice/toastSlice";
import {
    Box,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import AuthMessageBlock from "../authMessageBlock";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        dirty,
    } = useFormik({
        initialValues: {
            emailAddress: "",
        },
        validationSchema: Yup.object({
            emailAddress: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await forgotPassword({
                    email: values.emailAddress,
                }).unwrap();


                dispatch(
                    showToast({
                        message: response.message || "OTP sent successfully!",
                        variant: ToastVariant.SUCCESS,
                    })
                );


                // localStorage.setItem(
                //     "passwordResetData",
                //     JSON.stringify({ email: values.emailAddress })
                // );

                // ✅ Navigate to Verify OTP page
                router.push(`${PATH.AUTH.VERIFY_OTP.ROOT}?email=${values.emailAddress}`);
            } catch (error: any) {
                console.error("Error:", error);

                dispatch(
                    showToast({
                        message: error?.data?.message || "Something went wrong",
                        variant: ToastVariant.ERROR,
                    })
                );
            }
        },
    });

    return (
        <>
            <AuthMessageBlock
                title="Ready to get started and win BIG?"
                features={[
                    "Fun & Fair Gameplay",
                    "Exciting Prizes",
                    "Accessible Anytime, Anywhere",
                    "Trusted & Secure",
                ]}
            />
            <Box className="auth__form__wrapper lg:w-[50%] p-8">
                <div className="section__title mb-4 lg:mb-6">
                    <h1 className="text-[24px] leading-[120%] font-bold lg:text-[48px]">
                        Forgot Password
                    </h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-x-3 gap-y-5">
                        <div className="col-span-2">
                            <div className="input_field">
                                <InputLabel htmlFor="emailAddress">Email Address*</InputLabel>
                                <OutlinedInput
                                    name="emailAddress"
                                    id="emailAddress"
                                    placeholder="example@example.com"
                                    value={values.emailAddress}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.emailAddress && errors.emailAddress)}
                                    fullWidth
                                />
                                {touched.emailAddress && errors.emailAddress ? (
                                    <span className="error">{errors.emailAddress}</span>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="action__group text-center flex flex-col gap-4 mt-8">
                        <button
                            type="submit"
                            className="ss-btn bg-primary-grad flex items-center justify-center"
                            disabled={!dirty || isLoading}
                        >
                            {isLoading ? "Sending OTP..." : "Send OTP"}
                        </button>

                        <Link
                            href={PATH.AUTH.LOGIN.ROOT}
                            className="ss-btn bg-secondary-grad"
                        >
                            Back To Login
                        </Link>
                    </div>
                </form>
            </Box>
        </>
    );
}
