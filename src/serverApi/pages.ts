import { PageResponseProps } from "@/types/page";
import { BannerResponseProps } from "@/types/setting";
import { serverBaseQuery } from "./serverBaseQuery";

export async function getPageDetail(slug: string): Promise<PageResponseProps | undefined> {
    return serverBaseQuery(`/api/general/page/${slug}`);
}

export async function getBanners(): Promise<BannerResponseProps> {
    return serverBaseQuery(`/api/general/home/banner`)
}
export async function getSubBanners(): Promise<BannerResponseProps> {
    return serverBaseQuery(`/api/general/home/banner?type=true`)
}