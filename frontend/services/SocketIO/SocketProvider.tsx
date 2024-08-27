import { SocketContext, socket } from "./socket";

interface SocketProviderProps {
    children: React.ReactNode, 
}

/**
 * SocketProvider function that provides a SocketContext to its children.
 *
 * @param {Object} children - The child components that will receive the SocketContext.
 * @return {JSX.Element} The SocketContext.Provider component.
 *  
 * @author [Gabriel LOPEZ](https://github.com/glopez-dev)
 */
export default function SocketProvider({ children }: Readonly<SocketProviderProps>) {

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}