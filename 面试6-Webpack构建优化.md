1.要简述webpack的打包流程

2.在 webpack 中有一个插件 speed-measure-webpack-plugin，我就是通过这个插件去查看的构建时间，它会出一份报告，包含总体构建时间、各阶段的耗时、插件耗时、loader 耗时，这样我就能非常清楚究竟是哪些地方耗时。
通过插件的分析结果来看，我发现 Babel 在编译 JS 时特别耗时，还有就是一些 loader，比如处理 CSS 的 css-loader，在解析和处理过程中也挺耗时的。因此我考虑的主要优化方案有：
2.1用 swc 替换 babel 进行编译工作
swc 是一个用 rust 写的 JS/TS 编译器，因为基于 rust，所以编译速度非常快，而且 swc 能够兼容大多数 babel 插件和配置，因此迁移起来没有太高的成本。
2.2thread-loader 解决 loader 解析耗时问题
thread-loader 可以通过多线程并行处理 loader 操作，这样就减少了主线程的负载。

3.利用 webpack5 的持久化缓存技术

```js
 cache: {
    type: 'filesystem', // 使用文件系统进行缓存
    cacheDirectory: path.resolve(__dirname, '.webpack_cache'), // 缓存目录
    buildDependencies: {
      config: [__filename], // 当配置文件改变时，重新构建缓存
    },
    name: 'my-cache', // 缓存名称
    version: '1.0', // 缓存版本
  },
```

4.开发环境去掉 hash

5.更新老旧插件
terser-webpack-plugin
发现从 5.2.0 版本开始引入了 swc 压缩器，我就估摸着性能上面能有大幅的提升，于是我就对这个插件进行了版本升级，不出所料，压缩的时间再一次得到了优化，到了目前的 10s 左右。
