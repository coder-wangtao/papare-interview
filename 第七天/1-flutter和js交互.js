// 你想做 Flutter 与网页（JavaScript）交互，在 webview_flutter 里是完全可以实现的。主要方式是：
//TODO:1
// 1️⃣ Flutter 调用 JS
// 你可以通过 WebViewController 的方法执行 JS：

// // 执行 JS，不返回值
// controller.runJavaScript('alert("Hello from Flutter!")');

// // 执行 JS，有返回值
// var result = await controller.runJavaScriptReturningResult('document.title');
// print('网页标题是 $result');
// 注意：

// runJavaScript → 只执行 JS，不返回结果

// runJavaScriptReturningResult → 会返回 JS 执行的结果，类型是 dynamic（通常是 String 或 JSON）

//TODO:2
// 2️⃣ JS 调用 Flutter
// 在网页里调用 Flutter，需要用 JavaScriptChannel 或 WebMessageListener（新版本 WebView）。

// 示例（用 JavaScriptChannel）：

// dart
// 复制
// 编辑
// WebViewController controller = WebViewController()
//   ..setJavaScriptMode(JavaScriptMode.unrestricted)
//   ..addJavaScriptChannel(
//     'FlutterChannel', // JS 里调用的名称
//     onMessageReceived: (message) {
//       print('JS 发送的消息：${message.message}');
//     },
//   )
//   ..loadRequest(Uri.parse('https://your-site.com'));
// 然后在网页 JS 中：

// javascript
// 复制
// 编辑
// // 调用 Flutter
// FlutterChannel.postMessage("Hello from JS!");

//TODO:3
// 3️⃣ 双向通信示例
// 假设你想 Flutter 按钮点击让网页滚动一半高度，网页滚动完毕后通知 Flutter：

// Flutter 端
// controller.addJavaScriptChannel(
//   'FlutterNotify',
//   onMessageReceived: (message) {
//     print("网页通知 Flutter: ${message.message}");
//   },
// );

// // 执行滚动 JS
// await controller.runJavaScript('''
//   let scrollHeight = document.body.scrollHeight;
//   window.scrollTo({top: scrollHeight/2, behavior: 'smooth'});
//   FlutterNotify.postMessage('滚动完成');
// ''');

// JS 端（网页里可以直接调用）
// // 任何需要通知 Flutter 的地方
// FlutterNotify.postMessage('滚动完成');
