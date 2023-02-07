import { TextStyleOptions } from "@tiptap/extension-text-style";
import { Extension } from "@tiptap/react";
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        fontSize: {
            setFontSize: (size: string) => ReturnType;
        };
    }
}
export declare const FontSize: Extension<TextStyleOptions, any>;
