"use client";

import { Channel, MemberRole, Server, ChannelType } from "@prisma/client";
import ActionTooltip from "@/components/action-tooltip";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModalType, useModal } from "@/hooks/use-modal-store";

interface ServerChannelProps {
    channel: Channel;
    server: Server;
    role?: MemberRole;
}

const iconMap = {
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video,
    [ChannelType.TEXT]: Hash,
}

export const ServerChannel = ({
    channel,
    server,
    role,
}: ServerChannelProps) => {
    const { onOpen } = useModal();
    const params = useParams();
    const router = useRouter();
    const Icon = iconMap[channel.type];

    const onClick = () => {
        router.push(`/server/${server.id}/channel/${channel.id}`);
    };

    const onAction = (e: React.MouseEvent, action: ModalType) => {
        e.preventDefault();
        e.stopPropagation();
        onOpen(action, { channel, server });
    };

    return (
        <button
            onClick={onClick}
            className={cn(
                "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
                params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
            )}>
            <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            <p className={cn(
                "line-clamp-1 font-semibold text-xs text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
                params?.channelId === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
            )}>
                {channel.name}
            </p>
            {channel.name !== "general" && role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2">
                    <ActionTooltip label="Edit" side="top">
                        <button
                            onClick={(e) => { onAction(e, "editChannel"); }}
                            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                        >
                            <Edit className="h-4 w-4 hidden group-hover:block text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
                        </button>
                    </ActionTooltip>
                    <ActionTooltip label="Delete" side="top">
                        <button
                            onClick={(e) => { onAction(e, "deleteChannel"); }}
                            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                        >
                            <Trash className="h-4 w-4 hidden group-hover:block text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
                        </button>
                    </ActionTooltip>
                </div>
            )}
            {channel.name === "general" && (
                <Lock
                    className="h-4 w-4 ml-auto text-zinc-500 dark:text-zinc-400"
                />
            )}
        </button>
    );
}
