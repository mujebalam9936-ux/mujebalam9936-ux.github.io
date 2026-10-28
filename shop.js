// Shop filters: grade / activity / season chips (one choice per row), state kept in the URL hash so links like /shop/#christmas work.
(() => {
  const cards = [...document.querySelectorAll('.shopgrid .pcard')];
  const btns = [...document.querySelectorAll('.frow button')];
  const sel = { grade: '', format: '', season: '' };
  const n = document.getElementById('n');
  const apply = () => {
    let shown = 0;
    for (const c of cards) {
      const ok = (!sel.grade || c.dataset.grade.split(' ').includes(sel.grade)) &&
        (!sel.format || c.dataset.format === sel.format) && (!sel.season || c.dataset.season === sel.season);
      c.hidden = !ok; if (ok) shown++;
    }
    n.textContent = shown;
    for (const b of btns) { const k = Object.keys(b.dataset)[0]; b.setAttribute('aria-pressed', sel[k] === b.dataset[k]); }
    const h = Object.values(sel).filter(Boolean).join(',');
    history.replaceState(null, '', h ? '#' + h : location.pathname);
  };
  for (const b of btns) b.addEventListener('click', () => {
    const k = Object.keys(b.dataset)[0]; sel[k] = sel[k] === b.dataset[k] ? '' : b.dataset[k]; apply();
  });
  document.getElementById('clear').addEventListener('click', () => { sel.grade = sel.format = sel.season = ''; apply(); });
  for (const v of decodeURIComponent(location.hash.slice(1)).split(',').filter(Boolean)) {
    const b = btns.find(x => Object.values(x.dataset)[0] === v); if (b) sel[Object.keys(b.dataset)[0]] = v;
  }
  apply();
})();
