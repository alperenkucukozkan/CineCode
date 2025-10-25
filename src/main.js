async function loadPartials() {
  const loads = document.querySelectorAll('load');
  for (const el of loads) {
    const src = el.getAttribute('src');
    if (src) {
      const res = await fetch(src);
      if (res.ok) {
        const html = await res.text();
        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        el.replaceWith(wrapper);
      } else {
        console.error('Partial yüklenemedi:', src);
      }
    }
  }
}
loadPartials().then(async () => {
  await import('./js/index.js');
});