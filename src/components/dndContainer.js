import React, { useContext } from 'react';

// - Controllers
import DataContext from '../controllers/dataContext';
import Uid from '../controllers/uid';

// - Components
import { DndBase } from './dndBase';
import { IconDragHorinzontal, IconClose, IconPlus } from './icons';

// - Container component
export default function Container({ block, blockIndex }) {
  // --- Context
  const [blocks, setBlocks] = useContext(DataContext);

  // --- Create new container
  const handleCreate = () => {
    const uid = blocks.findIndex(item => item.id === block.id);
    let newList = [...blocks];
    // update by uid
    newList[uid].children.push({
      id: Uid(6),
      type: 'grid',
      children: []
    });
    setBlocks(newList);
  };

  // --- Remove container
  const handleRemove = id => {
    const newList = blocks.filter(item => item.id !== id);
    setBlocks(newList);
  };

  return (
    <div className="dnd-container">
      <div className="dnd-opts">
        <button className="drag">
          <IconDragHorinzontal />
        </button>
        <button 
          onClick={handleCreate}>
          <IconPlus />
        </button>
        <button 
          onClick={() => handleRemove(block.id)}>
          <IconClose />
        </button>
      </div>
      <DndBase
        group="container"
        block={block}
        blockIndex={blockIndex}
        setBlocks={setBlocks}
      />
    </div>
  );
}
