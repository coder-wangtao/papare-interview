前端：
点击上传文件 => 获取当前文件 => 先从后端获取当前文件已上传的切片列表 => 实例化 WebWorker => 将文件切片工作交给 web worker 来完成(worker.postMessage)
=> web worker 利用 file.slice 做切片 => 接收 worker 发回的切片（持续发送，worker 每完成一个切片就发一个） => 将切片做保存 allFileChunks.push(file) => 并发上传文件切片，并发数 MAX_CONCURRENCY_NUM = 6，超过 MAX_CONCURRENCY_NUM 函数就 return 掉

后端：
保存所有的文件 chunks

接口 1：获取指定文件的切片列表，即获取该文件已上传的切片，用于断点续传
接口 2：上传接口，接受文件切片，并存储。当接收完了所有的 chunk， 合并临时 chunk 文件形成整个文件 并将 chunk 删除
