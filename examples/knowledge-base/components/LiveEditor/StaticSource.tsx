import React from "react";

import Highlight, {
  defaultProps as HighlightDefaultProps,
  Language,
} from "prism-react-renderer";
import { theme } from "./theme";
import { cx, css } from "emotion";
import tokens from "@contentful/f36-tokens";

const styles = {
  root: css({
    padding: tokens.spacingM,
    borderRadius: tokens.borderRadiusMedium,
    marginBottom: tokens.spacingM,
  }),
};

interface StaticSourceProps {
  children: string;
  className: string;
}

export function StaticSource({ children, ...otherProps }: StaticSourceProps) {
  const language = otherProps.className.replace("language-", "");

  return (
    <Highlight
      {...HighlightDefaultProps}
      theme={theme}
      code={children?.trim() ?? ""}
      language={language as Language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={cx(styles.root, className)} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
