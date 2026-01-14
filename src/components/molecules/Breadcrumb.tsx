'use client';

import { Stack } from '@mui/material';
import { ArrowRight2 } from '@wandersonalwes/iconsax-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Breadcrumb() {
    const pathname = usePathname();
    const pathSegments = pathname?.split('/').filter(Boolean) || [];

    const breadcrumbs = pathSegments.map((segment, index) => {
        const label = segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        return { label, href };
    });

    return (
        <Stack direction="row" spacing={1} alignItems="center" className='mb-2'>
            <Link href="/" className='text-title font-medium text-[10px] lg:text-[12px] leading-[120%]'>
                Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.href}>

                    <ArrowRight2 size={10} />
                    {idx === breadcrumbs.length - 1 ? (
                        <strong className='text-title !font-medium text-[10px] lg:text-[12px] leading-[120%]' >
                            {crumb.label}
                        </strong>
                    ) : (
                        <Link href={crumb.href} className='text-title font-medium text-[10px] lg:text-[12px] leading-[120%]'>
                            {crumb.label}
                        </Link>
                    )}
                </React.Fragment>
            ))}
        </Stack>
    );
}
