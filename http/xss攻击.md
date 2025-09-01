XSS 攻击是 Web 攻击中最常见的攻击方法之一。
跨站脚本攻击(Cross Site Scripting)，缩写为 XSS，为了与前端 css 进行区别,因此命名为 XSS。恶意攻击者往 Web 页面里插入恶意 javaScript 代码，当用户浏览该页面的时候，嵌入 Web 里面的 javaScript 代码会被料行，从而达到恶意攻击用户的目的。

XSS 防御

① 我们自己定义转义和反转义方法

1.  核心手段:将危险的标识进行转义
    为什么转义会有效呢?
    比如:<script>====> &lt;script&gt;这时候，前端就不会认为这个是一个脚本标签，就不会执行脚本。

2.  HTTP X-XSS-Protection 响应头是 Internet Explorer，Chrome 和 Safari 的一个功能，当检测到跨站脚本攻击 XSS 时，浏览器将停止加载页面 0:禁止 XSS 过滤。 1:启用 XSS 过滤

② 前端转义库
https://npmmirror.com/package/xss

③ 后端转义
这个就是后端的事情，但是我们要清楚，并且要对应处理。
别以为是后端开发的问题，这是为了防止 xss 攻击做的转义，我们前端只需要给反转义一下。但是之前有个同事既然是这样处理的:前端直接将字符串进行了 encodeURIComponent 和 decodeURIComponent 处理，这就直接阻止了后端的转义，辜负了后端开发的一片好心。(哈哈 大家知道有个同事是指谁哈^^)
