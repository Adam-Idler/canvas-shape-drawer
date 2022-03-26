const configuratorContainer = document.querySelector('.configurator__container');
const addButton = document.querySelector('.add-button');
let item = document.querySelector('.configurator__item');
const defaultItem = item.cloneNode(true);

const defaultsSettings = {
  x: 0,
  y: 0,
  radius: 40,
  inset: 0.5,
  strokeColor: 'hsl(0, 100%, 50%)',
  fillColor: 'hsl(0, 100%, 50%)',
  shadowColor: '#000000',
  shadowBlur: '10',
  lineWidth: 2,
  n: 3
};

const settings = [
  {...defaultsSettings}
]

addButton.addEventListener('click', () => {
  const clonedItem = defaultItem.cloneNode(true);
  
  configuratorContainer.appendChild(clonedItem);
  settings.push({...defaultsSettings});

  configuratorContainer.parentNode.style.height = configuratorContainer.offsetHeight + 80 + 'px';
  
  let items = document.querySelectorAll('.configurator__item');
  clonedItem.addEventListener('input', e => {
    let target = e.target;
    let value = +target.value || target.value;
    settings[items.length - 1][e.target.dataset.setting] = value;

    document.dispatchEvent(new Event('changesettings'));
  });

  if (items.length > 2) {
    addButton.style.display = 'none';
    return;
  }
});

item.addEventListener('input', e => {
  let target = e.target;

  let value = +target.value || target.value;
  settings[0][e.target.dataset.setting] = value;

  document.dispatchEvent(new Event('changesettings'));
});