import { resolve } from 'path';
import { Uri, Webview } from 'vscode';

import blosc from 'h5wasm-plugins/plugins/libH5Zblosc.so';
import bz2 from 'h5wasm-plugins/plugins/libH5Zbz2.so';
import lz4 from 'h5wasm-plugins/plugins/libH5Zlz4.so';
import lzf from 'h5wasm-plugins/plugins/libH5Zlzf.so';
import szf from 'h5wasm-plugins/plugins/libH5Zszf.so';
import zfp from 'h5wasm-plugins/plugins/libH5Zzfp.so';
import zstd from 'h5wasm-plugins/plugins/libH5Zzstd.so';

function getPluginUri(webview: Webview, plugin: string) {
  const absPath = resolve(__dirname, '../out', plugin);
  return webview.asWebviewUri(Uri.file(absPath)).toString();
}

export function getSupportedPlugins(webview: Webview): Record<string, string> {
  return {
    blosc: getPluginUri(webview, blosc),
    bz2: getPluginUri(webview, bz2),
    lz4: getPluginUri(webview, lz4),
    lzf: getPluginUri(webview, lzf),
    szf: getPluginUri(webview, szf),
    zfp: getPluginUri(webview, zfp),
    zstd: getPluginUri(webview, zstd),
  };
}
