"use client";

import { Tooltip } from '@mui/material';
import { Eye, EyeSlash } from '@wandersonalwes/iconsax-react';
import React from 'react';
import CopyToClipboard from './CopyToClipboard';

export const CardPasswordField = ({ password }: { password: string }) => {

    const [showPassword, setShowPassword] = React.useState(false);


    return <>
        <div className="flex justify-between items-center">
            <Tooltip title={showPassword && password}>
                <span className="text-[11px]">
                    {showPassword
                        ? password.length > 16
                            ? password.slice(0, 16) + "..."
                            : password
                        : "xxxxxxxxxxxxx"}
                </span>
            </Tooltip>

            <div className="flex justify-end items-center gap-2">
                {showPassword ? <CopyToClipboard text={password} /> : ""}
                <p className='cursor-pointer' onClick={() => {
                    setShowPassword(prev => !prev)
                }}>
                    {
                        !showPassword ? <Eye size={14} className='text-secondary' /> : <EyeSlash size={14} className='text-secondary' />
                    }
                </p>
                {/* <BalanceRefresh label="Reset" icon={false} /> */}
            </div>
        </div>
    </>
}
