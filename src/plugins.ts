import blosc from 'h5wasm-plugins/plugins/libH5Zblosc.so';
import bz2 from 'h5wasm-plugins/plugins/libH5Zbz2.so';
import lz4 from 'h5wasm-plugins/plugins/libH5Zlz4.so';
import lzf from 'h5wasm-plugins/plugins/libH5Zlzf.so';
import szf from 'h5wasm-plugins/plugins/libH5Zszf.so';
import zfp from 'h5wasm-plugins/plugins/libH5Zzfp.so';
import zstd from 'h5wasm-plugins/plugins/libH5Zzstd.so';

export const PLUGINS = { blosc, bz2, lz4, lzf, szf, zfp, zstd };
