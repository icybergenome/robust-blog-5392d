
import Link from 'next/link'

const Page404 = () => {
    return(
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>Oops!</h1>
                </div>
                <h2>404 - Page not found</h2>
                <p>The page you are looking for cannot be found.</p>
                <Link href="/">Go To Homepage</Link>
            </div>
        </div>
    )

}

export default Page404