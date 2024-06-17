import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo } from "../../../types";

export const config = {
    api: {
        bodyParser: false,
    },
};


const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (!res.socket.server.io) {
        console.log("Initializing Socket.io server...");
        const path = "/api/socket/io";
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path,
            addTrailingSlash: false,
        });
        res.socket.server.io = io;

        io.on("connection", (socket) => {
            console.log("New client connected");

            socket.on("disconnect", () => {
                console.log("Client disconnected");
            });
        });
    } else {
        console.log("Socket.io server already running.");
    }
    res.end();
}

export default ioHandler;