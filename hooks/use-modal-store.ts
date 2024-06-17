import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createServer" | "invite" | "editServer" | "members" | "createChannel" | "leaveServer" | "deleteServer" | "deleteChannel" | "editChannel" | "messageFile";

interface ModelData {
    server?: Server;
    channel?: Channel;
    channelType?: ChannelType;
    apiUrl?: string;
    query?: Record<string, any>;
};
interface ModelStore {
    type: ModalType | null;
    data: ModelData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModelData) => void;
    onClose: () => void;
}

export const useModal = create<ModelStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
    onClose: () => set({ type: null, isOpen: false }),
}));