var interval;

onmessage = (e) => {
  switch (e.data) {
    case "start":
      interval = setInterval(() => postMessage(0), 1000);
      break;
    case "stop":
      clearInterval(interval);
      break;
    default:
      break;
  }
};
