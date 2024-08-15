// src/renderer/MonacoEditor.tsx
import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import LeftSidebar from './components/LeftSidebar';
import '../../components/monaco/styles/editor.scss'; // Import the SCSS file

interface MonacoEditorProps {
  value: string;
  language?: string;
  onChange?: (value: string) => void;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ value, language = 'javascript', onChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      editorRef.current = monaco.editor.create(containerRef.current, {
        value,
        language,
        minimap: { enabled: false}
      });

      editorRef.current.onDidChangeModelContent(() => {
        const newValue = editorRef.current?.getValue();
        if (onChange && newValue) {
          onChange(newValue);
        }
      });

      return () => editorRef.current?.dispose();
    }
  }, [containerRef, language, value, onChange]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.layout(); // Ensure the editor layout is updated
    }
  }, [containerRef.current?.clientWidth, containerRef.current?.clientHeight]);

  return (
    <div className="container">
      <LeftSidebar /> {/* Include the LeftSidebar component */}
      <div className="editor-container">
        <div ref={containerRef} className="monaco-editor-container" />
      </div>
    </div>
  );
};

export default MonacoEditor;
