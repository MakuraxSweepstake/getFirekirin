"use client";
import { useAppSelector } from '@/hooks/hook';
import SingleGameCred from '../../../gameCredentials/SingleGameCred';

export default function GameCredentialsBlock({ game }: { game: any }) {
    const user = useAppSelector((s) => s ? s.auth.user : "");
    if (!user) {
        return "";
    }

    return (
        <div className="game_cred ">
            <h2 className="text-[20px]">Credentials for {game?.data?.name}</h2>
            <SingleGameCred username={game?.data?.user?.name || ""} password={game?.data?.user?.password || ""} />
        </div>
    )
}
