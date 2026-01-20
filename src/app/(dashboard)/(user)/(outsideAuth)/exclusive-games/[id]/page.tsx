import ExclusiveGameDetail from "@/components/pages/dashboard/userDashboard/games/exclusiveGames/exclusiveGameDetail";
import { getSingleGame } from "@/serverApi/game";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;

type PageProps = {
    params: { id: string };
};

export async function generateMetadata(
    { params }: PageProps
): Promise<Metadata> {
    try {
        const { id } = params;
        const canonicalUrl = `${SITE_URL}/exclusive-games/${id}`.replace(/\/$/, "");
        const game = await getSingleGame(id);

        if (!game?.data) {
            return {};
        }

        return {
            title: game.data.meta?.meta_title || game.data.name,
            description: game.data.meta?.meta_description || game.data.name,
            openGraph: {
                title: game.data.meta?.meta_title || game.data.name,
                description: game.data.meta?.meta_description || game.data.name,
                images: game.data.meta?.og_image_url,
            },
            twitter: {
                title: game.data.meta?.meta_title || game.data.name,
                description: game.data.meta?.meta_description || game.data.name,
                images: game.data.meta?.og_image_url,
            },
            alternates: {
                canonical: canonicalUrl,
            },
        };
    } catch {
        return {};
    }
}

export default async function UserGameDetail(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;

    const game = await getSingleGame(id);

    if (!game?.data) {
        notFound();
    }

    return <ExclusiveGameDetail game={game} />;
}
