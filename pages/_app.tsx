import '../styles/globals.css'
import '../public/assets/css/all.min.css'
import '../public/assets/css/bootstrap.min.css'
import '../public/assets/css/default.css'
import '../public/assets/css/magnific-popup.min.css'
import '../public/assets/css/owl.carousel.min.css'
import '../public/assets/css/responsive.css'
import '../public/assets/css/style.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import WalletProvider from '../contexts/wallet'
import { CollectionProvider } from '../contexts/CollectionContext'
import Header from '../components/header'
import { useEffect, useState } from 'react'
import { keyStores } from 'near-api-js'
import * as buffer from "buffer"
function MyApp({ Component, pageProps }: AppProps) {
    const [keyStore, setKeyStore] = useState<any>();

    useEffect(() => {
        window.Buffer = buffer.Buffer
        const keyStore = new keyStores.BrowserLocalStorageKeyStore();
        setKeyStore(keyStore);
    }, [])
    return (
        <>
            <Script src="assets/js/jquery-3.6.0.min.js" />
            <CollectionProvider>
                <WalletProvider keyStore={keyStore}>
                    <Header />
                    <Component {...pageProps} />

                    <footer className="footer-wrapper">
                        <div className="container">
                            <div className="footer-top">
                                <div className="row">
                                    <div className="col-md-5 col-lg-5">
                                        <div className="g-connected">
                                            <div className="f-title pb-15">
                                                <h3>Get Connected</h3>
                                            </div>
                                            <div className="f-paragraph">
                                                <p>Generative dystopian NFTs meet utility via proof-of-staking to access analytics dashboard. Genesis collection of 777 abstract #NFTs. Powered by #NEARProtocol</p>
                                            </div>
                                            <div className="f-social-link">
                                                <ul>

                                                    <li>
                                                        <a target="_blank" rel="noreferrer" href="https://discord.gg/terraspaces">
                                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g clipPath="url(#clip0_716_888)">
                                                                    <path d="M15.2376 3.36898C14.0901 2.85148 12.8601 2.46898 11.5739 2.25148C11.5624 2.24928 11.5506 2.2507 11.5399 2.25554C11.5293 2.26037 11.5205 2.26839 11.5146 2.27848C11.3571 2.55523 11.1816 2.91598 11.0586 3.20098C9.69444 2.99716 8.30755 2.99716 6.94337 3.20098C6.80637 2.88513 6.65188 2.57715 6.48062 2.27848C6.47482 2.26827 6.46603 2.26007 6.45545 2.25498C6.44486 2.24988 6.43297 2.24814 6.42137 2.24998C5.13587 2.46748 3.90587 2.84998 2.75762 3.36823C2.74774 3.37237 2.73937 3.37944 2.73362 3.38848C0.399622 6.81973 -0.240128 10.1662 0.0741222 13.4707C0.0749966 13.4788 0.0775088 13.4867 0.0815059 13.4937C0.0855029 13.5008 0.0909012 13.507 0.0973722 13.512C1.45967 14.5038 2.97912 15.2593 4.59212 15.747C4.60337 15.7504 4.61539 15.7504 4.62663 15.747C4.63787 15.7435 4.6478 15.7367 4.65512 15.7275C5.00222 15.2633 5.3098 14.7708 5.57462 14.2552C5.5783 14.2482 5.58042 14.2404 5.58083 14.2325C5.58125 14.2245 5.57996 14.2166 5.57704 14.2092C5.57413 14.2018 5.56966 14.1951 5.56393 14.1896C5.55821 14.1841 5.55137 14.1799 5.54387 14.1772C5.05938 13.9948 4.58994 13.7746 4.13987 13.5187C4.13178 13.5141 4.12497 13.5076 4.12004 13.4997C4.11511 13.4918 4.11222 13.4828 4.11162 13.4735C4.11103 13.4642 4.11275 13.4549 4.11663 13.4464C4.12052 13.438 4.12644 13.4306 4.13387 13.425C4.22837 13.3552 4.32287 13.2825 4.41287 13.2097C4.42097 13.2032 4.43073 13.199 4.44106 13.1977C4.45139 13.1964 4.46188 13.1979 4.47137 13.2022C7.41662 14.5252 10.6064 14.5252 13.5171 13.2022C13.5266 13.1977 13.5372 13.1959 13.5477 13.1971C13.5582 13.1983 13.5681 13.2024 13.5764 13.209C13.6664 13.2825 13.7601 13.3552 13.8554 13.425C13.8629 13.4305 13.8689 13.4377 13.8729 13.4461C13.8769 13.4545 13.8788 13.4638 13.8783 13.4731C13.8779 13.4824 13.8751 13.4914 13.8704 13.4994C13.8656 13.5073 13.8589 13.514 13.8509 13.5187C13.4024 13.7767 12.9359 13.995 12.4461 14.1765C12.4386 14.1792 12.4317 14.1835 12.426 14.1891C12.4203 14.1947 12.4158 14.2014 12.4129 14.2089C12.41 14.2163 12.4087 14.2243 12.4091 14.2323C12.4096 14.2403 12.4117 14.2481 12.4154 14.2552C12.6854 14.7705 12.9944 15.261 13.3341 15.7267C13.3412 15.7363 13.351 15.7434 13.3623 15.7472C13.3736 15.7509 13.3857 15.7511 13.3971 15.7477C15.0129 15.2615 16.5348 14.5056 17.8986 13.512C17.9053 13.5073 17.9109 13.5013 17.915 13.4943C17.9191 13.4873 17.9217 13.4795 17.9226 13.4715C18.2976 9.65098 17.2941 6.33148 15.2609 3.38998C15.2559 3.38042 15.2476 3.37297 15.2376 3.36898ZM6.01487 11.4585C5.12837 11.4585 4.39712 10.6567 4.39712 9.67348C4.39712 8.68948 5.11412 7.88848 6.01487 7.88848C6.92237 7.88848 7.64687 8.69623 7.63262 9.67348C7.63262 10.6575 6.91562 11.4585 6.01487 11.4585ZM11.9961 11.4585C11.1089 11.4585 10.3784 10.6567 10.3784 9.67348C10.3784 8.68948 11.0946 7.88848 11.9961 7.88848C12.9036 7.88848 13.6281 8.69623 13.6139 9.67348C13.6139 10.6575 12.9044 11.4585 11.9961 11.4585Z" fill="white" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_716_888">
                                                                        <rect width="18" height="18" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </a>

                                                    </li>
                                                    <li>
                                                        <a target="_blank" rel="noreferrer" href="https://twitter.com/terraspaces">
                                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M17.7321 3.70275C17.1059 3.98025 16.4331 4.16775 15.7259 4.2525C16.4556 3.81584 17.0016 3.1286 17.2619 2.319C16.5763 2.72624 15.8259 3.01289 15.0434 3.1665C14.5172 2.60465 13.8202 2.23224 13.0606 2.1071C12.3011 1.98196 11.5215 2.11109 10.8428 2.47444C10.1642 2.83778 9.62447 3.41502 9.3075 4.11652C8.99054 4.81803 8.91404 5.60456 9.08989 6.354C7.70065 6.28424 6.34161 5.92316 5.10096 5.29417C3.8603 4.66519 2.76577 3.78237 1.88839 2.703C1.58839 3.2205 1.41589 3.8205 1.41589 4.4595C1.41555 5.03474 1.55721 5.60118 1.8283 6.10855C2.09938 6.61591 2.49151 7.04852 2.96989 7.368C2.41509 7.35034 1.87254 7.20043 1.38739 6.93075V6.97575C1.38733 7.78255 1.66641 8.56453 2.17727 9.18899C2.68814 9.81346 3.39932 10.2419 4.19014 10.4017C3.67547 10.541 3.13589 10.5615 2.61214 10.4617C2.83526 11.156 3.26988 11.763 3.85516 12.1979C4.44044 12.6329 5.14707 12.8739 5.87614 12.8872C4.63851 13.8588 3.11005 14.3858 1.53664 14.3835C1.25792 14.3836 0.979444 14.3673 0.702637 14.3347C2.29974 15.3616 4.15889 15.9066 6.05764 15.9045C12.4851 15.9045 15.9989 10.581 15.9989 5.964C15.9989 5.814 15.9951 5.6625 15.9884 5.5125C16.6719 5.01823 17.2618 4.40617 17.7306 3.705L17.7321 3.70275V3.70275Z" fill="white" />
                                                            </svg>

                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a target="_blank" rel="noreferrer" href="https://terraspaces.medium.com/">
                                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M3.279 5.448C3.28819 5.3567 3.27588 5.26451 3.24306 5.17882C3.21025 5.09313 3.15783 5.01631 3.09 4.9545L1.689 3.25425V3H6.0375L9.399 10.4287L12.354 3H16.5V3.25425L15.3022 4.41C15.2515 4.44919 15.2123 4.50142 15.189 4.56113C15.1656 4.62083 15.1589 4.68577 15.1695 4.749V13.2495C15.1589 13.3127 15.1656 13.3777 15.189 13.4374C15.2123 13.4971 15.2515 13.5493 15.3022 13.5885L16.4722 14.745V15H10.5893V14.7457L11.8012 13.5607C11.9205 13.4407 11.9205 13.4055 11.9205 13.2225V6.351L8.5515 14.9715H8.097L4.1745 6.351V12.129C4.14225 12.3713 4.2225 12.6165 4.392 12.792L5.96775 14.718V14.9715H1.5V14.718L3.075 12.792C3.15833 12.705 3.22018 12.5998 3.2556 12.4847C3.29102 12.3696 3.29904 12.2478 3.279 12.129V5.448Z" fill="white" />
                                                            </svg>


                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a target="_blank" rel="noreferrer" href="https://www.youtube.com/channel/UCgOPSm97OL7bMBhr7A_BGFg">
                                                            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M10.0001 0C1.06554 0 0.90918 0.794545 0.90918 7C0.90918 13.2055 1.06554 14 10.0001 14C18.9346 14 19.091 13.2055 19.091 7C19.091 0.794545 18.9346 0 10.0001 0ZM12.9137 7.30364L8.83191 9.20909C8.47463 9.37455 8.18191 9.18909 8.18191 8.79454V5.20545C8.18191 4.81182 8.47463 4.62545 8.83191 4.79091L12.9137 6.69636C13.271 6.86364 13.271 7.13636 12.9137 7.30364Z" fill="white" />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="col-md-3 col-lg-2 ">
                                        <div className="resources">
                                            <div className="f-title pb-15">
                                                <h3>Resources</h3>
                                            </div>
                                            <ul className="res-link">
                                                <li>
                                                    <a href="https://terraspaces.gitbook.io/terraspaces" target="_blank" rel="noreferrer">Documentations</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-lg-5">
                                        <div className="f-title pb-15">
                                            <h3>Stay in the Loop</h3>
                                        </div>
                                        <div className="f-newsletter">
                                            <p className="t-14">Subscribe our newsletter to stay in the loop with our <br />newest features releases,</p>
                                            <div className="f-subscribe">
                                                <form method="GET" action="" className="newsletter-form" target="_blank">
                                                    <input type="email" name="EMAIL" id="email" placeholder="Enter your email" />
                                                    <button type="submit" className="cmn-btn">Subscribe</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-border">
                                <hr />
                            </div>
                            <div className="copyright">
                                <div className="llc">
                                    <p>© 2022 Terraspaces, LLC</p>
                                </div>
                                <div className="copy-link">
                                    <a href="#">Privacy Policy</a>
                                    <span>•</span>
                                    <a href="#"> Terms and Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                    <Script src="assets/js/popper.min.js" />
                    <Script src="assets/js/bootstrap.min.js" />
                    {/* <Script src="assets/js/owl.carousel.min.js" />
                    <Script src="assets/js/magnific-popup.min.js" /> */}
                    <Script src="assets/js/main.js" />
                </WalletProvider>
            </CollectionProvider>

        </>
    )
}

export default MyApp
