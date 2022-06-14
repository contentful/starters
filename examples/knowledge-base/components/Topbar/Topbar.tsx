import React from "react";
import { css, cx } from "emotion";
import { Grid, Flex } from "@contentful/f36-components";
import tokens from "@contentful/f36-tokens";

import {
  getGridStyles,
  TOPBAR_HEIGHT,
  SCREEN_BREAKPOINT_LARGE,
} from "../../utils/getGridStyles";
import { DocSearch } from "../DocSearch";
import { TopbarLogo } from "./TopbarLogo";

const styles = {
  header: css({
    display: "grid",
    backgroundColor: tokens.colorWhite,
    color: tokens.blue700,
    height: TOPBAR_HEIGHT,
    borderBottom: `1px solid ${tokens.gray300}`,
  }),
  navList: css({
    listStyle: "none",
    padding: 0,
    display: "flex",
    "> li": {
      marginRight: tokens.spacingXl,
      fontSize: tokens.fontSizeL,
    },
  }),
  docSearchContainer: css({
    "& .algolia-autocomplete": {
      width: "100%",
    },
    [`@media screen and (min-width: ${SCREEN_BREAKPOINT_LARGE})`]: {
      gridColumnStart: 4,
    },
  }),
};

export function Topbar() {
  const gridStyles = getGridStyles();

  return (
    <Grid.Item
      as="header"
      area="topbar"
      className={cx(styles.header, gridStyles.wrapperColumns)}
    >
      <Flex paddingLeft="spacingXl">
        <TopbarLogo />
      </Flex>

      <Flex
        justifyContent="space-between"
        alignItems="center"
        className={cx(
          gridStyles.contentColumns,
          gridStyles.contentColumnsBigScreens
        )}
      >
        <Flex className={styles.docSearchContainer}>
          <DocSearch />
        </Flex>
      </Flex>
    </Grid.Item>
  );
}
