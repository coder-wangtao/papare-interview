// 同源策略是由浏览器执行的一种安全机制，它规定了来自同一源（即协议、域名和端口都相同）的文档或脚本可以与彼此交互。
// 这里的“源”由三个部分组成：协议（如 HTTP 或 HTTPS）、主机名（例如 example.com）和端口号（默认情况下 HTTP 是 80，HTTPS 是 443）。
// 如果这三个组成部分中有任何一个不匹配，就认为这两个 URL 属于不同的源。
// TODO:1.cors
// 1.1 简单请求
// 简单请求是指满足特定条件的 HTTP 请求，这些请求不需要进行预检。简单请求的条件包括：
// 条件：
// 方法（HTTP Method） 必须是：
// GET
// POST
// HEAD
// 请求头（Request Headers） 必须是以下几种常见的标准头部（允许浏览器自动添加）：
// Accept
// Accept-Language
// Content-Language
// Content-Type（但是只允许 application/x-www-form-urlencoded, multipart/form-data, 或 text/plain）
// 没有自定义的请求头：除非是上述标准请求头，不能包含自定义的请求头，比如 X-Custom-Header，否则该请求就不是简单请求。
fetch("https://example.com/data", {
  method: "GET", // 简单请求只允许 GET, POST, HEAD
  headers: {
    Accept: "application/json", // 标准请求头
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data));
// 对于这种请求，浏览器会直接发送请求，不需要进行 预检请求，如果服务器支持 CORS，
// 并且设置了正确的 CORS 头部（例如 Access-Control-Allow-Origin），则可以跨域成功。
// 1.2. 预检请求（Preflight Request）
// 预检请求 是一种在实际跨域请求发送之前由浏览器自动发送的 OPTIONS 请求，用于确定服务器是否允许特定的跨域请求。预检请求发生在以下几种情况：
// 触发预检请求的条件：
// HTTP 方法 不是 GET、POST 或 HEAD（例如，PUT、DELETE、PATCH 等）。
// 请求头 中包含了自定义头部（如 X-Custom-Header）或不符合简单请求的条件。
// Content-Type 不是 application/x-www-form-urlencoded、multipart/form-data 或 text/plain。
// 预检请求的步骤：
// 浏览器首先会发送一个 OPTIONS 请求，以询问服务器是否允许跨域请求。
// 服务器需要在响应中返回一个允许跨域的 CORS 响应头部（如 Access-Control-Allow-Origin、Access-Control-Allow-Methods 和 Access-Control-Allow-Headers）。
// 如果服务器回应正确，浏览器会发送实际的请求；如果没有响应正确，浏览器就会阻止实际请求。
fetch("https://example.com/data", {
  method: "POST", // 使用 POST 方法，会触发预检请求
  headers: {
    "Content-Type": "application/json", // 不属于简单请求的 Content-Type
    "X-Custom-Header": "value", // 自定义请求头，也会触发预检请求
  },
  body: JSON.stringify({ name: "Alice" }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
// 服务器响应预检请求时，必须包含以下头部来明确允许跨域访问：
// Access-Control-Allow-Origin: 允许的跨域源（如 * 或 https://example.com）
// Access-Control-Allow-Methods: 允许的 HTTP 方法（如 GET, POST, PUT, DELETE 等）
// Access-Control-Allow-Headers: 允许的请求头（如 Content-Type, X-Custom-Header 等）
// 如果这些头部未返回，浏览器会阻止实际的跨域请求。
// TODO:2.jsonp
// 由于 <script> 标签的 src 属性可以加载不同源的资源，因此 JSONP 会将请求发送到其他域的服务器，且响应的数据会被包装成一个回调函数，从而实现跨域通信。
// 定义回调函数
function handleData(data) {
  console.log("Received data: ", data);
  // 这里你可以处理返回的数据，比如更新页面内容
  document.body.innerHTML += `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}
// 创建一个script标签来发起JSONP请求
var script = document.createElement("script");
script.src = "https://api.example.com/data?callback=handleData";
document.body.appendChild(script);
// 例如，服务器返回的数据如下：
handleData({
  name: "Alice",
  age: 25,
});
// 这样，客户端会收到一个带有回调的响应：
handleData({
  name: "Alice",
  age: 25,
});
// 当这个响应通过 <script> 标签加载后，客户端的 handleData 函数就会被调用，数据就会作为参数传入并处理。
// TODO:3.代理
// 客户端发起跨域请求，目标地址是另一个域名（跨域）。
// 客户端的请求被发送到 代理服务器，而不是直接发送到目标服务器。
// 代理服务器向目标服务器发起请求，获取数据。
// 代理服务器将从目标服务器获取的数据返回给客户端。
// 客户端接收到数据，并进行处理。
// 1.使用 Node.js + Express 设置代理服务器
// 2.使用 Nginx 设置代理
