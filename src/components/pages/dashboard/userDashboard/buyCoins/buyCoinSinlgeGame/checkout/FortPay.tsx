'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { useDepositMutation } from '@/services/transaction';
import { showToast, ToastVariant } from '@/slice/toastSlice';
import { DepositProps } from '@/types/transaction';
import { Button, InputLabel, OutlinedInput } from '@mui/material';
import Script from 'next/script';
import { PaymentModeProps } from '.';

declare global {
    interface Window {
        CollectJS: {
            configure: (config: {
                paymentType: string;
                callback: (response: any) => void;
            }) => void;
        };
    }
}

export default function PaymentForm({ id, amount, type }: DepositProps & { type: PaymentModeProps }) {
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.auth.user);
    const [payViaFortPay, { isLoading }] = useDepositMutation();

    const handleCollectJSLoad = () => {
        if (typeof window !== 'undefined' && window.CollectJS) {
            window.CollectJS.configure({
                paymentType: 'cc',
                callback: async (response) => {
                    try {
                        await payViaFortPay({
                            id: id,
                            amount: amount,
                            type: type as PaymentModeProps,
                            payment_token: response.token
                        }).unwrap()
                    }
                    catch (e: any) {
                        dispatch(showToast({
                            message: e?.data?.message || "Unable to deposit",
                            variant: ToastVariant.ERROR
                        }))
                    }
                }
            });
        }
    };

    return (
        <>
            <Script
                src="https://secure.fppgateway.com/token/Collect.js"
                data-tokenization-key="NAhDuk-7V4u2u-tUAsT5-dCqbH5"
                strategy="afterInteractive"
                onReady={handleCollectJSLoad}
            />

            <form className="theForm">
                <div className="formInner flex flex-col gap-3 md:grid md:grid-cols-2">
                    <div className="form-group">
                        <InputLabel htmlFor="fname">First Name </InputLabel>
                        <OutlinedInput type="text" className="form-control" placeholder="First Name" name="fname" defaultValue={user?.first_name} />
                    </div>
                    <div className="form-group">
                        <InputLabel htmlFor="lname">Last Name </InputLabel>
                        <OutlinedInput type="text" className="form-control" placeholder="Last Name" name="lname" defaultValue={user?.last_name} />
                    </div>
                    <div className="form-group">
                        <InputLabel htmlFor="address1">Address </InputLabel>
                        <OutlinedInput type="text" className="form-control" placeholder="Street Address" name="address1" defaultValue={user?.address} />
                    </div>
                    <div className="form-group">
                        <InputLabel htmlFor="city">City </InputLabel>
                        <OutlinedInput type="text" className="form-control" placeholder="City" name="city" defaultValue={user?.city} />
                    </div>
                    <div className="form-group">
                        <InputLabel htmlFor="state">State </InputLabel>
                        <OutlinedInput type="text" className="form-control" placeholder="State" name="state" defaultValue={user?.state} />
                    </div>
                    <div className="form-group">
                        <InputLabel htmlFor="zip">Zip Code </InputLabel>
                        <OutlinedInput type="text" className="form-control" placeholder="Zip code" name="zip" defaultValue={""} />
                    </div>
                </div>

                {/* <OutlinedInput type="submit" id="payButton" value="Pay $5" className="btn btn-primary btn-block" /> */}
                <Button type="submit" id="payButton" variant='contained' color='primary' className='mt-4!'>{isLoading ? "Proceeding Payment" : "Proceed Payment"}</Button>
            </form>

            <div id="paymentTokenInfo"></div>
        </>
    );
}