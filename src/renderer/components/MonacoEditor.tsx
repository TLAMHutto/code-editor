// src/renderer/MonacoEditor.tsx
import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

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

  return <div ref={containerRef} style={{ height: '500px' }} />;
};

export default MonacoEditor;
