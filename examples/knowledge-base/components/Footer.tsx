import React from "react";
import { css, cx } from "emotion";
import { TextLink, Flex, Text } from "@contentful/f36-components";
import type { TextLinkProps } from "@contentful/f36-components";
import { ExternalLinkIcon } from "@contentful/f36-icons";
import tokens from "@contentful/f36-tokens";

import { getGridStyles } from "../utils/getGridStyles";

const styles = {
  footer: css({
    gridAutoRows: "min-content",
    alignItems: "flex-start",
    justifyItems: "flex-start",
    marginTop: tokens.spacing2Xl,
    padding: tokens.spacingL,
  }),
};

function FooterLink({ href, label, isExternal = true, ...props }) {
  const externalLinkProps = isExternal
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
        icon: <ExternalLinkIcon />,
        alignIcon: "end" as TextLinkProps["alignIcon"],
      }
    : {};

  return (
    <TextLink variant="secondary" href={href} {...externalLinkProps} {...props}>
      {label}
    </TextLink>
  );
}

export function Footer() {
  const gridStyles = getGridStyles();

  return (
    <footer
      className={cx(
        gridStyles.contentColumns,
        gridStyles.contentColumnsBigScreens,
        styles.footer
      )}
    >
      <Flex className={gridStyles.columnStartTwo} gap="spacing2Xl">
        <Flex flexDirection="column" alignItems="flex-start" gap="spacingM">
          <FooterLink href="https://f36.contentful.com/" label="Forma 36" />
          <FooterLink href="https://nextjs.org/" label="Next.js" />
          <FooterLink href="https://vercel.com/" label="Vercel" />
          <FooterLink isExternal={false} href="/whats-new" label="What's new" />
        </Flex>

        <Flex flexDirection="column" alignItems="flex-start" gap="spacingM">
          <FooterLink
            href="https://www.contentful.com/legal/"
            label="Imprint / Legal"
          />
          <FooterLink
            href="https://www.contentful.com/legal/privacy-at-contentful/privacy-notice/"
            label="Privacy"
          />
          <FooterLink
            href="https://www.contentful.com/security/"
            label="Security"
          />
        </Flex>
      </Flex>

      <Text className={gridStyles.columnStartTwo}>
        This website is built with Next.js and Forma 36. Deployed with Vercel.
      </Text>
    </footer>
  );
}
