"use client";

import PasswordField from "@/components/molecules/PasswordField";
import { useAppDispatch } from "@/hooks/hook";
import { useChangeUserGamePasswordMutation } from "@/services/userApi";
import { showToast, ToastVariant } from "@/slice/toastSlice";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .required("Password is required")
        .test(
            "no-leading-trailing-whitespace",
            "Password cannot start or end with spaces",
            (value) => value === value?.trim()
        )
        .max(16, "Password must be less than 16 characters"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
});

export default function ResetPasswordDialog({
    open,
    onClose,
    name,
}: {
    open: boolean;
    onClose: () => void;
    name: string;
}) {
    const dispatch = useAppDispatch();
    const [resetGamePassord, { isLoading }] = useChangeUserGamePasswordMutation();

    const { handleSubmit, handleBlur, handleChange, values, touched, errors } =
        useFormik({
            initialValues: {
                password: "",
                confirmPassword: "",
            },
            validationSchema,
            onSubmit: async (values) => {
                try {
                    const response = await resetGamePassord({
                        name,
                        password: values.password,
                        confirm_password: values.confirmPassword,
                    }).unwrap();

                    dispatch(
                        showToast({
                            message: response?.message || "Password updated successfully",
                            variant: ToastVariant.SUCCESS,
                            autoTime: true,
                        })
                    );
                    onClose();
                } catch (e: any) {
                    dispatch(
                        showToast({
                            message:
                                e?.data?.message || "Unable to reset password. Try again later.",
                            variant: ToastVariant.ERROR,
                            autoTime: true,
                        })
                    );
                }
            },
        });

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle className="text-center font-semibold text-[18px]">
                Reset Password
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={3} mt={1}>
                        <PasswordField
                            name="password"
                            label="New Password*"
                            placeholder="Enter new password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password ? errors.password : undefined}
                        />
                        <PasswordField
                            name="confirmPassword"
                            label="Confirm Password*"
                            placeholder="Re-enter password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.confirmPassword ? errors.confirmPassword : undefined}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3, flexDirection: "column", gap: 1 }}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                    >
                        {isLoading ? "Changing Password..." : "Reset Password"}
                    </Button>
                    <Button onClick={onClose} fullWidth color="inherit">
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
