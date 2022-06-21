import type { NextApiRequest, NextApiResponse } from "next";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import lunr from "lunr";

import { getAllArticles, getSingleArticleBySlug } from "../../lib/api";

interface Document {
  content: string;
  title: string;
  url: string;
}

function createIndex(documents: Document[]) {
  return new Promise<lunr.Index>(function (resolve, reject) {
    try {
      const index = lunr(function () {
        this.ref("title");
        this.field("content");
        this.field("url");

        documents.forEach((doc) => {
          this.add(doc);
        }, this);
      });

      resolve(index);
    } catch (error) {
      reject(error);
    }
  });
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const allArticles = await getAllArticles();
  let documents: Document[] = [];

  for (const article of allArticles) {
    const contentfulResult = await getSingleArticleBySlug(article.slug);
    const text = documentToPlainTextString(contentfulResult.body.json);

    documents = [
      ...documents,
      {
        title: article.title,
        content: text,
        url: `/${article.kbAppCategory.slug}/${article.slug}`,
      },
    ];
  }

  const index = await createIndex(documents);

  res.status(200).send(index.toJSON());
}
