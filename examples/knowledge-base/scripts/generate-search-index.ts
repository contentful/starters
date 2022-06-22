import fs from "node:fs/promises";

import { buildSearchIndex } from "../lib/search";

async function run() {
  const index = await buildSearchIndex();
  const serializedIndex = JSON.stringify(index);

  await fs.writeFile("searchIndex.json", serializedIndex, {
    encoding: "utf-8",
  });
}

run();
