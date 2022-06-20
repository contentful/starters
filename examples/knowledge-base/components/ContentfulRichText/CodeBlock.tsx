import React from "react";

import Highlight, {
  defaultProps as HighlightDefaultProps,
  Language,
} from "prism-react-renderer";
import githubTheme from 'prism-react-renderer/themes/github';

import { cx, css } from "emotion";
import tokens from "@contentful/f36-tokens";

const styles = {
  root: css({
    padding: tokens.spacingM,
    borderRadius: tokens.borderRadiusMedium,
    marginBottom: tokens.spacingM,
  }),
};

interface CodeBlockProps {
  children: string;
  className: string;
}

export function CodeBlock({ children, ...otherProps }: CodeBlockProps) {
  const language = otherProps.className.replace("language-", "");

  return (
    <Highlight
      {...HighlightDefaultProps}
      theme={githubTheme}
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
