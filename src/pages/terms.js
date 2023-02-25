import { useNavigate } from 'react-router-dom'
import logo from '../images/logo.jpg'


export default function Terms() {
    const navigate = useNavigate()

    return (
        <div className="terms">
            <header>
                <span>Help</span>
                <img
                    onClick={() => navigate('/')}
                    src={logo} alt="" />
                <span>Center</span>
            </header>
            <section>
                <div className='welcome'>
                    <h1>Welcome to Wishpad!</h1>
                    <p>These Terms of Use (or "Terms") govern your use of Wishpad, except in the exceptional cases where we identify conditions (rather than these) directly on the ads, and the Wishpad Service information described below. When you enable a Wishpad account or enable Wishpad, you agree to the full Terms.</p>
                </div>
                <div className='service'>
                    <h1>The Wishpad Service</h1>
                    <p>So, we bring you different types of accounts and features to help you create, share, grow your presence and connect with people on Wishpad and beyond. We also want to strengthen your relationship by sharing experiences that you truly care about. So we create systems that try to understand who and what you and others care about, and use that information to help you create, find, join and share experiences that matter to you. Part of that is highlighting content, features, offers, and accounts that you might be interested in and suggesting ways to use Wishpad based on what you and others do in Wishpad.</p>
                </div>
                <div className='commitment'>
                    <h1>Your commitments</h1>
                    <h2>We want our Service to be as open as possible, but we also want it to be safe, secure, and legal. So, we need you to take on a few restrictions in order to be a part of the Wishpad community.</h2>
                    <ul>
                        <li><p>You must be at least 16 years old or the minimum legal age in your country to use Wishpad.</p></li>
                        <li><p>You must not be prohibited from receiving any aspect of our Service under applicable laws or engaging in payments-related Services if you are on an applicable denied party listing.</p></li>
                        <li><p>We must not have previously disabled your account for violation of law or any of our policies.</p></li>
                        <li><p>You must not be a convicted sex offender.</p></li>
                        <li><p>You can't impersonate others or provide inaccurate information.
                            You don't have to disclose your identity on Wishpad, but you must provide us with accurate and up-to-date information (including registration information), which may include providing personal data. Also, you may not impersonate someone or something you aren't, and you can't create an account for someone else unless you have their express permission.</p></li>
                        <li><p>You may not do anything to interfere with or impair the intended operation of the Service.</p></li>
                        <li><p>You can't attempt to create accounts or access or collect information in unauthorised ways.
                            This includes creating accounts or collecting information in an automated way without our express permission.</p></li>
                        <li><p>You can't sell, license or purchase any account or data obtained from us or our Service.
                            This includes attempts to buy, sell or transfer any aspect of your account (including your username); solicit, collect or use login credentials or badges of other users; or request or collect Wishpad usernames, passwords or misappropriate access tokens.</p></li>
                        <li><p>You can't post someone else's private or confidential information without permission or do anything that violates someone else's rights, including intellectual property rights (e.g. copyright infringement, trademark infringement, counterfeit or pirated goods).</p></li>
                        <li><p>You may not modify, translate, create derivative works from, or reverse engineer our product</p></li>
                        <li><p>You can't use a domain name or URL in your username without our prior written consent.</p></li>
                        <li><p>We do not claim ownership of your content, but you grant us a licence to use it.</p></li>
                        <li><p>Permission to use your username, profile picture and information about your relationships and actions with accounts, ads and sponsored content.</p></li>
                    </ul>
                </div>
                <div className='Additional'>
                    <h1>Additional rights we retain</h1>
                    <ul>
                        <li><p>If you select a username or similar identifier for your account, we may change it if we believe it is appropriate or necessary (for example, if it infringes someone's intellectual property or impersonates another user).</p></li>
                        <li><p>If you use content covered by intellectual property rights that we have and make available in our Service (for example, images, designs, videos or sounds we provide that you add to content you create or share), we retain all rights to our content (but not yours).</p></li>
                        <li><p>You can only use our intellectual property and trademarks or similar marks as expressly permitted by our Brand Guidelines or with our prior written permission.</p></li>
                        <li><p>You must obtain written permission from us or under an open-source licence to modify, create derivative works of, decompile or otherwise attempt to extract source code from us.</p></li>
                    </ul>
                </div>
                <div className='removal'>
                    <h1>Content removal and disabling or terminating your account</h1>
                    <h2>Content will not be deleted within 90 days of the account deletion or content deletion process beginning in the following situations:</h2>
                    <ul>
                        <li><p>where your content has been used by others in accordance with this licence and they have not deleted it (in which case this licence will continue to apply until that content is deleted)</p></li>
                        <li><p>where deletion within 90 days is not possible due to technical limitations of our systems, in which case, we will complete the deletion as soon as technically feasible</p></li>
                    </ul>
                </div>
                <div className='Community'>
                    <h1>Community Guidelines</h1>
                    <ul>
                        <li><p>Share only photos and videos that you've taken or have the right to share.</p></li>
                        <li><p>We know that there are times when people might want to share nude images that are artistic or creative in nature, but for a variety of reasons, we don't allow nudity on Wishpad. This includes photos, videos and some digitally-created content that show sexual intercourse, genitals and close-ups of fully-nude buttocks. It also includes some photos of female nipples, but photos in the context of breastfeeding, birth giving and after-birth moments, health-related situations (for example, post-mastectomy, breast cancer awareness or gender confirmation surgery) or an act of protest are allowed. Nudity in photos of paintings and sculptures is OK too.</p></li>
                        <li><p>People like to share photos or videos of their children. For safety reasons, there are times when we may remove images that show nude or partially nude children. Even when this content is shared with good intentions, it could be used by others in unanticipated ways.</p></li>
                        <li><p>Help us stay spam-free by not artificially collecting likes, followers or shares, posting repetitive comments or content, or repeatedly contacting people for commercial purposes without their consent. Don't offer money or giveaways of money in exchange for likes, followers, comments or other engagement. Don't post content that engages in, promotes, encourages, facilitates or admits to the offering, solicitation or trade of fake and misleading user reviews or ratings.</p></li>
                    </ul>
                </div>
            </section>
        </div>
    )
}