import React from 'react';
import { css, cx } from 'emotion';
import { DisplayText, Flex, TextLink, Note } from '@contentful/f36-components';
import { ExternalLinkIcon } from '@contentful/f36-icons';
import tokens from '@contentful/f36-tokens';

import type { FrontMatter } from '../../types';
import { getGridStyles } from '../../utils/getGridStyles';

const styles = {
  header: css({
    gridArea: 'header',
    gridAutoRows: 'min-content',
    padding: `${tokens.spacing4Xl} 0 ${tokens.spacingM}`,
    borderBottom: `1px solid ${tokens.gray300}`,
    marginBottom: tokens.spacing2Xl,
    // this selector will make sure that all children of the header will start at the first column of its grid
    '> *': {
      gridColumnStart: 1,
    },
  }),
  intro: css({
    // This will add a bigger fontSize to the first p and to anchors inside of it
    '> p:first-child, > p:first-child a': {
      fontSize: tokens.fontSizeXl,
      lineHeight: tokens.lineHeightXl,
    },
    '> p:last-child': {
      marginBottom: 0,
    },
  }),
  gitHubLink: css({
    gridColumnStart: 'initial',
  }),
};

interface PageContentHeaderProps {
  title: FrontMatter['title'];
  children?: React.ReactNode;
}

export function PageContentHeader({
  title,
  children,
}: PageContentHeaderProps) {
  const gridStyles = getGridStyles();

  return (
    <header className={cx(gridStyles.contentColumns, styles.header)}>
      <DisplayText as="h1" marginBottom='spacingXs'>
        {title}
      </DisplayText>

      <Flex
        className={styles.gitHubLink}
        paddingLeft="spacing2Xl"
        flexDirection="column"
        gap={tokens.spacingXs}
        alignItems="start"
      >
        <TextLink
          href='#0'
          target="_blank"
          rel="noopener noreferrer"
          icon={<ExternalLinkIcon />}
          alignIcon="end"
        >
          Give feedback
        </TextLink>
      </Flex>

      <Flex flexDirection="column" className={styles.intro}>
        {children}
      </Flex>
    </header>
  );
}
