import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createServer" | "invite" | "editServer" | "members" | "createChannel" | "leaveServer" | "deleteServer" | "deleteChannel";

interface ModelData {
    server?: Server;
    channel?: Channel;
    channelType?: ChannelType;
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