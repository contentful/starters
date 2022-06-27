import React from "react";
import type { GetStaticProps } from "next";
import { css } from "emotion";
import Image from "next/image";
import tokens from "@contentful/f36-tokens";
import {
  DisplayText,
  Heading,
  Paragraph,
  Flex,
  TextLink,
  Button,
} from "@contentful/f36-components";
import { ArrowForwardTrimmedIcon } from "@contentful/f36-icons";

import formaSVG from "../public/images/forma-icon.svg";
import nextJsSVG from "../public/images/nextjs-icon.svg";
import homepageImg from "../public/images/homepage-illustration.svg";
import { SCREEN_BREAKPOINT_LARGE } from "../utils/getGridStyles";
import { getAllCategories, getSiteSettings } from "../lib/api";
import { Layout } from "../components/Layout";
import type { SidebarProps } from "../components/Sidebar";

const styles = {
  grid: css({
    flex: 1, // this is necessary to make the footer sticky to the bottom of the page
    padding: `${tokens.spacing3Xl} ${tokens.spacingL} 0`,
    [`@media screen and (min-width: ${SCREEN_BREAKPOINT_LARGE})`]: {
      display: "grid",
      gridTemplateColumns: "1fr 960px 1fr",
      gridTemplateRows: "min-content",
    },
    "> *": {
      [`@media screen and (min-width: ${SCREEN_BREAKPOINT_LARGE})`]: {
        gridColumnStart: 2,
      },
    },
  }),
  sections: css({
    "> *": {
      maxWidth: "220px",
    },
  }),
  imgContainer: css({
    flexGrow: 1,
    maxWidth: "680px",
    "> span": { flexGrow: 1 },
  }),
};

interface HomePageProps {
  sidebarLinks: SidebarProps["links"];
}

export default function Home({ sidebarLinks }: HomePageProps) {
  return (
    <Layout sidebarLinks={sidebarLinks}>
      <article className={styles.grid}>
        <Flex
          justifyContent="space-between"
          alignItems="flex-start"
          gap="spacing2Xl"
        >
          <Flex flexDirection="column">
            <Flex
              flexDirection="column"
              alignItems="flex-start"
              marginBottom="spacing3Xl"
            >
              <DisplayText as="h1" size="large">
                Knowledge base.
                <br />
                Contentful + Next.js
              </DisplayText>

              <Button
                as="a"
                href="/getting-started/overview"
                variant="primary"
                size="large"
                endIcon={<ArrowForwardTrimmedIcon />}
              >
                Get started
              </Button>
            </Flex>

            <Flex className={styles.sections} gap="spacing2Xl">
              <Flex flexDirection="column" alignItems="flex-start">
                <Image src={formaSVG} alt="Figma’s logo" />

                <Heading marginTop="spacingM">Forma36</Heading>
                <Paragraph>A design system by Contentful</Paragraph>
                <TextLink href="https://f36.contentful.com/" target="_blank">
                  View the documentation
                </TextLink>
              </Flex>

              <Flex flexDirection="column" alignItems="flex-start">
                <Image src={nextJsSVG} alt="React’s logo" />

                <Heading marginTop="spacingM">Next.js</Heading>
                <Paragraph>The React Framework</Paragraph>
                <TextLink href="https://nextjs.org/" target="_blank">
                  View the documentation
                </TextLink>
              </Flex>
            </Flex>
          </Flex>

          <Flex className={styles.imgContainer}>
            <Image
              src={homepageImg}
              alt="UI components in a browser"
              layout="responsive"
            />
          </Flex>
        </Flex>
      </article>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const sidebarLinks = await getAllCategories();
  const siteSettings = await getSiteSettings();

  return {
    props: {
      sidebarLinks,
      siteSettings,
    },
  };
};
