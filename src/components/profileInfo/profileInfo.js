import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectUsers } from "../../store/slices/users/usersSlices"
import data from "../dateFunc/DateFunc"

export default function ProfileInfo() {
    const { currentUser } = useSelector(selectUsers)

    useEffect(() => {
        // let d = data().slice(0, data().indexOf(' '))
        // let n = d[d.length - 1]
        // let date = new Date().getUTCMonth() + 1
        // console.log(+n)
        // console.log(date)

    }, [])

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
                    <h3>{currentUser?.lastname}</h3>
                    <h3>{currentUser?.dateOfReg}</h3>
                    <h3>{currentUser?.dateOfbirth}</h3>
                    <h3>{currentUser?.gender}</h3>
                    <h3>{currentUser?.country}</h3>
                    <h3>{currentUser?.city}</h3>
                    <h3>{currentUser?.email}</h3>
                    <h3>{currentUser?.dateOfLastActivity}</h3>
                </div>
            </section>
        </div>
    )
}