let enabled = false; //disabled by default
const button = document.getElementById('toggle');
const select = document.getElementById('time');

// if local storage not set -> set it (for install + local storage cleared)
if (localStorage.getItem("enabled") === null) {
  localStorage['enabled'] = 'false';
  enabled = false
}
if (localStorage.getItem("time") === null) {
  localStorage['time'] = '60';
}

enabled = JSON.parse(localStorage['enabled']);
button.checked = enabled;

button.onclick = () => {
  enabled = !enabled;
  localStorage['enabled'] = enabled;
};

if(!!localStorage['time']) {
  selectElement('time', localStorage['time']);
}

select.addEventListener('change', () => {
  localStorage['time'] = select.value
});

function selectElement(id, valueToSelect) {
  let element = document.getElementById(id);
  element.value = valueToSelect;
}