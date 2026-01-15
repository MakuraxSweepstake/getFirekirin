'use client';

import GlassWrapper from "@/components/molecules/GlassWrapper";
import { Typography } from "@mui/material";
import Link from "next/link";

export default function KycBanner() {
    return (
        <GlassWrapper className="max-w-fit ml-auto">

            <div className="flex justify-end items-center gap-8 py-2 px-3">
                <Typography className="!text-[14px]">
                    Your KYC is not verified yet. Please verify.
                </Typography>
                <Link href="/verify-kyc" passHref className="ss-btn bg-primary-grad max-w-fit !text-[12px] !py-3 !px-4">
                    Verify KYC
                </Link>
            </div>
        </GlassWrapper>
    );
}
