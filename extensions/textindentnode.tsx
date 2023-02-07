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

export const TextIndent = Extension.create<TextStyleOptions>({
  name: "textIndent",

  addGlobalAttributes() {
    const htmlAttrs = this.options.HTMLAttributes;
    return [
      {
        types: ["textStyle"],
        attributes: {
          marginLeft: {
            default: null,
            parseHTML: (element) =>
              element.style.marginLeft.replace(/['"]+/g, ""),
            renderHTML(attributes) {
              if (!attributes.marginLeft) {
                return {};
              }
              return {
                style: `margin-left: ${attributes.marginLeft}`,
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
      increaseIndent:
        (value, limit) =>
        ({ chain }) => {
          let previous: number = parseInt(
            this.editor.getAttributes("textStyle").marginLeft?.split("px")[0] ??
              "0"
          );

          if (previous === limit) return false;
          const combined = previous + (value ?? 0);
          return chain()
            .setMark("textStyle", { marginLeft: combined + "px" })
            .run();
        },
      decreaseIndent:
        (value) =>
        ({ chain }) => {
          let previous: number = parseInt(
            this.editor.getAttributes("textStyle").marginLeft?.split("px")[0] ??
              "0"
          );

          const combined = previous - value!;

          if (!previous || !combined)
            return chain().unsetMark("textStyle").run();
          return chain()
            .setMark("textStyle", { marginLeft: combined + "px" })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
