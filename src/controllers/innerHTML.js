import React, { useRef, useEffect } from 'react';
import marked from 'marked';
import sanitizeHtml from 'sanitize-html';
import shortcode from 'shortcode-parser';
import './shortcodes.js';

// convert tasks with checkbox
const renderer = {
  listitem(text, task) {
    if (task) {
      return `<li class="task"><label>${text.replace(
        /^<li>([\s\S]*)<\/li>\n$/,
        '$1'
      )}</label></li>`;
    } else {
      return `<li>${text}</li>`;
    }
  }
};

marked.use({ renderer });

// sanitize options
const opts = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    'img',
    'iframe',
    'input', // checkbox
    'details',
    'summary'
  ]),
  allowedAttributes: {
    header: ['class'],
    section: ['class'],
    h1: ['class'],
    p: ['class'],
    div: ['class','style'],
    span: ['style'],
    img: ['src', 'alt', 'title'],
    a: ['href', 'title'],
    li: ['class'],
    input: ['type', 'checked', 'disabled'],
    iframe: [
      'src',
      'class',
      {
        name: 'sandbox',
        multiple: true,
        values: ['allow-popups', 'allow-same-origin', 'allow-scripts']
      }
    ]
  }
};

export default function InnerHTML(props) {
  const { html, ...rest } = props;
  const divRef = useRef(null);

  useEffect(() => {
    if (!html) return;
    // sanitize and render Markdown
    const output = shortcode.parse(html);
    const md = marked(output);
    const sanitized = sanitizeHtml(md, opts);
    const slotHtml = document.createRange().createContextualFragment(sanitized);
    divRef.current.innerHTML = ''; // Clear the container
    divRef.current.appendChild(slotHtml); // Append the new content
  }, [html]);

  return <div {...rest} ref={divRef} />;
}
