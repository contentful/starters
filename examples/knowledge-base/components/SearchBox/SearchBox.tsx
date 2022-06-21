import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Autocomplete, Text, Flex } from "@contentful/f36-components";
import lunr from "lunr";
import { css } from "emotion";
import { ResultType } from "./types";

const styles = {
  searchResults: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "pre",
  }),
};

const truncateContent = (found, page) => {
  if (!found || !page) return page;

  const key = Object.keys(found?.matchData?.metadata).find((key) => {
    console.log(found.matchData.metadata[key]);
    return found.matchData.metadata[key].content?.position;
  });

  if (!key) return page;

  const [index] = found.matchData.metadata[key].content.position[0];
  const startIndex = Math.max(0, index - 15);
  const truncatedContent = page.content.substring(startIndex, 50);

  return {
    ...page,
    content: startIndex > 0 ? `…${truncatedContent}` : truncatedContent,
  };
};

export const SearchBox = () => {
  const [results, setResults] = useState<ResultType[]>([]);
  const [searchIndex, setSearchIndex] = useState<lunr.Index | undefined>();
  const router = useRouter();

  useEffect(() => {
    async function fetchSearchIndex() {
      const response = await fetch("/api/search");
      const data = await response.json();
      const index = lunr.Index.load(data);

      setSearchIndex(index);
    }

    fetchSearchIndex();
  }, []);

  const handleInputValueChange = (value) => {
    if (!value.length || !searchIndex) {
      setResults([]);
      return;
    }
    const found = searchIndex.search(value);
    const matches = found
      .map((f) => pages.find((page) => page.url === f.ref))
      .map((page, index) => truncateContent(found[index], page));

    setResults(matches);
  };

  const handleSelectItem = (item: ResultType) => {
    router.push(item.url);
  };

  const renderResult = (result: ResultType) => (
    <Flex flexDirection="column">
      <Text
        fontSize="fontSizeM"
        lineHeight="lineHeightM"
        fontWeight="fontWeightDemiBold"
        className={styles.searchResults}
      >
        {result.title}
      </Text>
      <Text
        fontSize="fontSizeS"
        lineHeight="lineHeightS"
        className={styles.searchResults}
      >
        {result.content}
      </Text>
    </Flex>
  );

  return (
    <Autocomplete
      onSelectItem={handleSelectItem}
      items={results}
      itemToString={(item: ResultType) => item.title}
      onInputValueChange={handleInputValueChange}
      renderItem={renderResult}
      listWidth="full"
    />
  );
};
