import CheckoutPage from "@/components/pages/dashboard/userDashboard/buyCoins/buyCoinSinlgeGame/checkout";
export default async function Checkout(props: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ amount?: string; bonus?: string }>;
}) {
    const { slug } = await props.params;
    const searchParams = await props.searchParams;
    const amount = searchParams.amount ? Number(searchParams.amount) : 0;
    const bonus = searchParams.bonus ? Number(searchParams.bonus) : 0;
    return (
       <CheckoutPage amount={amount} slug={slug} bonus={bonus}/>
    )
}
