import { useEffect } from "react";
import { useDate } from "../contexts/selectedDateContext";

function Chat() {
    // const { selectedDate } = useDate()
    // useEffect(() => {
    //     console.log("This means that the component has been rendered.")
    // }, [])// empty dependecy array== once rendering.
    return (<div className="chat">
        Chat area
        {/* {console.log(`From the chat area ${selectedDate.getDate()}`)}//TEST CODE */}


    </div>);
}

export default Chat;