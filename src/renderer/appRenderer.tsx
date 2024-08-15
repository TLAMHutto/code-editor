import React from 'react';
import { createRoot } from 'react-dom/client';
import WindowFrame from '@renderer/window/WindowFrame';
import Application from '@components/Application';
import MonacoEditor from '@components/MonacoEditor'
// Say something
console.log('[ERWT] : Renderer execution started');

// Application to Render
const app = (
  <WindowFrame title='ERWT Boilerplate' platform='windows'>
    <Application />
    <MonacoEditor value="console.log('Hello World');" language="javascript" />
  </WindowFrame>
);

// Render application in DOM
createRoot(document.getElementById('app')).render(app);
