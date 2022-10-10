import React, { useContext, useState } from 'react';

// - Controllers
import DataContext from '../controllers/dataContext';
import InnerHTML from '../controllers/innerHTML';

// - Components
import {
  IconDragHorinzontal,
  IconClose,
  IconPencil
} from '../components/icons';

// - Box component
export default function Box({ block, blockIndex }) {
  // --- Context
  const [blocks, setBlocks] = useContext(DataContext);
  const [editable, setEditable] = useState(false);

  // ---- Get block index
  const _blk = [...blockIndex];
  const containerId = _blk[0];
  const gridId = _blk[1];
  const boxId = _blk[2];

  // --- Remove Grid
  const handleRemove = id => {
    let newList = [...blocks],
      child = newList[containerId].children[gridId],
      removeElement = child.children.filter(item => item.id !== id);
    // copy
    child.children = [...removeElement];
    setBlocks(newList);
  };
  // --- Update content
  const handleUpdate = e => {
    let newList = [...blocks],
      grid = newList[containerId].children[gridId],
      box = grid.children[boxId];
    box.content = e.target.value;
    setBlocks(newList);
  };

  // --- Edit
  const toogleEditable = () => {
    setEditable(!editable);
  };

  return (
    <div className="dnd-box">
      <div className="dnd-opts">
        <button className="drag">
          <IconDragHorinzontal />
        </button>
        <button onClick={toogleEditable}>
          <IconPencil width="11" viewBox="0 0 16 15" />
        </button>
        <button onClick={() => handleRemove(block.id)}>
          <IconClose />
        </button>
      </div>
      
      {editable ? (
        <textarea onChange={handleUpdate} name={block.id} value={block.content}>
          {block.content}
        </textarea>
      ) : (
        <InnerHTML html={block.content} />
      )}
    </div>
  );
}
