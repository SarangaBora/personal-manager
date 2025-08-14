
import { children, createContext, useContext, useState } from "react";

const DateContext = createContext()

export const DateProvider = ({ children }) => {
    // const today = new Date()
    const [selectedDate, setSelectedDate] = useState(new Date())

    return (
        <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
            {children}
        </DateContext.Provider>
    )
}


export const useDate = () => useContext(DateContext)//custom hook to easily ise the datecontext