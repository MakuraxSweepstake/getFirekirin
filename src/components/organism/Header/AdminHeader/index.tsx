"use client";

import { useGetAllNotificationQuery } from '@/services/notificationApi';
import { Box } from '@mui/material';
import React from 'react';
import CreatNewRecord from '../CreatNewRecord';
import NotificationPage from '../Notification';
import Profile from '../Profile';


export default function AdminHeader() {
  // const [mounted, setMounted] = React.useState(false);

  // React.useEffect(() => {
  //   setMounted(true);
  // }, []);
  const [pageIndex, _setPageIndex] = React.useState(1);
  const [pageSize, _setPageSize] = React.useState(10);
  const { data } = useGetAllNotificationQuery({ pageIndex, pageSize });
  return (
    <Box className='flex items-center gap-4 justify-end w-full'>
      {/* <AdminSearchBar /> */}
      <div className="right flex items-center gap-4">
        <CreatNewRecord />
        <NotificationPage notifications={data?.data?.data || []} pagination={data?.data?.pagination} />
        <Profile />
      </div>
    </Box>
  )
}
