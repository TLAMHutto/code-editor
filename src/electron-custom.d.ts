import { IPCMainInvokeEvent } from 'electron';

declare global {
  interface Window {
    electron: {
      createNewFile: (fileName: string) => Promise<string>;
      // Add other exposed methods as needed
    };
  }
}

// This file needs to be a module for TypeScript to recognize it
export {};
