import { useContext } from "react"
import { ThemeContext } from "../../App"


export default function Search() {
    const { theme } = useContext(ThemeContext)


    return (
        <div className="search">
            <div
                style={{ backgroundColor: theme === 'dark' ? '' : '#000' }}
                className="header">
                <h1 className="title">Search</h1>
                <div className="search-input">
                    <input type="text" />
                </div>
            </div>
        </div>
    )
}