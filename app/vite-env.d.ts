/// <reference types="vite/client" />

interface VsCodeApi {
  postMessage(message: any): void;
}

declare function acquireVsCodeApi(): VsCodeApi;
