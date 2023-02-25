import logo from '../images/logo.jpg'
import { MagnifyingGlass } from 'react-loader-spinner'
import { BsHouseDoor, BsSearch } from 'react-icons/bs'
import { TfiBackLeft } from 'react-icons/tfi'
import { useNavigate } from 'react-router-dom'

export default function Error() {
    const navigate = useNavigate()


    return (
        <div className="error-pages">
            <header>
                <img src={logo} alt="" />
            </header>
            <section>
                <div className='section-header'>
                    <span>404</span>
                    <MagnifyingGlass
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="MagnifyingGlass-loading"
                        wrapperStyle={{}}
                        wrapperClass="MagnifyingGlass-wrapper"
                        glassColor='#c0efff'
                        color='blue'
                    />
                </div>
                <div className='section-txt'>
                    <h1>The requested page does not exist</h1>
                </div>
                <div className='section-buttons'>
                    <button onClick={() => navigate('/main')} ><BsHouseDoor /> Home</button>
                    <button onClick={() => navigate(-1)}><TfiBackLeft /> Back</button>
                    <button onClick={() => navigate('/search')}><BsSearch /> Search</button>
                </div>
            </section>
        </div>
    )
}