import { getPageDetail } from '@/serverApi/pages';
import { renderHTML } from '@/utils/RenderHTML';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
const SITE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await props.params;
    const canonicalUrl = `${SITE_URL}/general/${slug}`.replace(/\/$/, "");

    return {
        alternates: {
            canonical: canonicalUrl,
        },
    };
}
export default async function GeneralPage(props: { params: Promise<{ slug: string }> }) {
    const { slug } = await props.params;
    let pageData = null;

    try {
        pageData = await getPageDetail(slug);
    } catch (err) {
        console.log("❌ Failed to fetch games:", err);
        return notFound();
    }

    if (!pageData?.data) {
        return notFound();
    }
    return (
        <section className="general__page__root">
            <div className="section__title mb-6">
                <h1 className='text-[24px] leading-[120%]'>{pageData?.data?.name}</h1>
            </div>
            <div className="page__content">
                <div className="grid grid-cols-12 gap-5">
                    {/* <div className="col-span-12 md:col-span lg:col-span-3">
                        {pageData?.data?.content.length ? <div className="rounded-[24px] p-4" style={{
                            background: "rgba(118, 107, 120, 0.55)"
                        }}>
                            <ul>
                                {pageData.data.content.map((content) => (
                                    <li key={content.heading}>
                                        <a href="#" className='text-[14px] font-[500] leading-[120%] py-2 px-3 flex items-center gap-1'><ArrowRight2 size={14} />{content?.heading}</a>
                                    </li>
                                ))}
                            </ul>
                        </div> : ""}
                    </div> */}
                    <div className="col-span-12">
                        <div className="general-content-box">
                            {pageData?.data?.content?.length && pageData?.data?.content.map((content) => (
                                renderHTML(content.description)))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
