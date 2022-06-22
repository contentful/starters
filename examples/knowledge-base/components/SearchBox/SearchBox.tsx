import React, { useState } from "react";
import { useRouter } from "next/router";
import { Autocomplete, Text, Flex } from "@contentful/f36-components";
import { css } from "emotion";

import { ResultType } from "./types";

const styles = {
  searchResults: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "pre",
  }),
};

export const SearchBox = () => {
  const [results, setResults] = useState<ResultType[]>([]);
  const router = useRouter();

  const handleInputValueChange = async (value) => {
    if (!value.length) {
      setResults([]);
      return;
    }

    const response = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({ query: value }),
    });
    const matches = await response.json();

    setResults(matches);
  };

  const handleSelectItem = (item: ResultType) => {
    console.log(item);
    router.push(item.slug);
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
        dangerouslySetInnerHTML={{ __html: result.content }}
      />
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
      // isLoading={}
    />
  );
};
