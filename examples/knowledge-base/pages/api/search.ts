import lunr from "lunr";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

import { buildSearchIndex } from "../../lib/search";
import { getSingleArticleBySlug } from "../../lib/api";

const truncateContent = async (found: lunr.Index.Result) => {
  const key = Object.keys(found.matchData?.metadata).find((key) => {
    return found.matchData.metadata[key].content?.position;
  });

  const articleSlug = found.ref;
  const contentfulResult = await getSingleArticleBySlug(articleSlug);
  const text = documentToPlainTextString(contentfulResult.body.json);

  if (!key) return text;

  const [index, length] = found.matchData.metadata[key].content.position[0];
  const startIndex = Math.max(0, index - 15);
  const truncatedContent = text.slice(startIndex, startIndex + length + 50);
  let content = truncatedContent;

  if (startIndex + length + 50 < text.length) {
    content = `${content}…`;
  }

  if (startIndex > 0) {
    content = `…${content}`;
  }

  return {
    content,
    title: contentfulResult.title,
    slug: `/${contentfulResult.kbAppCategory.slug}/${contentfulResult.slug}`,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = JSON.parse(req.body);
  let indexToLoad: lunr.Index | undefined = undefined;
  let indexFile =
    process.env.NODE_ENV === "development"
      ? path.resolve(process.cwd(), "public/json/searchIndex.json")
      : path.resolve(process.cwd(), "json/searchIndex.json");

  console.log({ indexFile });

  try {
    const serializedIndex = await fs.readFile(indexFile, "utf-8");
    indexToLoad = JSON.parse(serializedIndex) as lunr.Index;
  } catch (error) {
    console.log({ error });

    // Recreate index for local development
    if (process.env.NODE_ENV === "development") {
      indexToLoad = await buildSearchIndex();
      const serializedIndex = JSON.stringify(indexToLoad);

      await fs.writeFile(indexFile, serializedIndex, "utf-8");
    }
  }

  console.log({ indexToLoad });

  if (!indexToLoad) {
    throw new Error("Failed to load search index file");
  }

  const index = lunr.Index.load(indexToLoad);
  const found = index.search(`${query}*`);
  let matches: any[] = [];

  for (const result of found) {
    const match = await truncateContent(result);
    matches = [...matches, match];
  }

  res.status(200).json(matches);
}
