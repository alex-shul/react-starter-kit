import { isServer } from "../server/index";

export const iOS = (ctx) => {
  const iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod',
  ];

  if (isServer) {
    if (ctx && ctx.headers && ctx.headers['user-agent']) {
      const re = iDevices.join('|');
      return new RegExp(re).test(ctx.headers['user-agent']);
    } else {
      console.error(`iOS(): Context (ctx) not given or is corrupted. (ctx.headers['user-agent'] failed).`);
    }
  } else {
    if (navigator.platform) {
      while (iDevices.length) {
        if (navigator.platform === iDevices.pop()) {
          return true;
        }
      }
    }
  }

  return false;
};
