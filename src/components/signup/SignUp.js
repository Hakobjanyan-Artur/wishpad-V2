import { useNavigate } from 'react-router-dom'
import logo from '../../images/logo.jpg'

export default function SignUp() {
    const navigate = useNavigate()

    return (
        <div className="sign-up">
            <div className="sign-up-content">
                <div className="top">
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                </div>
                <div className="section">
                    <h1>WISH-PAD</h1>
                    <h3 className='reg-title'>Register to chat with friends</h3>
                    <form>
                        <input
                            placeholder='Enter your email'
                            type="email" />
                        <input
                            placeholder='Real name'
                            type="text" />
                        <input
                            placeholder='User name'
                            type="text" />
                        <input
                            placeholder='Create a password'
                            type="password" />
                        <input
                            placeholder='Confirm password'
                            type="password" />
                        <div className='show-password'>
                            <input
                                className='checkbox'
                                type="checkbox" />
                            <h4>Show password</h4>
                        </div>
                        <div className='check'>
                            <h4>Do you agree with us ?</h4>
                        </div>
                        <h5>Terms</h5>
                        <button>Sign-up</button>
                    </form>
                    <div className='sign-up-div'>
                        <h4>Don't have an account?</h4>
                        <h4
                            onClick={() => navigate('/')}
                            className='sign-up-btn'>Sign-In</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}