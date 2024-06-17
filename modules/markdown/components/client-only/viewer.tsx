"use client";

import { mp } from "@/shared";
import { useTheme } from "@/theme";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import React, { useEffect } from "react";
import { MARKDOWN_VIEWER_PLUGINS } from "../../constants";
import { IMarkdownViewerProps } from "../types";

export const MarkdownViewer: React.FC<IMarkdownViewerProps> = (props) => {
  const { value } = props;

  const ref = React.useRef<Viewer>(null);

  useEffect(() => {
    ref.current?.getInstance().setMarkdown(value);
  }, [value]);

  console.log("client-side-only viewer");

  const { mode } = useTheme();
  return mp(
    props,
    <div>
      <Viewer
        key={mode}
        ref={ref}
        initialValue={value}
        plugins={MARKDOWN_VIEWER_PLUGINS}
        theme={mode}
      />
    </div>
  );
};
