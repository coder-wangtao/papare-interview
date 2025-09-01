// SessionStorage,LocalStorage,Cookie这三者都可以被用来在浏览器端存储数据，而且都是字符串类型的键值对。
// 相同点
// 都存储在客户端

// 不同点
// 1.存储大小:
// cookie数据大小不能超过4k。
// sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。
// 2.有效时间:
// cookie: 设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭;
// localStorage: 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据;
// sessionStorage:数据在当前浏览器窗口关闭后自动删除。
// 3.数据与服务器之间的交互方式:
// cookie的数据会自动的传递到服务器，服务器端也可以写cookie到客户端;客户端也可以使用document.cookie来操作cookie;
// sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存;
// 4.使用上
// cookie一般是后端在浏览器种cookie,后面所有的请求都会携带这个cookie
// localstorage和sessionStorage主要提供前端在浏览器存储数据