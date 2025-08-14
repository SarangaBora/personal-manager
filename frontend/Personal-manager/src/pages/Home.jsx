
import Calender from "../components/Calender"
import Notes from "../components/Notes"
import Chat from "../components/Chat"
import { DateProvider } from "../contexts/selectedDateContext"

const Home = () => {
    return (
        <div className="homePage">
            <DateProvider>
                <div className="notes-area"><Notes /></div>
                <div className="right-panel">
                    <div className="calender-area"><Calender /></div>
                    <div className="chat-area"><Chat /></div>
                </div>
            </DateProvider>

        </div>
    )
}

export default Home