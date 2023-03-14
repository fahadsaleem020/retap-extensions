import Image, { ImageOptions } from "@tiptap/extension-image";
import { defaultNodeMenuStyles } from "../defaults";
import { Box, Image as CImage } from "@chakra-ui/react";
import { Toolbar } from "@chakra-editor/toolbar";
import { useChakraEditor } from "@chakra-editor/provider";
import React, { useState } from "react";
import { useNode } from "@chakra-editor/hooks";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewProps,
} from "@tiptap/react";

export const ImageExtension = Image.extend<ImageOptions>({
  draggable: true,
  inline: false,

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "auto",
        renderHTML: (attributes) => {
          return {
            width: `${attributes.width}`,
          };
        },
      },
      height: {
        default: "auto",
        renderHTML: (attributes) => {
          return {
            height: `${attributes.height}`,
          };
        },
      },
      margin: {
        default: "auto",
        renderHTML: (attributes) => {
          return {
            style: `margin: ${attributes.margin}`,
          };
        },
      },
      sources: {
        default: undefined,
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNode);
  },
});

const ImageNode = (props: NodeViewProps) => {
  const { image } = useChakraEditor();
  useNode(image, props);

  const {
    selected,
    extension: { options },
    editor: { isEditable },
    node: { attrs },
  } = props;
  const nodeAttributes = props.node.attrs;
  const [isMenu, setIsMenu] = useState(false);

  return (
    <NodeViewWrapper>
      <Box
        className="imageNodeContainer"
        onMouseEnter={() => selected && setIsMenu(true)}
        onMouseLeave={() => selected && setIsMenu(false)}
      >
        {isEditable &&
          isMenu &&
          selected &&
          image?.menuProps?.buttons?.length && (
            <Toolbar
              buttonProps={image.menuProps.buttonProps}
              fallback={image.menuProps.fallback}
              buttons={image.menuProps.buttons}
              editor={props.editor as any}
              {...defaultNodeMenuStyles}
              {...image.menuProps.styles}
            />
          )}
        <CImage
          onMouseMove={() => selected && !isMenu && setIsMenu(true)}
          border={selected ? "2px" : undefined}
          title={nodeAttributes.title}
          w={attrs.width}
          m={attrs.margin}
          h={attrs.height}
          alt={nodeAttributes.alt}
          src={nodeAttributes.src}
          borderColor="blue.500"
          zIndex={1}
          {...options.HTMLAttributes}
        />
      </Box>
    </NodeViewWrapper>
  );
};
