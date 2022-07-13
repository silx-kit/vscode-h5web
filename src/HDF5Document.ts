import { CustomDocument, Uri } from 'vscode';

export default class HDF5Document implements CustomDocument {
  constructor(public uri: Uri, public buffer: ArrayBuffer) {}

  dispose(): void {
    throw new Error('Method not implemented.');
  }
}
