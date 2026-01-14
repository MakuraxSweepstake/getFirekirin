import PasswordField from '@/components/molecules/PasswordField'
import { useAppDispatch } from '@/hooks/hook'
import { PATH } from '@/routes/PATH'
import { useResetPasswordMutation } from '@/services/authApi'
import { clearTokens } from '@/slice/authSlice'
import { showToast, ToastVariant } from '@/slice/toastSlice'
import { InputLabel, OutlinedInput } from '@mui/material'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    emailAddress: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),

    password: Yup.string()
        .required('Password is required')
        .test(
            'no-leading-trailing-whitespace',
            'Password cannot start or end with spaces',
            (value) => value === value?.trim()
        )
        .max(16, 'Password must be less than 10 characters'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
})

export default function ResetPasswordForm({ email }: { email?: string }) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const initialValues = {
        emailAddress: email || "",
        password: "",
        confirmPassword: "",
    }
    const [resetPassword, { isLoading }] = useResetPasswordMutation();



    const { handleSubmit, handleBlur, handleChange, errors, dirty, values, touched } = useFormik(
        {
            initialValues,
            validationSchema,
            onSubmit: async (values) => {
                try {
                    const response = await resetPassword({
                        email: values.emailAddress,
                        password: values.password,
                        password_confirmation: values.confirmPassword,
                    }).unwrap();

                    dispatch(
                        showToast({
                            message: response?.message || "New password is updated",
                            variant: ToastVariant.SUCCESS,
                            autoTime: true,
                        }),
                    );
                    dispatch(clearTokens());
                    router.replace(PATH.AUTH.LOGIN.ROOT);
                }
                catch (e: any) {
                    dispatch(
                        showToast({
                            message: e?.data?.message || "Unable to reset password. Try again later",
                            variant: ToastVariant.ERROR,
                            autoTime: true,
                        }),
                    );
                }
            }
        }
    )
    return (
        <form action="" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-x-3 gap-y-5">
                {!email ? <div className="col-span-2">
                    <div className="input_field">
                        <InputLabel htmlFor="emailAddress">Email Address*</InputLabel>
                        <OutlinedInput
                            name='emailAddress'
                            id='emailAddress'
                            placeholder='example@example.com'
                            value={values.emailAddress}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.emailAddress && errors.emailAddress)}
                        />
                        {
                            touched.emailAddress && errors.emailAddress ?
                                <span className="error ">{errors.emailAddress}</span> : null
                        }
                    </div>
                </div> : ""}
                <div className="col-span-2">
                    <div className="input_field">
                        <PasswordField
                            name="password"
                            label="New Password*"
                            placeholder="XXXXXXX"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password ? errors.password : undefined}
                        />
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="input_field">
                        <PasswordField
                            name="confirmPassword"
                            label="Confirm Password*"
                            placeholder="XXXXXXX"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.confirmPassword ? errors.confirmPassword : undefined}
                        />
                    </div>
                </div>
            </div>
            <div className="action__group text-center flex flex-col gap-4 mt-8">
                <button className='ss-btn bg-primary-grad' disabled={!dirty}>{isLoading ? "Changing Password" : "Reset Password"}</button>
                {!email ? <Link href={PATH.AUTH.LOGIN.ROOT} className='ss-btn bg-secondary-grad'>Back to Login</Link> : ""}
            </div>
        </form>
    )
}
