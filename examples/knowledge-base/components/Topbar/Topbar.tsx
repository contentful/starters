import React from "react";
import { css, cx } from "emotion";
import { Grid, Flex } from "@contentful/f36-components";
import tokens from "@contentful/f36-tokens";

import {
  getGridStyles,
  TOPBAR_HEIGHT,
  SCREEN_BREAKPOINT_LARGE,
} from "../../utils/getGridStyles";
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
    </Grid.Item>
  );
}
