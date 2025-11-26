function concurrencyTask(tasks, concurrencyCount = 2) {
  return new Promise((resolve) => {
    if (tasks.length === 0) {
      resolve();
      return;
    }
    let nextIndex = 0;
    let finishCount = 0;
    function _run() {
      const task = tasks[nextIndex];
    }
  });
}
