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
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleInputValueChange = async (value) => {
    setQuery(value);
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
    router.push(item.slug);
  };

  const renderResult = (result: ResultType) => {
    const getContent = (content: string) => {
      const queryRegexp = new RegExp(query, 'i');
      const startIndex = content.search(queryRegexp);
      return [
        content.slice(0, startIndex),
        <b>{content.slice(startIndex, startIndex+query.length)}</b>,
        content.slice(startIndex + query.length),
      ]
    }


    return (
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
          {getContent(result.content)}
        </Text>
      </Flex>
    )};

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
