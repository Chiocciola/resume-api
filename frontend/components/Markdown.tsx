import { micromark } from "micromark"
import React from "react";

function renderHTML(markdown: string) {
  
    return {__html: micromark(markdown)};
  }

export default function Markdown({children,}: {children: React.ReactNode}) {

    return (
        <div dangerouslySetInnerHTML={renderHTML(children as string ?? "")}/>
    );
}