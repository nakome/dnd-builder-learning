import React, { useContext } from 'react';

// - Controllers
import DataContext from '../controllers/dataContext';
import Uid from '../controllers/uid';

// - components
import { DndBase } from '../components/dndBase';
import { IconDragHorinzontal, IconClose, IconPlus } from '../components/icons';

// - Grid component
export default function Grid({ block, blockIndex }) {
  // --- Context
  const [blocks, setBlocks] = useContext(DataContext);

  // --- block index
  const _blk = [...blockIndex];
  const containerId = _blk[0];
  const gridId = _blk[1];

  // --- Create grid
  const handleCreate = () => {
    
    let newList = [...blocks];
    let grid = newList[containerId].children[gridId];

    // ---- push demo content
    grid.children.push({
      id: Uid(6),
      content:
        'Edit me on **click in pencil**.',
      type: 'box'
    });
    setBlocks(newList);
  };

  // --- Remove Grid
  const handleRemove = id => {
    let newList = [...blocks];
    let container = newList[containerId];
    let child = container.children.filter(item => item.id !== id);
    container.children = [...child];
    setBlocks(newList);
  };

  return (
    <div className="dnd-grid">
      <div className="dnd-opts">
        <button className="drag">
          <IconDragHorinzontal />
        </button>
        <button onClick={handleCreate}>
          <IconPlus />
        </button>
        <button onClick={() => handleRemove(block.id)}>
          <IconClose />
        </button>
      </div>
      <DndBase
        group="grid"
        block={block}
        blockIndex={blockIndex}
        setBlocks={setBlocks}
      />
    </div>
  );
}
