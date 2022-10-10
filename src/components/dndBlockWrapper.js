import React from 'react';

// - Components
import Container from './dndContainer';
import Grid from './dndGrid';
import Box from './dndBox';

// - BlockWrapper component
export default function BlockWrapper({ block, blockIndex, setBlocks }) {
  if (!block) return null;
  switch (block.type) {
    case 'container':
      return (
        <Container
          block={block}
          setBlocks={setBlocks}
          blockIndex={blockIndex}
        />
      );
    case 'grid':
      return (
        <Grid block={block} setBlocks={setBlocks} blockIndex={blockIndex} />
      );
    default:
      return (
        <Box block={block} setBlocks={setBlocks} blockIndex={blockIndex} />
      );
  }
}
