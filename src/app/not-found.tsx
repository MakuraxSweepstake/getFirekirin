import Link from "next/link";

export default function NotFound() {
    return (
        <section className="not-found flex justify-center items-center min-h-screen">
            <div className="content text-center">
                <h1 className='text-[128px] leadding-[37%] font-[800] text-primary'>404</h1>
                <h2 className='text-[24px]'>Page Not Found!</h2>
                <div className="space-y-3 text-center mt-8">
                    <p>Oops! The page you're looking for doesn’t exist or has been moved.</p>

                    <p>🔍 Try checking the URL or head back to the
                        <Link href="/" className="text-secondary hover:underline ml-1">homepage</Link>.
                    </p>

                    <p>
                        If you think this is a mistake, feel free to
                        <a href="/contact" className="text-secondary hover:underline ml-1">contact us</a>.
                    </p>
                </div>
            </div>
        </section>
    )
}
