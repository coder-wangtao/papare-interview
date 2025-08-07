/**
 *
 * @param {string[]} urls 待请求的的url地址
 * @param {number} maxNum 最大并发数
 */
// ['1111','22222','3333','55555']  2
function concurRequest(urls, maxNum) {
  if (urls.length === 0) {
    return Promise.resolve([]);
  }

  return new Promise((resolve) => {
    const result = [];
    let nextIndex = 0;
    let finishCount = 0;
    async function _request() {
      if (nextIndex >= urls.length) {
        return;
      }
      const i = nextIndex;
      const url = urls[nextIndex++];
      const resp = await fetch(url);
      result[i] = resp;
      finishCount++;
      if (finishCount === url.length) {
        resolve(result);
        return;
      }
      _request();
    }
    for (let i = 0; i < Math.min(maxNum, urls.length); i++) {
      _request();
    }
  });
}
