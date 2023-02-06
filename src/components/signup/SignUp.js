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
                    <form>
                        <input
                            placeholder='Enter your email'
                            type="email" />
                        <input
                            placeholder='Enter your password'
                            type="password" />
                        <div className='check'>
                            <h4>Remember Me</h4>
                            <input className='checkbox' type="checkbox" />
                        </div>
                        <button>Sign-in</button>
                        <h5>Forgot password ?</h5>
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