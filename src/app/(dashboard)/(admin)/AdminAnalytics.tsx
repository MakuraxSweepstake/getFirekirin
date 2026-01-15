"use client";

import MoreIcon from '@/app/customIcons/MoreIcon';
import { useGetAnalyticsQuery } from '@/services/dashboardApi';
import { AnalyticsProps } from '@/types/dashboard';
import { formatDateTime } from '@/utils/formatDateTime';
import { Box, ClickAwayListener, Fade, IconButton, List, ListItem, Paper, Popper } from '@mui/material';
import { ArrowLeft } from '@wandersonalwes/iconsax-react';
import { ApexOptions } from 'apexcharts';
import { useRef, useState } from 'react';
import Chart from "react-apexcharts";

type AnalyticsType = "today" | "this_week" | "this_month" | "this_year" | "all_time";

const getColorByKey = (key: string, isProfit: boolean) => {
    const palette: Record<string, string> = {
        total_deposits: "#22C55E",
        total_withdraw: "#E14A5E",
        total_transactions: "#3B82F6",
        total_users: "#F59E0B",
    };
    return isProfit ? palette[key] || "#6B7280" : "#EF4444";
};

// Skeleton loader
const AnalyticsSkeleton = () => (
    <div className="col-span-1">
        <div className="analytics__card p-4 rounded-[8px] border border-gray-100 shadow-sm animate-pulse">
            <div className="flex justify-between items-center mb-3">
                <div className="w-[80px] h-[10px] bg-gray-200 rounded"></div>
                <div className="w-[20px] h-[20px] bg-gray-200 rounded-full"></div>
            </div>
            <div className="w-[120px] h-[10px] bg-gray-200 rounded mb-2"></div>
            <div className="flex justify-between items-end">
                <div>
                    <div className="w-[60px] h-[16px] bg-gray-200 rounded mb-2"></div>
                    <div className="w-[40px] h-[10px] bg-gray-200 rounded"></div>
                </div>
                <div className="w-[140px] h-[80px] bg-gray-200 rounded"></div>
            </div>
        </div>
    </div>
);

export default function AdminAnalytics() {
    const [currentType, setCurrentType] = useState<AnalyticsType>("this_week");
    const { data, isLoading } = useGetAnalyticsQuery({ type: currentType });

    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const anchorRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const handleToggle = (index: number) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRefs.current.some(ref => ref?.contains(event.target as Node))) return;
        setOpenIndex(null);
    };

    const handleSelect = (type: AnalyticsType) => {
        setCurrentType(type);
        setOpenIndex(null);
    };

    if (isLoading) {
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 analytics__wrapper mb-5">
                {Array.from({ length: 4 }).map((_, i) => (
                    <AnalyticsSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (!data?.data) return null;

    const analyticsData = data.data;
    const chartKeys = Object.keys(analyticsData) as (keyof typeof analyticsData)[];

    const charts = chartKeys.map((key) => {
        const item: AnalyticsProps = analyticsData[key];
        const color = getColorByKey(key, item.profit);

        const chartOptions: ApexOptions = {
            chart: { type: "area", sparkline: { enabled: true } },
            stroke: { curve: "smooth", width: 2 },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "light",
                    type: "vertical",
                    shadeIntensity: 1,
                    gradientToColors: [color],
                    opacityFrom: 0.8,
                    opacityTo: 0,
                    stops: [0, 100],
                },
            },
            colors: [color],
            tooltip: { enabled: true },
        };

        const chartSeries = [
            { name: item.name, data: item.breakdown ?? [0, 0, 0, 0, 0, 0, 0] },
        ];

        return {
            key,
            title: item.name,
            value: item.current,
            change: item.percent,
            isIncrease: item.profit,
            message: item.message,
            start_date: item.start_date,
            end_date: item.end_date,
            chartOptions,
            chartSeries,
        };
    });

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 analytics__wrapper mb-5">
            {charts.map((chart, index) => {
                const { date: startDate } = formatDateTime(chart.start_date);
                const { date } = formatDateTime(chart.end_date);

                const open = openIndex === index;
                const id = open ? `analytics-action-${index}` : undefined;

                return (
                    <div className="col-span-1" key={index}>
                        <div className="analytics__card p-4 rounded-[8px]">
                            <div className="card__title flex justify-between items-center mb-2">
                                <div className="title">
                                    <strong className='text-[12px] leading-[120%] text-title font-[500] mb-1 block'>{chart.title}</strong>
                                    <span className="text-[10px] text-para-light leading-[120%] font-[500]">{startDate} - {date}</span>
                                </div>
                                <Box>
                                    <IconButton
                                        aria-describedby={id}
                                        ref={(el: HTMLButtonElement | null) => {
                                            anchorRefs.current[index] = el;
                                        }}
                                        onClick={() => handleToggle(index)}
                                    >
                                        {/* <More className="rotate-90" variant="TwoTone" /> */}
                                        <MoreIcon />
                                    </IconButton>
                                    <Popper
                                        open={open}
                                        anchorEl={anchorRefs.current[index]}
                                        placement="bottom-end"
                                        transition
                                        style={{ zIndex: 1300 }}
                                        id={id}
                                    >
                                        {({ TransitionProps }) => (
                                            <Fade {...TransitionProps} timeout={200}>
                                                <Paper
                                                    elevation={3}
                                                    sx={{
                                                        width: 180,
                                                        borderRadius: 2,
                                                        mt: 1,
                                                    }}
                                                >
                                                    <ClickAwayListener onClickAway={handleClose}>
                                                        <List>
                                                            {[
                                                                { label: "Today", value: "today" },
                                                                { label: "This Week", value: "this_week" },
                                                                { label: "This Month", value: "this_month" },
                                                                { label: "This Year", value: "this_year" },
                                                                { label: "All Time", value: "all_time" },
                                                            ].map((item) => (
                                                                <ListItem key={item.value}>
                                                                    <button
                                                                        onClick={() => handleSelect(item.value as AnalyticsType)}
                                                                        className={`block w-full text-left py-2 px-4 hover:bg-[#FBF4FB] text-sm ${currentType === item.value ? "font-semibold text-primary" : ""}`}
                                                                    >
                                                                        {item.label}
                                                                    </button>
                                                                </ListItem>
                                                            ))}
                                                        </List>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Fade>
                                        )}
                                    </Popper>
                                </Box>
                            </div>
                            <div className="card__content">
                                <div className="flex gap-2 items-end justify-between mb-2">
                                    <div className="content flex gap-2 items-center">
                                        <strong className='text-[16px] leading-[120%] font-[600] text-title'>{chart.value}</strong>
                                        <p className={`flex gap-1 items-center ${chart.isIncrease ? "increase" : "decrease"}`}>
                                            <span className="arrow w-[18px] h-[18px] rounded-full flex justify-center items-center ">
                                                <ArrowLeft size={12} />
                                            </span>
                                            {chart.change}%
                                        </p>
                                    </div>
                                    <div className="relative aspect-[72/68] w-full max-w-[144px] h-[100px] text-right">
                                        <Chart
                                            options={chart.chartOptions}
                                            series={chart.chartSeries}
                                            type="area"
                                            width="100%"
                                            height="100%"
                                        />
                                    </div>
                                </div>
                                <p className='text-[12px] font-[500] text-para-light'>{chart.message}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
