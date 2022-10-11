import React from 'react';
import { ReactSortable } from 'react-sortablejs';

// - Components
import BlockWrapper from './dndBlockWrapper';

// - Default options sortable
const defaultOpts = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'ghost',
  handle: '.drag'
};


export function DndBase({ 
  group, 
  block, 
  blockIndex, 
  setBlocks 
}) {

  const renderSetList = (currentList) => {
    setBlocks(sourceList => {
      const tempList = [...sourceList];
      const _blockIndex = [...blockIndex];
      const lastIndex = _blockIndex.pop();
      const lastArr = _blockIndex.reduce(
        (arr, i) => arr[i]['children'],
        tempList
      );
      lastArr[lastIndex]['children'] = currentList;
      return tempList;
    });
  }

  const renderItemList = block.children.map((childBlock, index) => {
    return (
      <BlockWrapper
        key={childBlock.id}
        block={childBlock}
        blockIndex={[...blockIndex, index]}
        setBlocks={setBlocks}
      />
    );
  });

  if(block.children.length) {
    return <ReactSortable
        key={block.id}
        list={block.children}
        setList={renderSetList}
        group={group}
        {...defaultOpts}>
          {renderItemList}
      </ReactSortable>
  }else{
    return block.type === 'grid' ? (
      <p className="empty-content">
        Grid is empty, create  <strong>editable content</strong> on click in +
      </p>
    ) : (
      <p className="empty-content">
        Container is empty, create  <strong>Grid</strong> on click in +
      </p>
    );
  }
}



export function DndMain({ group, blocks, setBlocks }) {
  return (
    <ReactSortable
      list={blocks}
      setList={setBlocks}
      group={group}
      {...defaultOpts}
    >
      {blocks &&
        blocks.map((block, blockIndex) => (
          <BlockWrapper
            key={block.id}
            block={block}
            blockIndex={[blockIndex]}
            setBlocks={setBlocks}
          />
        ))}
    </ReactSortable>
  );
}
