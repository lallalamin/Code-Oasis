import { createContext, useEffect } from "react";
import { io } from "socket.io-client";
import { useRecoilValue } from "recoil";
import userAtom  from "../atoms/userAtom";
import { useState } from "react";

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);  
}

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const user = useRecoilValue(userAtom);

    useEffect(() => {
        const socket = io("http://localhost:5000", {
            query:{
                userId: user?._id
            }
        });
        setSocket(socket);

        return () => socket && socket.close();
    },[user?._id]);
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}