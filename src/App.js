import React, { Fragment, useState, useEffect } from 'react';
import { saveAs } from 'file-saver';

// - Controllers
import Uid from './controllers/uid';
// - Context
import DataContext from './controllers/dataContext';
// - Style
import './style.scss';

// - Storage
import demoContent from './storage/demo';

// - Components
import { DndMain } from './components/dndBase';
import {
  IconArrowDown,
  IconArrowTop,
  IconEye,
  IconCode,
  IconSave,
} from './components/icons';

export default function App() {

  // -- States
  const [blocks, setBlocks] = useState([]);
  const [preview, setPreview] = useState(true);

  // -- useEffect
  useEffect(() => setBlocks(demoContent), []);

  // --- Preppend container
  const handlePrepend = () => {
    let data = {
      id: Uid(6),
      content: 'item',
      type: 'container',
      children: [],
    };
    blocks.unshift(data);
    return setBlocks([...blocks]);
  };

  // --- Append container
  const handleAppend = () => {
    let data = {
      id: Uid(6),
      content: 'item',
      type: 'container',
      children: [],
    };
    return setBlocks([...blocks, data]);
  };

  // --- Preview content
  const handlePreview = () => {
    console.log(JSON.stringify(blocks));
    setPreview(!preview);
  };


  // --- Save data
  const handleSave = () => {
    let opts = { type: 'text/json;charset=utf-8' },
      jsonData = JSON.stringify(blocks, null, 2),
      blob = new Blob([jsonData], opts);
    saveAs(blob, 'dnd.json');
  };

  // --- return
  return (
    <main className={`app ${preview ? 'dnd-preview' : ''}`}>
      <DataContext.Provider value={[blocks, setBlocks]}>
        <header className="dnd-header">
          <button
            onClick={handlePreview}
            className={preview ? 'btn-preview' : ''}
            title={preview ? <span>Edit</span> : <span>Preview</span>}
          >
            {preview ? <IconEye /> : <IconCode />}
          </button>

          {!preview ? (
            <Fragment>
              <button 
                onClick={handlePrepend} 
                title="Prepend Container">
                <IconArrowTop />
              </button>
              <button 
                onClick={handleAppend} 
                title="Append Container">
                <IconArrowDown />
              </button>
            </Fragment>
          ) : (
            <button onClick={handleSave} title="Download Json">
              <IconSave />
            </button>
          )}
        </header>
        {!blocks.length ? (
          <div className="dnd-container">
            <p className="empty-content">
              <strong>Ups..</strong> the layout is empty, create a container
              first.
            </p>
          </div>
        ) : (
          <DndMain group="main" blocks={blocks} setBlocks={setBlocks} />
        )}
      </DataContext.Provider>
    </main>
  );
}
