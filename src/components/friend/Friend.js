import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectUsers } from "../../store/slices/users/usersSlices"


export default function Friend() {

    const { currentUser } = useSelector(selectUsers)

    return (
        <div className="friend">
            <h1>Friend</h1>
        </div>
    )
}