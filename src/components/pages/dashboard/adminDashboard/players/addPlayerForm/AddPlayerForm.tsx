"use client";
import InputFile from '@/components/atom/InputFile';
import PasswordField from '@/components/molecules/PasswordField';
import { PlayerProps, SinlgePlayerResponseProps } from '@/types/player';
import { Button, InputLabel, OutlinedInput } from '@mui/material';
import { FormikProps } from 'formik';

export default function AddPlayerForm({ formik, id, data, loading, buttonLabel }: { formik: FormikProps<PlayerProps>, id?: string, data?: SinlgePlayerResponseProps, loading?: boolean, buttonLabel?: string }) {

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form__fields p-6 lg:p-10 flex flex-col gap-4 lg:gap-6 lg:grid grid-cols-2">
                <div className="input__field">
                    <InputLabel htmlFor="name">Username<span className="text-red-500">*</span></InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="name"
                        name="name"
                        type="name"
                        placeholder="Enter Username"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className="error">
                        {formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                    </span>
                </div>
                <div className="input__field">
                    <InputLabel htmlFor="email">Email<span className="text-red-500">*</span></InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className="error">
                        {formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                    </span>
                </div>

                <div className="input__field">
                    <InputLabel htmlFor="first_name">First Name<span className="text-red-500">*</span></InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="first_name"
                        name="first_name"
                        placeholder="Enter first name"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className="error">
                        {formik.touched.first_name && formik.errors.first_name ? formik.errors.first_name : ""}
                    </span>
                </div>

                <div className="input__field">
                    <InputLabel htmlFor="last_name">Last Name<span className="text-red-500">*</span></InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="last_name"
                        name="last_name"
                        placeholder="Enter last name"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className="error">
                        {formik.touched.last_name && formik.errors.last_name ? formik.errors.last_name : ""}
                    </span>
                </div>

                <div className="input__field">
                    <InputLabel htmlFor="wallet_address">Wallet Address</InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="wallet_address"
                        name="wallet_address"
                        placeholder="Enter wallet address"
                        value={formik.values.wallet_address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className="error">
                        {formik.touched.wallet_address && formik.errors.wallet_address ? formik.errors.wallet_address : ""}
                    </span>
                </div>

                <div className="input__field">
                    <InputLabel htmlFor="address">Address</InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="address"
                        name="address"
                        placeholder="Enter address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className="error">
                        {formik.touched.address && formik.errors.address ? formik.errors.address : ""}
                    </span>
                </div>

                <div className="input__field">
                    <InputLabel htmlFor="city">City</InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="city"
                        name="city"
                        placeholder="Enter city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className="error">
                        {formik.touched.city && formik.errors.city ? formik.errors.city : ""}
                    </span>
                </div>

                <div className="input__field">
                    <InputLabel htmlFor="phone">Phone</InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="phone"
                        name="phone"
                        placeholder="Enter phone number"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className="error">
                        {formik.touched.phone && formik.errors.phone ? formik.errors.phone : ""}
                    </span>
                </div>

                <div className="input__field">
                    <PasswordField
                        name="password"
                        label="Password*"
                        placeholder="Enter password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password ? formik.errors.password : undefined}
                    />
                </div>

                <div className="input__field">
                    <PasswordField
                        name="password_confirmation"
                        label="Confirm Password*"
                        placeholder="Confirm password"
                        value={formik.values.password_confirmation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password_confirmation ? formik.errors.password_confirmation : undefined}
                    />
                </div>

                <div className="input__field">
                    <InputFile
                        name="profile_image"
                        label="Profile Image"
                        value={formik.values.profile_image || null}
                        onChange={(file: File | File[] | null) => formik.setFieldValue("profile_image", file)}
                        onBlur={() => formik.setFieldTouched("profile_image", true)}
                        serverFile={data?.data?.profile_image_file}
                    />
                    <span className="error">
                        {formik.touched.profile_image && formik.errors.profile_image ? formik.errors.profile_image : ""}
                    </span>
                </div>

            </div>
            <div className="text-end mb-4 lg:mb-8 max-w-fit ml-auto flex justify-end gap-4 px-10">
                {/* {id ? <Button color='error' variant='contained' onClick={() => {
                    router.push(PATH.ADMIN.PLAYERS.ROOT)
                }}>Cancel Player Edit</Button> : null} */}
                <Button type="submit" variant="contained" color="primary" sx={{ color: "#fff" }} >
                    {!loading ? `${buttonLabel ? buttonLabel : `Confirm ${id ? "Player Update" : "Player Addition"}`}` : "Updating"}
                </Button>
            </div>
        </form>
    )
}
