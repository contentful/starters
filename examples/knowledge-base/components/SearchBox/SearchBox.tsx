import React, { useState } from "react";
import { useRouter } from 'next/router';
import { Autocomplete, Text, Flex } from "@contentful/f36-components";
import lunr from 'lunr';
import { css } from "emotion";
import { ResultType } from "./types";

const pages: ResultType[] = [{
  url: 'http://localhost:3000',
  title: 'Title',
  content: 'Build and extend Contentful products.'
},{
  url: 'http://localhost:3000#1',
  title: 'Title 2',
  content: 'Some content to show up for title 2'
},{
  url: 'http://localhost:3000#2',
  title: 'Title 3',
  content: 'Another different content for title 3 page'
}];

const styles = {
  searchResults: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "pre",
  }),
};

const truncateContent = (found, page) => {
  if(!found || !page) return page;
  const key = Object.keys(found?.matchData?.metadata).find(key => {
    return found.matchData.metadata[key].content?.position
  });
  if(!key) return page;
  const [index] = found.matchData.metadata[key].content.position[0];
  const startIndex = Math.max(0, index - 15)
  const truncatedContent = page.content.substring(startIndex, 50);
  return {
    ...page,
    content: startIndex > 0 ? `…${truncatedContent}` : truncatedContent,
  }
}

export const SearchBox = () => {
  const [results, setResults] = useState<ResultType[]>([]);
  const router = useRouter();

  const idx = lunr(function(builder) {
    builder.ref('url');
    builder.field('title');
    builder.field('content');
    builder.metadataWhitelist = ['position']

    pages.forEach(page => {
      builder.add(page);
    })
  });

  const handleInputValueChange = (value) => {
    if(!value.length) {
      setResults([]);
      return;
    }
    const found = idx.search(value);
    const matches = found
      .map(f => pages.find(page => page.url === f.ref))
      .map((page, index) => truncateContent(found[index], page))

    setResults(matches);
  };

  const handleSelectItem = (item: ResultType) => {
    router.push(item.url);
  }

  const renderResult = (result: ResultType) => (
    <Flex flexDirection="column">
      <Text fontSize="fontSizeM" lineHeight="lineHeightM" fontWeight="fontWeightDemiBold" className={styles.searchResults}>
        {result.title}
      </Text>
      <Text fontSize="fontSizeS" lineHeight="lineHeightS" className={styles.searchResults}>
        {result.content}
      </Text>
    </Flex>
  )

  return (
    <Autocomplete
      onSelectItem={handleSelectItem}
      items={results}
      itemToString={(item: ResultType) => item.title}
      onInputValueChange={handleInputValueChange}
      renderItem={renderResult}
      listWidth="full"
    />
  )
}
