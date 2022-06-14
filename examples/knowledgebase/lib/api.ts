import fs from "fs";

const ARTICLE_GRAPHQL_FIELDS = `
sys {
  id
}
title
slug
metaDescription
body {
  json
  links {
    entries {
      block {
        sys {
          id
        }
        __typename
        ... on CodeBlock {
          name
          language
          code
        }
      }
    }
    assets {
      block {
        sys {
          id
        }
        url
        title
        width
        height
        description
      }
    }
  }
}
kbAppCategory {
  sys {
    id
  }
  name
  slug
  previewDescription
}
`;

/**
 *
 * @param query - the GraphQL query to be used by the API
 * @param preview - if true, it tells the app to request the content from preview API
 * @returns
 */
async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

function extractArticle(fetchResponse) {
  return fetchResponse?.data?.kbAppArticleCollection?.items?.[0];
}

function extractArticleEntries(fetchResponse) {
  return fetchResponse?.data?.kbAppArticleCollection?.items;
}

export async function getSingleArticleBySlug(slug, preview = false) {
  console.log("cf fetch ", slug);
  const entry = await fetchGraphQL(
    `query {
      kbAppArticleCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  console.log(entry);
  return extractArticle(entry);
}

export async function getAllCategories(preview = false) {
  const entries = await fetchGraphQL(
    `query {
      kbAppCategoryCollection(where: { slug_exists: true }) {
        items {
          slug
          name
          previewDescription
          sys {
            id
          }
          linkedFrom {
            kbAppArticleCollection {
              items {
                title
                slug
                sys {
                  id
                }
              }
            }
          }
        }
      }
    }`,
    preview
  );

  const asd = entries?.data?.kbAppCategoryCollection?.items;

  const sidebarLinks = asd
    .sort((a, b) => b.name < a.name)
    .reduce((categories, path) => {
      // const category = path.kbAppCategory?.slug ?? "unassigned";

      const category = {
        description: path.previewDescription,
        links: [],
        slug: `/${path.slug}`,
        title: path.name,
      };

      category.links = path.linkedFrom?.kbAppArticleCollection?.items.map(
        (article) => {
          return {
            slug: `/${path.slug}/${article.slug}`,
            title: article.title,
          };
        }
      );

      categories.push(category);

      return categories;
    }, []);

  // create a JSON file with sidebar links for pages that come from Contentful
  const data = JSON.stringify(sidebarLinks, null, 2);
  fs.writeFileSync("utils/contentfulSidebarLinks.json", data);
}

export async function getAllArticles(preview = false) {
  const entries = await fetchGraphQL(
    `query {
      kbAppArticleCollection(where: { slug_exists: true }) {
        items {
          slug
          sys {
            id
          }
          kbAppCategory {
            sys {
              id
            }
            name
            slug
            previewDescription
          }
        }
      }
    }`,
    preview
  );

  const articleEntries = extractArticleEntries(entries);

  if (!articleEntries) {
    throw new Error("Could not fetch any entries from Contentful");
  }

  return articleEntries;
}
