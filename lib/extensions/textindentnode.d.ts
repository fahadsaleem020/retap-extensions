import { TextStyleOptions } from "@tiptap/extension-text-style";
import { Extension } from "@tiptap/react";
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        textIndent: {
            increaseIndent: (value?: number, limit?: number) => ReturnType;
            decreaseIndent: (value?: number) => ReturnType;
        };
    }
}
export declare const TextIndent: Extension<TextStyleOptions, any>;
