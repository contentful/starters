import React from 'react';

// const PlaygroundComponentWithNoSSR = dynamic(
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore ignore a complaint about dynamic import
//   () => import('../components/Playground/Playground'),
//   {
//     ssr: false,
//   },
// );

export default function Playground() {
  return <div>We will not provide playgroud</div>;
}
