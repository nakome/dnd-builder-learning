import React, { useRef, useEffect } from 'react';
import marked from 'marked';

export default function InnerHTML(props) {
  const { html, ...rest } = props;
  const divRef = useRef(null);

  useEffect(() => {
    if (!html) { 
      return;
    }    
    divRef.current.innerHTML = '';
    divRef.current.innerHTML = marked(html);
  }, [html]);

  return <div {...rest} ref={divRef} />;
}
