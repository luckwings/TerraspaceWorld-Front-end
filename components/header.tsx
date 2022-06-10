import type { NextPage } from 'next'
import { useContext, useEffect } from 'react';
import { WalletContext } from "../contexts/wallet"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SearchBox } from './SearchBox';

const Header: NextPage = () => {
    const router = useRouter()
    const { near, wallet, signIn, signOut } = useContext(WalletContext)
    const onWallet = async () => {
        if (wallet?.isSignedIn()) {
            signOut();
        } else {
            signIn();
        }
    }
    return (
        <header id="header" className="hedaer-abs">
            <div className="header-area">
                <nav className="navbar navbar-expand-md">
                    <div className="container">
                        <a className="navbar-brand logo" href="">
                            <img src="assets/img/logo/logo.png" alt="logo" loading="lazy" />
                        </a>
                        <div>
                            <SearchBox />
                        </div>
                        <div className="d-flex align-items-center mobile-icon-wrapper">
                            <div className="d-block login-b ">
                                <button className="cmn-btn" onClick={onWallet}>
                                    {
                                        !wallet?.isSignedIn() ?
                                            <span> Wallet</span>
                                            :
                                            <span> {wallet.getAccountId()}</span>
                                    }
                                    <img src="assets/img/icons/Wallet1.svg" alt="wallet" />
                                </button>
                            </div>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <i className="fas fa-bars"></i>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link href="/">
                                        <a className={`nav-link ${router.pathname == "/" ? "active" : ""}`}>Overview</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/stake">
                                        <a className={`nav-link ${router.pathname == "/stake" ? "active" : ""}`}>Stake</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/dashboard">
                                        <a className={`nav-link ${router.pathname == "/dashboard" ? "active" : ""}`}>Dashboard</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/drops">
                                        <a className={`nav-link ${router.pathname == "/drops" ? "active" : ""}`}>Drops</a>
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link href="/mint">
                                        <a className={`nav-link ${router.pathname == "/mint" ? "active" : ""}`}>Mint</a>
                                    </Link>
                                </li> */}
                                <button className="cmn-btn mobile-wallet" onClick={onWallet}>
                                    {
                                        !wallet?.isSignedIn() ?
                                            <span> Wallet</span>
                                            :
                                            <span> {wallet.getAccountId()}</span>
                                    }
                                    <img src="assets/img/icons/Wallet1.svg" alt="wallet" />
                                </button>
                            </ul>
                        </div>

                        <div className="mobile-icon  ms-auto d-none">
                            <button className="cmn-btn" onClick={onWallet}>
                                {
                                    !wallet?.isSignedIn() ?
                                        <span> Wallet</span>
                                        :
                                        <span> {wallet.getAccountId()}</span>
                                }
                                <img src="assets/img/icons/Wallet1.svg" alt="wallet" />
                            </button>
                        </div>

                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header
