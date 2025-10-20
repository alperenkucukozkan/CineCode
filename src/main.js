async function loadPartials() {
  const loads = document.querySelectorAll('load[src]');
  for (const el of loads) {
    const src = el.getAttribute('src');
    if (!src) continue;
    try {
      const res = await fetch(src);
      if (!res.ok) {
        console.error('Partial yüklenemedi:', src, res.status);
        continue;
      }
      const html = await res.text();
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html;

      wrapper.querySelectorAll('script').forEach(old => {
        const s = document.createElement('script');
        for (const attr of old.attributes)
          s.setAttribute(attr.name, attr.value);
        s.text = old.textContent;
        old.parentNode.replaceChild(s, old);
      });

      const frag = document.createDocumentFragment();
      while (wrapper.firstChild) frag.appendChild(wrapper.firstChild);
      el.replaceWith(frag);
    } catch (err) {
      console.error('Partial fetch hatası:', src, err);
    }
  }
}
loadPartials().catch(err => console.error(err));
