import GlassWrapper from '@/components/molecules/GlassWrapper'
import { SecuritySafe } from '@wandersonalwes/iconsax-react'
import Image from 'next/image'
import ConnectWalletForm from './ConnectWalletForm'

export default function ConnectWalletPage() {
    return (
        <section className="wallet__page__root">
            <GlassWrapper className="!p-6 !lg:px-16 !lg:py-8 !text-center !max-w-[50%]">
                <Image src={"/assets/images/wallet-featured-image.png"} alt='' width={174} height={140} className='mx-auto' />

                <span className="py-2 px-3 rounded-3xl bg-[#DBFBF6] border border-[#426A66] text-[#426A66] flex justify-center items-center max-w-fit mx-auto my-4 lg:my-6"><SecuritySafe />Safe and secure</span>
                <h1 className='text-[24px] leading-[120%] font-[700]'>Connect your wallet to get started</h1 >
                <p className='text-[11px] leading-[150%] text-center max-w-[420px] mx-auto mt-3 mb-6'>To start playing and cashing out your winnings, you’ll need a crypto wallet to purchase E-Credits and receive payouts. Don't worry—it’s quick and easy!</p>

                <ConnectWalletForm />

                <p className="text-[11px] leading-[120%] mt-8 mb-2">Powered By</p>
                <div className="flex justify-center items-center gap-4">
                    <Image src="/assets/images/payment-01.png" alt='' width={78} height={24} />
                    <Image src="/assets/images/payment-02.png" alt='' width={78} height={24} />
                    <Image src="/assets/images/payment-03.png" alt='' width={78} height={24} />
                </div>
            </GlassWrapper>
        </section>
    )
}
