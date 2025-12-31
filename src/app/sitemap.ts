import { getAllGames } from "@/serverApi/game";
import { MetadataRoute } from "next";

export const revalidate = 48600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL!;
    const apiUrl = process.env.NEXT_PUBLIC_BASE_URL!;

    // ✅ Fetch Menus
    const menuRes = await fetch(`${apiUrl}/api/general/menus`, {
        next: { revalidate: 48600 },
    });
    const menuData = await menuRes.json();

    // ✅ Fetch Games
    const gameRes = await getAllGames();
    const gameData = gameRes?.data?.data || [];

    const urls: MetadataRoute.Sitemap = [
        {
            url: frontendUrl,
            priority: 1
            // lastModified: new Date(),
            // changeFrequency: "monthly",
        },
    ];

    // ✅ Append /general/[slug]
    if (menuData?.data?.length) {
        const menuUrls: MetadataRoute.Sitemap = menuData.data.map((menu: any) => ({
            url: `${frontendUrl}/general/${menu.slug}`,
            // lastModified: new Date(),
            // changeFrequency: "weekly", 
            priority: 0.9
        }));

        urls.push(...menuUrls);
    }

    // ✅ Append /exclusive-games/[id]
    if (gameData.length) {
        const gameUrls: MetadataRoute.Sitemap = gameData.map((game: any) => ({
            url: `${frontendUrl}/exclusive-games/${game.id}`,
            // lastModified: new Date(),
            // changeFrequency: "weekly",
            priority: 0.9
        }));

        urls.push(...gameUrls);
    }

    return urls;
}
