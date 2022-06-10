import type { NextPage } from "next";

interface TabbarProps {
    setOverview: any;
}

export const TabbarContent : NextPage<TabbarProps> = ({ setOverview}) => {
    return(
        <div className="navs-area mt-120">
            <ul className="nav nav-pills" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="t-20 nav-link active" id="pills-owned-tab" data-bs-toggle="pill" data-bs-target="#pills-owned" type="button" role="tab" aria-controls="pills-owned" aria-selected="true" onClick={() => setOverview(0)}>Owned</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="t-20 nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => setOverview(1)}>Staked</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="t-20 nav-link" id="pills-referrals-tab" data-bs-toggle="pill" data-bs-target="#pills-referrals" type="button" role="tab" aria-controls="pills-referrals" aria-selected="false" onClick={() => setOverview(2)}>Referrals</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="t-20 nav-link" id="pills-farms-tab" data-bs-toggle="pill" data-bs-target="#pills-farms" type="button" role="tab" aria-controls="pills-farms" aria-selected="false" onClick={() => setOverview(3)}>Farms</button>
                </li>
            </ul>
        </div>
    )
}