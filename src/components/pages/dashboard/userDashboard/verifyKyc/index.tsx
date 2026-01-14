'use client';

import { Button, InputLabel, OutlinedInput, Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Reuse your MUI styles
const formFieldSx = {
    '& .MuiOutlinedInput-root, & .MuiPickersInputBase-root, & .MuiPickersOutlinedInput-root': {
        borderRadius: '27px',
        background: 'rgba(118, 107, 120, 0.55)',
        color: '#fff',
        '& .MuiOutlinedInput-notchedOutline, & .MuiPickersOutlinedInput-notchedOutline': {
            border: '0.576px solid rgba(255, 255, 255, 0.04)',
        },
        '&:hover .MuiOutlinedInput-notchedOutline, &:hover .MuiPickersOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255,255,255,0.2)',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
            borderColor: '#B801C0',
        },
    },
    '& .MuiOutlinedInput-input, & .MuiPickersInputBase-input': {
        padding: '12px 16px',
        color: '#fff',
        '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.2)',
            fontWeight: 300,
            fontSize: '12px',
            opacity: 1,
        },
    },
    '& .MuiInputAdornment-root': {
        marginRight: '8px',
    },
    '& .MuiInputAdornment-root button': {
        color: 'rgba(255, 255, 255, 0.7)',
        '&:hover': {
            color: '#fff',
            background: 'rgba(255, 255, 255, 0.08)',
        },
    },
    '& .MuiIconButton-root': {
        padding: '8px',
    },
};

// Yup validation schema
const validationSchema = Yup.object({
    first_name: Yup.string().required('First name is required'),
    middle_name: Yup.string(),
    last_name: Yup.string().required('Last name is required'),
    phone: Yup.string().required('Phone number is required'),
    dob: Yup.date().max(new Date(), 'Date of birth cannot be in the future').required('DOB is required'),
    address: Yup.string(),
    user_id: Yup.string().required('User ID is required'),
    photo_id: Yup.string().required('Photo ID is required'),
});

export default function VerifyKYCPage() {
    const formik = useFormik({
        initialValues: {
            first_name: '',
            middle_name: '',
            last_name: '',
            phone: '',
            dob: null,
            address: '',
            user_id: '',
            photo_id: '',
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('Form submitted:', values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="grid md:grid-cols-2 gap-x-3 gap-y-5">
                {/* Phone */}
                <div className="col-span-2">
                    <InputLabel htmlFor="phone">Phone</InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="phone"
                        name="phone"
                        placeholder="Enter phone number"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        sx={formFieldSx}
                    />
                    <span className="error">{formik.touched.phone && formik.errors.phone ? formik.errors.phone : ""}</span>
                </div>

                {/* DOB */}
                <div className="col-span-2">
                    <InputLabel htmlFor="dob">Date of Birth</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={formik.values.dob}
                            onChange={(newValue) => formik.setFieldValue('dob', newValue)}
                            onClose={() => formik.setFieldTouched('dob', true)}
                            maxDate={dayjs()}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    id: 'dob',
                                    name: 'dob',
                                    placeholder: 'MM/DD/YYYY',
                                    error: Boolean(formik.touched.dob && formik.errors.dob),
                                    helperText: formik.touched.dob && formik.errors.dob,
                                    sx: formFieldSx,
                                },
                            }}
                        />
                    </LocalizationProvider>
                </div>

                {/* First Name */}
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
                        sx={formFieldSx}
                    />
                    <span className="error">{formik.touched.first_name && formik.errors.first_name}</span>
                </div>

                {/* Middle Name */}
                <div className="input__field">
                    <InputLabel htmlFor="middle_name">Middle Name</InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="middle_name"
                        name="middle_name"
                        placeholder="Enter middle name"
                        value={formik.values.middle_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        sx={formFieldSx}
                    />
                    <span className="error">{formik.touched.middle_name && formik.errors.middle_name}</span>
                </div>

                {/* Last Name */}
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
                        sx={formFieldSx}
                    />
                    <span className="error">{formik.touched.last_name && formik.errors.last_name}</span>
                </div>

                {/* User ID */}
                <div className="input__field">
                    <InputLabel htmlFor="user_id">User ID<span className="text-red-500">*</span></InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="user_id"
                        name="user_id"
                        placeholder="Enter your user ID"
                        value={formik.values.user_id}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        sx={formFieldSx}
                    />
                    <span className="error">{formik.touched.user_id && formik.errors.user_id}</span>
                </div>

                {/* Photo ID */}
                <div className="input__field">
                    <InputLabel htmlFor="photo_id">Photo ID<span className="text-red-500">*</span></InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="photo_id"
                        name="photo_id"
                        placeholder="Enter photo ID"
                        value={formik.values.photo_id}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        sx={formFieldSx}
                    />
                    <span className="error">{formik.touched.photo_id && formik.errors.photo_id}</span>
                </div>

                {/* Address */}
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
                        sx={formFieldSx}
                    />
                    <span className="error">{formik.touched.address && formik.errors.address}</span>
                </div>
            </div>

            <Stack mt={4} direction="row" justifyContent="flex-end">
                <Button type="submit" variant='contained'>
                    Submit
                </Button>
            </Stack>
        </form>
    );
}
