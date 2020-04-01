let currentNotification;

window.addEventListener('storage', () => {
  makeOrDeleteNotification()
});

function makeNotification() {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: 'Don\'t forget!',
    message: 'Correct Posture!'
  }, (notificationId) => {
    makeOrDeleteNotification()
  });
}

function getRandomTime() {
  return Math.floor(Math.random() * 240) + 30
}

function makeOrDeleteNotification() {
  if(window.localStorage.getItem('enabled') === 'true') {
    let time = window.localStorage.getItem('time');
    if(time === '1000') {
      time = getRandomTime();
    }
    currentNotification = setTimeout(makeNotification, time * 1000 * 60);
  } else {
    clearTimeout(currentNotification);
  }
}