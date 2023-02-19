import { useSelector } from "react-redux"
import { selectUsers } from "../../store/slices/users/usersSlices"

export default function ProfileInfo() {
    const { currentUser } = useSelector(selectUsers)


    return (
        <div className="profile-info">
            <h1 className="title">Information about {currentUser?.name} {currentUser?.lastname}</h1>
            <section>
                <div className="left">
                    <h3>Name:</h3>
                    <h3>Last Name:</h3>
                    <h3>Registration date:</h3>
                    <h3>Date of birth:</h3>
                    <h3>Gender:</h3>
                    <h3>Country:</h3>
                    <h3>City:</h3>
                    <h3>Email:</h3>
                    <h3>Date of last activity:</h3>
                </div>
                <div className="right">
                    <h3>{currentUser?.name}</h3>
                    <h3>{currentUser?.lastname ? currentUser?.lastname : 'Not filled'}</h3>
                    <h3>{currentUser?.dateOfReg}</h3>
                    <h3>{currentUser?.dateOfbirth ? currentUser?.dateOfbirth : 'Not filled'}</h3>
                    <h3>{currentUser?.gender}</h3>
                    <h3>{currentUser?.country ? currentUser?.country : 'Not filled'}</h3>
                    <h3>{currentUser?.city ? currentUser?.city : 'Not filled'}</h3>
                    <h3>{currentUser?.email}</h3>
                    <h3>{currentUser?.dateOfLastActivity}</h3>
                </div>
            </section>
        </div>
    )
}