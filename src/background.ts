let currentNotification: number;

window.addEventListener("storage", () => {
  makeOrDeleteNotification();
});

const makeNotification = () => {
  chrome.notifications.create(
    {
      type: "basic",
      iconUrl: "icons/icon128.png",
      title: "Posture Reminder",
      message: "Correct your posture!",
    },
    () => {
      makeOrDeleteNotification();
    }
  );
};

const getRandomTime = (): number => {
  return Math.floor(Math.random() * 240) + 30;
};

const makeOrDeleteNotification = () => {
  if (window.localStorage.getItem("enabled") === "true") {
    let time = window.localStorage.getItem("time") as string;
    if (time === "1000") {
      time = getRandomTime().toString();
    }
    if (currentNotification) {
      window.clearTimeout(currentNotification);
    }
    currentNotification = window.setTimeout(
      makeNotification,
      parseInt(time) * 1000
    );
  } else {
    window.clearTimeout(currentNotification);
  }
};
