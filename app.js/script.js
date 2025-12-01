// day-01 app.js - Vanilla JS demo
document.addEventListener('DOMContentLoaded', () => {
  const items = [
    { id:1, title:'Project Alpha', desc:'Small demo with DOM' },
    { id:2, title:'Project Beta', desc:'Interactive gallery' },
    { id:3, title:'Project Gamma', desc:'Tiny widget' }
  ];

  const app = document.getElementById('app');

  // build search input
  const searchWrap = document.createElement('div');
  searchWrap.innerHTML = `
    <input id="q" placeholder="Search projects..." aria-label="Search projects" style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.04);background:transparent;color:inherit" />
  `;
  app.appendChild(searchWrap);

  const list = document.createElement('div');
  list.style.display = 'grid';
  list.style.gridTemplateColumns = 'repeat(auto-fit,minmax(220px,1fr))';
  list.style.gap = '12px';
  list.style.marginTop = '12px';
  app.appendChild(list);

  function render(filter='') {
    list.innerHTML = '';
    const q = filter.trim().toLowerCase();
    const filtered = items.filter(i => i.title.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q));
    filtered.forEach(i => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <h3 style="margin:0 0 8px">${i.title}</h3>
        <p style="margin:0 0 12px;color:var(--muted)">${i.desc}</p>
        <button class="btn" data-id="${i.id}">Preview</button>
      `;
      list.appendChild(card);
    });
  }

  // modal
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.inset = '0';
  modal.style.display = 'none';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.background = 'rgba(2,6,23,0.6)';
  modal.innerHTML = `<div style="background:var(--card);padding:20px;border-radius:12px;max-width:600px;width:90%"><div id="modal-body"></div><div style="text-align:right;margin-top:12px"><button id="close" class="btn">Close</button></div></div>`;
  document.body.appendChild(modal);

  document.addEventListener('click', (e) => {
    if (e.target.matches('.btn[data-id]')) {
      const id = Number(e.target.dataset.id);
      const item = items.find(x => x.id === id);
      document.getElementById('modal-body').innerHTML = `<h3 style="margin-top:0">${item.title}</h3><p style="color:var(--muted)">${item.desc}</p>`;
      modal.style.display = 'flex';
    }
    if (e.target.id === 'close') modal.style.display = 'none';
  });

  document.getElementById('q').addEventListener('input', (e) => render(e.target.value));
  render();
});