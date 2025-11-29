import { createContext } from "react";
import CircularProgress from '@mui/material/CircularProgress';

export const backend_url = import.meta.env.VITE_BACKEND_URL
export const AppContext = createContext()

const AppContextProvider = ({ children }) => {

    const ageCalculate = (dob) => {
        const today = new Date()
        const birthDay = new Date(dob)

        const age = today.getFullYear() - birthDay.getFullYear()

        return age
    }

    const months = [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split("_")
        return (
            dateArray[0] + " " + months[Number(dateArray[1])] + ", " + dateArray[2]
        )
    }

    const exports = {
        ageCalculate,
        slotDateFormat,
        CircularProgress
    }   

    return (
       <AppContext value={exports}>{ children }</AppContext>
    )
}

export default AppContextProvider