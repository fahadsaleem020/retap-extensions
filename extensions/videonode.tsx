import { defaultNodeMenuStyles } from "../defaults";
import { RetapToolbar } from "@retap/toolbar";
import { VideoOptions } from "@retap/types";
import { useRetap } from "@retap/provider";
import React, { useState } from "react";
import { useNode } from "@retap/hooks";
import { Box } from "@chakra-ui/react";
import {
  ReactNodeViewRenderer,
  mergeAttributes,
  NodeViewWrapper,
  NodeViewProps,
  Node,
} from "@tiptap/react";

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

export const Video = Node.create<VideoOptions>({
  addOptions() {
    return {
      HTMLAttributes: {
        className: "video",
        preload: "metadata",
        controls: true,
      },
    };
  },
  addAttributes() {
    return {
      title: {
        default: undefined,
      },
      src: {
        default: undefined,
      },
      width: {
        default: "100%",
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

  addCommands: () => {
    return {
      setVideo:
        ({ src, sources, title }) =>
        ({ commands }) => {
          const srcs = sources ? JSON.stringify(sources) : undefined;
          return commands.insertContent(
            `<video  sources=${srcs}  src=${src} title=${
              title?.trim().length ? title : "video"
            } />`
          );
        },
    };
  },

  parseHTML() {
    return [
      {
        tag: "video",
        getAttrs() {
          return null;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "video",
      mergeAttributes(HTMLAttributes, this.options.HTMLAttributes),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VideoNode);
  },
  draggable: true,
  group: "block",
  name: "video",
  atom: true,
});

const VideoNode = (props: NodeViewProps) => {
  const { video } = useRetap();
  useNode(video, props);

  const {
    selected,
    extension: { options },
    editor: { isEditable },
    node: { attrs },
  } = props;
  const [isMenu, setIsMenu] = useState(false);

  return (
    <NodeViewWrapper>
      <Box
        className="videoNodeContainer"
        onMouseLeave={() => setIsMenu(false)}
        onMouseEnter={() => setIsMenu(true)}
      >
        {isEditable &&
          isMenu &&
          selected &&
          video?.menuProps?.buttons?.length && (
            <RetapToolbar
              buttonProps={video.menuProps.buttonProps}
              fallback={video.menuProps.fallback}
              buttons={video.menuProps.buttons}
              editor={props.editor as any}
              {...defaultNodeMenuStyles}
              {...video.menuProps.styles}
            />
          )}
        <Box
          as="video"
          border={selected ? "2px" : undefined}
          borderColor="blue.500"
          title={attrs.title}
          m={attrs.margin}
          h={attrs.height}
          src={attrs.src}
          w={attrs.width}
          zIndex={1}
          {...options.HTMLAttributes}
        />
      </Box>
    </NodeViewWrapper>
  );
};
