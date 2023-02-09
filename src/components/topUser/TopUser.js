import user from '../../images/user.png'

export default function TopUser() {
    return (
        <div className="top-user">
            <div className="top-user-images">
                <img src={user} alt="" />
            </div>
            <div className="top-user-name">
                <h4>UserName</h4>
                <h5>Real name</h5>
            </div>
        </div>
    )
}