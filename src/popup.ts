let enabled: boolean;
const button = document.getElementById("toggle") as HTMLInputElement;
const select = document.getElementById("time") as HTMLOptionElement;

if (localStorage.getItem("enabled") === null) {
  localStorage.enabled = "false";
  enabled = false;
}
if (localStorage.getItem("time") === null) {
  localStorage.time = "60";
}

enabled = localStorage.enabled === "true";
button.checked = enabled;

button.onclick = () => {
  enabled = !enabled;
  localStorage.enabled = enabled;
};

if (localStorage.time) {
  selectElement("time", localStorage.time);
}

select.addEventListener("change", () => {
  localStorage.time = select.value;
});

function selectElement(id: string, valueToSelect: string) {
  const element = document.getElementById(id) as HTMLInputElement;
  element.value = valueToSelect;
}
