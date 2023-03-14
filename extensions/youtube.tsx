import Youtube, { YoutubeOptions } from "@tiptap/extension-youtube";
import { defaultNodeMenuStyles } from "../defaults";
import { Box, useToken } from "@chakra-ui/react";
import { Toolbar } from "@chakra-editor/toolbar";
import { useChakraEditor } from "@chakra-editor/provider";
import React, { useState } from "react";
import { useNode } from "@chakra-editor/hooks";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewProps,
} from "@tiptap/react";

export const YoutubeExtension = Youtube.extend<YoutubeOptions>({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "100%",
        renderHTML: (attributes) => {
          return {
            width: `${attributes.width}`,
          };
        },
      },
      height: {
        default: 500,
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
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(YoutubeNode);
  },
  draggable: true,
  inline: false,
});

const YoutubeNode = (props: NodeViewProps) => {
  const { youtube } = useChakraEditor();
  useNode(youtube, props);

  const [blue500] = useToken("colors", ["blue.500"]);
  const [isMenu, setIsMenu] = useState(false);
  const {
    selected,
    extension: { options },
    editor: { isEditable },
    node: { attrs },
  } = props;

  const incomingSrc = attrs.src as string;
  const splittedSrc = `https://www.youtube.com/embed/${incomingSrc.split("?")[1].split("=")[1]
    }?start=${attrs.start}`;

  return (
    <NodeViewWrapper>
      <Box
        className="youtubeNodeContainer"
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
      >
        <Box
          as="iframe"
          w={attrs.width}
          m={attrs.margin}
          h={attrs.height}
          src={splittedSrc}
          allowFullScreen={options.allowFullscreen}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{
            border: selected ? `2px solid ${blue500}` : "none",
          }}
          {...options.HTMLAttributes}
        />
        {isEditable && isMenu && youtube?.menuProps?.buttons?.length && (
          <Toolbar
            editor={props.editor as any}
            buttons={youtube.menuProps?.buttons}
            buttonProps={youtube.menuProps?.buttonProps}
            fallback={youtube.menuProps?.fallback}
            {...defaultNodeMenuStyles}
            {...youtube.menuProps.styles}
          />
        )}
      </Box>
    </NodeViewWrapper>
  );
};
