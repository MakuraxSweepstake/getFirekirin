import GlassWrapper from "@/components/molecules/GlassWrapper";
import { getSupportEmail } from "@/serverApi/game";

export default async function Support() {
	let supportEmails = {
		customer_support_email: "",
		technical_support_email: "",
		error: null,
	};

	try {
		const response = await getSupportEmail();

		if (response?.data) {
			supportEmails = {
				customer_support_email: response?.data?.customer_support_email,
				technical_support_email: response?.data?.technical_support_email,
				error: null,
			};
		} else {
			// supportEmails.error = "No data found. Please try again later.";
			return;
		}
	} catch (error) {
		console.error("Error fetching support emails:", error);
		// supportEmails.error = "Failed to fetch support email. Please try again later.";
	}

	if (supportEmails.error) {
		return (
			<section className="support__root">
				<div className="section__title mb-8">
					<h1 className="text-[26px] lg:text-[32px] mb-2">Need any Assistance?</h1>
					<p className="text-[11px] lg:text-[14px]">{supportEmails.error}</p>
				</div>
			</section>
		);
	}

	return (
		<section className="support__root">
			<div className="section__title mb-8">
				<h1 className="text-[26px] lg:text-[32px] mb-2">Need any Assistance?</h1>
				<p className="text-[11px] lg:text-[14px]">
					Here goes the subtitle or description on the assistance need.
				</p>
			</div>

			<div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6">
				<GlassWrapper className="p-6">
					<img
						src="/assets/images/support.svg"
						alt=""
						className="w-[32px] h-[32px] mb-8"
					/>
					<h2 className="mb-2 text-[20px]">Customer Support</h2>
					<p className="text-[11px] mb-8">
						Questions about your account or gameplay? Our team is here for you.
					</p>
					<a href={`mailto:${supportEmails.customer_support_email}`} className="underline">
						{supportEmails.customer_support_email}
					</a>
				</GlassWrapper>
				<GlassWrapper className="p-6">
					<img
						src="/assets/images/technical.svg"
						alt=""
						className="w-[32px] h-[32px] mb-8"
					/>
					<h2 className="mb-2 text-[20px]">Technical Support</h2>
					<p className="text-[11px] mb-8">
						Questions about your account or gameplay? Our team is here for you.
					</p>
					<a href={`mailto:${supportEmails.technical_support_email}`} className="underline">
						{supportEmails.technical_support_email}
					</a>
				</GlassWrapper>
			</div>
		</section>
	);
}
