"use client";

import ActionGroup from '@/components/molecules/Action';
import { useAppDispatch } from '@/hooks/hook';
import { PATH } from '@/routes/PATH';
import { useDeleteGameByIdMutation, useGetAllGamesQuery } from '@/services/gameApi';
import { showToast, ToastVariant } from '@/slice/toastSlice';
import { GameItem } from '@/types/game';
import Image from 'next/image';
import Link from 'next/link';

function GameSkeleton() {
    return (
        <div className="bg-[#F4F6FC] p-4 lg:p-6 rounded-[16px] animate-pulse">
            {/* Title Skeleton */}
            <div className="h-4 w-3/4 bg-gray-300 rounded mb-4"></div>

            {/* Type & Provider Skeleton */}
            <div className="flex justify-between items-center mb-6">
                <div className="w-[40%]">
                    <div className="h-3 w-1/2 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 w-3/4 bg-gray-300 rounded"></div>
                </div>
                <span className='h-[24px] w-[1px] bg-gray'></span>
                <div className="w-[40%]">
                    <div className="h-3 w-1/2 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 w-3/4 bg-gray-300 rounded"></div>
                </div>
            </div>

            {/* Active Players Skeleton */}
            <div className="h-3 w-1/3 bg-gray-300 rounded mb-4"></div>

            {/* Image Skeleton */}
            <div className="relative aspect-[300/256] rounded-[12px] overflow-hidden mb-4 bg-gray-300"></div>

            {/* Button Skeleton */}
            <div className="h-8 w-1/3 bg-gray-300 rounded-full"></div>
        </div>
    );
}
export default function AdminGameList() {
    const { data, isLoading } = useGetAllGamesQuery();
    const [deleteGame] = useDeleteGameByIdMutation();
    const dispatch = useAppDispatch();
    return (
        <div className="admin__games grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {isLoading &&
                Array.from({ length: 8 }).map((_, idx) => <GameSkeleton key={idx} />)}

            {!isLoading &&
                data?.data?.data?.map((game: GameItem) => (
                    <div
                        key={game.id}
                        className="admin__game__card bg-[#F4F6FC] p-4 lg:p-6 rounded-[16px]"
                    >
                        {/* Game Name */}
                        <div className="flex justify-between items-start">
                            <h2 className="text-16 leading-[120%] font-bold mb-4">
                                {game.name}
                            </h2>
                            <ActionGroup
                                onEdit={`${PATH.ADMIN.GAMES.EDIT_GAME.ROOT}/${game?.id}`}
                                onDelete={async () => {
                                    try {

                                        const response = await deleteGame({ id: game.id }).unwrap();
                                        dispatch(
                                            showToast(
                                                {
                                                    variant: ToastVariant.SUCCESS,
                                                    message: response?.message || "Game Deleted Successfully"
                                                }
                                            )
                                        )
                                    }
                                    catch (e: any) {
                                        dispatch(
                                            showToast(
                                                {
                                                    variant: ToastVariant.ERROR,
                                                    message: e?.data?.message || "Unable to Delete Game"
                                                }
                                            )
                                        )
                                    }
                                }}
                            />
                        </div>

                        {/* Type & Provider */}
                        <ul className="flex justify-between items-center mb-6">
                            <li className="w-[40%]">
                                <p className="mb-1 text-[14px] leading-[120%] text-para-light">
                                    Type
                                </p>
                                <strong className="text-[14px] leading-[120%] font-[500] text-title">
                                    {game.category || "N/A"}
                                </strong>
                            </li>
                            <span className="h-[24px] w-[1px] bg-gray"></span>
                            <li className="w-[40%]">
                                <p className="mb-1 text-[14px] leading-[120%] text-para-light">
                                    Provider
                                </p>
                                <strong className="text-[14px] leading-[120%] font-[500] text-title">
                                    {game.provider}
                                </strong>
                            </li>
                        </ul>

                        {/* Active Players */}
                        {game.active_users && (
                            <strong className="text-bold block mb-4 text-[12px]">
                                Active Players:{" "}
                                <span className="bg-primary-light rounded-[20px] py-1 px-2">
                                    {game.active_users}
                                </span>
                            </strong>
                        )}

                        {/* Thumbnail */}
                        <div className="admin_game_image relative aspect-[300/256] rounded-[12px] overflow-hidden mb-4">
                            <Image
                                src={typeof game.thumbnail === "string" && game.thumbnail
                                    ? game.thumbnail
                                    : "/assets/images/fallback.png"
                                }
                                alt={game.name || "Game Thumbnail"}
                                fill
                                className="object-cover"
                            />
                        </div>


                        {/* CTA */}
                        <Link
                            href={`/games/${game.id}`}
                            className="ss-btn bg-primary-grad text-white max-w-fit"
                        >
                            Game Overview
                        </Link>
                    </div>
                ))}
        </div>
    )
}
