// 从大文件中取出指定索引的一块数据（Blob）。
// 异步读取这块数据。
// 计算这一块的 MD5。
// 返回一个对象，包含：
// 当前块的索引和位置
// MD5 校验值
// 实际文件数据

import SparkMD5 from "./sparkmd5.js";
export function createChunk(file, index, chunkSize) {
  return new Promise((resolve) => {
    const start = index * chunkSize;
    const end = start + chunkSize;
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    const blob = file.slice(start, end);
    fileReader.onload = (e) => {
      spark.append(e.target.result);
      resolve({
        start,
        end,
        index,
        hash: spark.end(),
        blob,
      });
    };
    fileReader.readAsArrayBuffer(blob);
  });
}
