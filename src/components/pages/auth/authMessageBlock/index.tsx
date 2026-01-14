import { ImageProps } from '@/types/config';
import Box from '@mui/material/Box';
import Image from 'next/image';

interface Props {
    image?: ImageProps
    title: string;
    features?: string[];
}

export default function AuthMessageBlock(props: Props) {

    const { title, features } = props;
    return (
        <Box className="auth-image-wrapper relative hidden lg:block w-[50%] min-h-screen pl-9 pr-15 pb-15 rounded-[8px] overflow-hidden" >
            <Image src={"/assets/images/auth-image.png"} alt="Auth Image" fill className="object-cover max-w-[100%] h-auto" />
            <Box className="absolute bottom-15 left-9 right-15 lg:max-w-[40%]">
                <h2 className='mb-4 text-[20px] lg:text-[32px] leading-[150%] text-bold'>{title && title}</h2>
                {
                    features?.length ?
                        <ul >
                            {
                                features.map((feature) => (
                                    <li key={feature} className='text-12 leading-[146%]'>{feature}</li>
                                ))
                            }
                        </ul>
                        : null
                }

            </Box>
        </Box>
    )
}
