import React from "react";
import { css } from "emotion";
import tokens from "@contentful/f36-tokens";
import { Grid } from "@contentful/f36-components";

import { SidebarSection } from "./SidebarSection";

const contentfulSidebarLinks = require("../utils/contentfulSidebarLinks.json");

const styles = {
  nav: css({
    padding: `${tokens.spacingM} 0`,
    overflowY: "auto",
    color: tokens.gray700,
  }),
  list: css({
    padding: 0,
    listStyle: "none",
  }),
};

interface Props {
  currentPage?: string;
}

export function Sidebar({ currentPage = "/" }: Props) {
  const links = contentfulSidebarLinks;

  return (
    <Grid.Item
      as="nav"
      area="sidebar"
      aria-label="Main Navigation"
      className={styles.nav}
    >
      {links.map((link) => (
        <SidebarSection
          currentPage={currentPage}
          links={link.links}
          key={link.slug}
          title={link.title}
        />
      ))}
    </Grid.Item>
  );
}
