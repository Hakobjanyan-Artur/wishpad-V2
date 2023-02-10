import { useCallback, useState } from "react";

const widthTeme = (Component) => {
    return (props) => {
        const [theme, setTheme] = useState('dark')

        const toggleTheme = useCallback(() => {
            setTheme(prev => prev === 'dark' ? 'light' : 'dark')
        }, [])
        const [hiden, setHiden] = useState(false)

        const toggleHiden = useCallback(() => {
            setHiden(prev => prev === false ? true : false)
        }, [])

        return < Component
            {...{ theme, toggleTheme, hiden, toggleHiden }}
            {...props}
        />
    }
}

export default widthTeme