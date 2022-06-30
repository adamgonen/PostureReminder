import Alarm = chrome.alarms.Alarm;

const ALARM_NAME = "PostureReminderAlarm";

const makeNotification = (alarm: Alarm) => {
  if (alarm.name !== ALARM_NAME) {
    return;
  }
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icons/icon128.png",
    title: "Posture Reminder",
    message: "Correct your posture!",
  });
};

const updateAlarm = async () => {
  await chrome.alarms.clear(ALARM_NAME);
  chrome.alarms.onAlarm.removeListener((alarm) => makeNotification(alarm));
  chrome.storage.sync.get(null, (items) => {
    if (items.enabled) {
      let time: string = items.time;
      if (time === "1000") {
        time = getRandomTime().toString();
      }
      chrome.alarms.create(ALARM_NAME, {
        periodInMinutes: parseInt(time),
      });
      chrome.alarms.onAlarm.addListener((alarm) => makeNotification(alarm));
    }
  });
};

updateAlarm();

chrome.storage.onChanged.addListener(async () => {
  await updateAlarm();
});

const getRandomTime = (): number => {
  return Math.floor(Math.random() * 240) + 30;
};
