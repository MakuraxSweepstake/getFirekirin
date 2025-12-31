import ExclusiveGameDetail from "@/components/pages/dashboard/userDashboard/games/exclusiveGames/exclusiveGameDetail";
import { getSingleGame } from "@/serverApi/game";
import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await props.params;
    const canonicalUrl = `${SITE_URL}/exclusive-games/${id}`.replace(/\/$/, "");

    return {
        alternates: {
            canonical: canonicalUrl,
        },
    };
}
export default async function UserGameDetail(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;

    const game = await getSingleGame(id);

    return <ExclusiveGameDetail game={game} />

}
