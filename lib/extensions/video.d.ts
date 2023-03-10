import { VideoOptions } from "@chakra-editor/types";
import { Node } from "@tiptap/react";
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        video: {
            setVideo: (options: {
                src: string;
                title?: string;
                sources?: Record<string, string>;
            }) => ReturnType;
        };
    }
}
export declare const VideoExtension: Node<VideoOptions, any>;
