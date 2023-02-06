import { useCallback, useState } from "react";

const changes = (Component) => {
    return (props) => {
        const [theme, setTheme] = useState('dark')

        const toggleTheme = useCallback(() => {
            setTheme(prev => prev === 'dark' ? 'light' : 'dark')
        }, [])

        return < Component
            {...{ theme, toggleTheme }}
            {...props}
        />
    }
}

export default changes