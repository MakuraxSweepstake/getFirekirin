import ExclusiveGameDetail from "@/components/pages/dashboard/userDashboard/games/exclusiveGames/exclusiveGameDetail";
import { getAllGames, getSingleGame } from "@/serverApi/game";
import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await props.params;
    const canonicalUrl = `${SITE_URL}/exclusive-games/${id}`.replace(/\/$/, "");
    const game = await getSingleGame(id);

    return {
        title: game?.data?.meta?.meta_title || game?.data?.name,
        description: game?.data?.meta?.meta_description || game?.data?.name,
        openGraph: {
            title: game?.data?.meta?.meta_title || game?.data?.name,
            description: game?.data?.meta?.meta_description || game?.data?.name,
            images: game?.data?.meta?.og_image_url
        },
        twitter: {
            title: game?.data?.meta?.meta_title || game?.data?.name,
            description: game?.data?.meta?.meta_description || game?.data?.name,
            images: game?.data?.meta?.og_image_url
        },
        alternates: {
            canonical: canonicalUrl,
        },
    };
}

export async function generateStaticParams() {
    const res = await getAllGames()

    const games = res?.data?.data ?? []

    return games.map((game: any) => ({
        id: String(game.id),
    }))
}

export const dynamic = 'force-static'

export default async function UserGameDetail(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;

    const game = await getSingleGame(id);

    return <ExclusiveGameDetail game={game} />;
}
