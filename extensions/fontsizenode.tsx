import { TextStyleOptions } from "@tiptap/extension-text-style";
import { Extension } from "@tiptap/react";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
    };
  }
}

export const FontSize = Extension.create<TextStyleOptions>({
  name: "fontSize",
  addGlobalAttributes() {
    const htmlAttrs = this.options.HTMLAttributes;
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) =>
              element.style.fontSize.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
                ...htmlAttrs,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { fontSize: fontSize + "px" })
            .run();
        },
    };
  },
});
