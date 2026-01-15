"use client";
import LatestRegisteredPlayer from '@/components/pages/dashboard/adminDashboard/players/LatestRegisteredPlayer';
import TransactionTable from '@/components/pages/dashboard/adminDashboard/transaction/TransactionTable';
import { PATH } from '@/routes/PATH';
import Link from 'next/link';
import React from 'react';
import AdminAnalytics from './AdminAnalytics';
import AdminTransactionChart from './AdminTransactionChart';

const AdminDashboardTableWrapper = ({ title, cta, children }: { title?: string; cta?: { label: string; url: string }, children: React.ReactNode }) => {
    return (
        <div className="dashboard__table__wrapper border broder-solid border-gray rounded-2xl mb-5">
            <div className="section__title flex justify-between items-center px-6 pt-6 pb-4">
                {title ? <h2>{title}</h2> : ""}
                {cta ? <Link href={cta.url} className='text-primary text-[10px] leading-[120%] font-[500]'>{cta.label}</Link> : ""}
            </div>
            <div className="table__wrapper max-w-full overflow-x-auto">
                {children}
            </div>
        </div>
    )
}
export default function AdminDashboardRoot() {
    const [search, _setSearch] = React.useState("");
    // const games = [
    //     {
    //         name: "Firekirin",
    //         amount: 50,
    //         percentage: 10
    //     },
    //     {
    //         name: "Ultrapanda",
    //         amount: "168k",
    //         percentage: 10
    //     },
    //     {
    //         name: "Panda Master",
    //         amount: "268k",
    //         percentage: 10
    //     },
    //     {
    //         name: "Fish Master",
    //         amount: "136k",
    //         percentage: 10
    //     },
    // ]
    return (
        <>
            <h1 className="text-[24px] leading-[120%] mb-6">Dashboard</h1>
            <AdminAnalytics />
            {/* <AdminDashboardTableWrapper title='My Available Credit'>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 px-6 pb-6">
                    {games.map((game) => (
                        <div className="col-span-1" key={game.name}>
                            <CreditCard key={game.name} game={game} />
                        </div>
                    ))}
                </div>
            </AdminDashboardTableWrapper> */}

            <div className="xl:grid gap-5 xl:grid-cols-12 items-stretch">
                <div className="lg:col-span-6 xl:col-span-7">
                    <AdminDashboardTableWrapper title='Latest Registered Players' cta={{
                        label: "View All",
                        url: PATH.ADMIN.PLAYERS.ROOT
                    }}>
                        <LatestRegisteredPlayer />
                    </AdminDashboardTableWrapper>
                </div>
                <div className="lg:max-w-3/4 xl:col-span-5 xl:max-w-full">
                    <AdminDashboardTableWrapper title='Admin Transaction' >
                        <AdminTransactionChart />
                    </AdminDashboardTableWrapper>
                </div>
            </div>

            <AdminDashboardTableWrapper title='Recent Transaction' cta={{
                label: "View All",
                url: PATH.ADMIN.TRANSACTIONS.ROOT
            }}>
                <TransactionTable search={search} />
            </AdminDashboardTableWrapper>
        </>
    )
}
