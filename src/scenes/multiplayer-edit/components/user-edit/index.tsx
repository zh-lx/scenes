import React, { useEffect } from 'react';
import './index.less';
import ReconnectingWebSocket from 'reconnecting-websocket';
import sharedb from 'sharedb/lib/client';
import richText from 'rich-text';
import Quill from 'quill';

const socket = new ReconnectingWebSocket('ws://localhost:8080');
sharedb.types.register(richText.type);
const connection = new sharedb.Connection(socket);

interface Props {
  user: number;
}

window.disconnect = function () {
  connection.close();
};

window.connect = function () {
  const socket = new ReconnectingWebSocket('ws://localhost:8080');
  connection.bindToSocket(socket);
};

// Create local Doc instance mapped to 'examples' collection document with id 'richtext'
const doc = connection.get('examples', 'richtext');

export default function UserEdit({ user }: Props) {
  useEffect(() => {
    const editorContainer = document.createElement('div');
    editorContainer.setAttribute('id', `editor-container-${user}`);
    const userEditor = document.querySelector(`#user-editor-${user}`);
    userEditor.appendChild(editorContainer);

    doc.subscribe(function (err) {
      if (err) throw err;
      const quill = new Quill(`#editor-container-${user}`, {
        theme: 'snow',
      });

      quill.setContents(doc.data);

      quill.on('text-change', function (delta, oldDelta, source) {
        if (source !== 'user') return;
        doc.submitOp(delta, { source: quill });
      });

      doc.on('op', function (op, source) {
        if (source === quill) return;
        quill.updateContents(op);
      });
    });
  }, []);
  return (
    <div id={`user-editor-${user}`} className="user-editor">
      <div>{`用户${user}`}</div>
    </div>
  );
}
