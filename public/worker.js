var interval;

onmessage = (e) => {
  switch (e.data) {
    case "start":
      // interval = setInterval(() => postMessage(0), 1000);
      interval = accurateInterval(() => postMessage(0), 1000, {
        inmediate: true,
      });
      break;
    case "stop":
      // clearInterval(interval);
      interval.clear();
      break;
    default:
      break;
  }
};

function accurateInterval(func, interval, opts) {
  if (!opts) opts = {};

  var clear, nextAt, timeout, wrapper, now;

  now = new Date().getTime();

  nextAt = now;

  if (opts.aligned) {
    nextAt += interval - (now % interval);
  }
  if (!opts.immediate) {
    nextAt += interval;
  }

  timeout = null;

  wrapper = function wrapper() {
    var scheduledTime = nextAt;
    nextAt += interval;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    func(scheduledTime);
  };

  clear = function clear() {
    return clearTimeout(timeout);
  };

  timeout = setTimeout(wrapper, nextAt - new Date().getTime());

  return {
    clear: clear,
  };
}
