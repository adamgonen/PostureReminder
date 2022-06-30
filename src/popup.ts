let enabled: boolean;
const button = document.getElementById("toggle") as HTMLInputElement;
const select = document.getElementById("time") as HTMLOptionElement;

chrome.storage.sync.get(null, (items) => {
  if (items.enabled === null) {
    chrome.storage.sync.set({ enabled: "false" });
  } else {
    enabled = items.enabled;
  }
  button.checked = enabled;

  if (items.time === null) {
    chrome.storage.sync.set({ time: "60" });
  }
});

button.addEventListener("click", () => {
  enabled = button.checked;
  chrome.storage.sync.set({ enabled: enabled }, () => {
    console.log(chrome.runtime.lastError);
  });
});

chrome.storage.sync.get("time", (items) => {
  if (items.time) {
    selectElement("time", items.time);
  }
});

select.addEventListener("change", () => {
  chrome.storage.sync.set({ time: select.value });
});

function selectElement(id: string, valueToSelect: string) {
  const element = document.getElementById(id) as HTMLInputElement;
  element.value = valueToSelect;
}
