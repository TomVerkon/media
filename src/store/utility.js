// Dev Only
export const pause = () => {
  return new Promise((resolve) => {
    console.log(process.env.REACT_APP_PAUSE_DURATION);
    setTimeout(resolve, process.env.REACT_APP_PAUSE_DURATION);
  });
};

