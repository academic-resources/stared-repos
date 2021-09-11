# <!-- Title -->

- <!-- TO -->
- <!-- DO -->

<button onclick="select();">Select</button>

<script>
const items = document.querySelectorAll("li");
const selectedItems = new Set();
async function select() {
  if (selectedItems.size === items.length) {
    selectedItems.clear();
    return select();
  }
  const selectedItem = items[Math.floor(Math.random() * items.length)];
  if (selectedItems.has(selectedItem)) return select();
  selectedItems.add(selectedItem);
  for (let flips = 0; flips < 10; flips++) {
    items.forEach(item => item.style.opacity = Math.random() < 0.5 ? 1 : 0.2);
    await sleep(200);
  }
  items.forEach(item => item.style.opacity = item === selectedItem ? 1 : 0.2);
}

async function sleep(ms) {
  return new Promise(resolve => { setTimeout(resolve, ms); });
}
</script>

<style>
body, button, button:active {
  text-align: center;
  font-size: 20px;
  line-height: 40px;
}

ul {
  columns: 2;
  list-style: none;
  padding: 0;
}

li {
  transition: opacity 200ms ease-in-out;
}
</style>
