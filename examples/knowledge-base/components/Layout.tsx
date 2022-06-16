import React from "react";
import { css, cx } from "emotion";
import { Grid } from "@contentful/f36-components";

import { useCurrentLocation } from "../hooks/useCurrentLocation";
import { getGridStyles, TOPBAR_HEIGHT } from "../utils/getGridStyles";
import { Topbar } from "./Topbar";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import type { SidebarProps } from "./Sidebar";

const styles = {
  mainItem: css({
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    height: `calc(100vh - ${TOPBAR_HEIGHT})`,
  }),
};

interface Props {
  children: React.ReactNode;
  sidebarLinks: SidebarProps["links"];
}

export function Layout({ children, sidebarLinks }: Props) {
  const { currentPage } = useCurrentLocation();
  const gridStyles = getGridStyles();

  return (
    <Grid
      className={cx(gridStyles.wrapper, gridStyles.wrapperColumns)}
      columnGap="none"
    >
      <Topbar />
      <Sidebar currentPage={currentPage} links={sidebarLinks} />

      {/* Unique key for each page, so scroll position is not preserved when opening a new page */}
      <Grid.Item
        key={currentPage}
        area="content"
        as="main"
        className={styles.mainItem}
      >
        {children}
        <Footer />
      </Grid.Item>
    </Grid>
  );
}
