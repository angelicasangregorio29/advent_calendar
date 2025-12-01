const calendar = document.getElementById('calendar');
const template = document.getElementById('door-template');
const opened = JSON.parse(localStorage.getItem('openedDays') || '[]');
const today = new Date();
const testMode = window.location.search.includes('test=true');

for(let day=1; day<=24; day++){
  const node = template.content.firstElementChild.cloneNode(true);
  const front = node.querySelector('.front');
  const back = node.querySelector('.back');
  front.textContent = day;
  back.innerHTML = `<strong>Day ${day}</strong><br>Surprise message or image here.`;
  const allowed = testMode || (today.getMonth()===11 && today.getDate()>=day);
  if(opened.includes(day)) node.classList.add('open');
  if(!allowed) node.classList.add('locked');
  node.addEventListener('click', () => {
    if(!allowed) return;
    node.classList.toggle('open');
    const idx = opened.indexOf(day);
    if(node.classList.contains('open') && idx===-1){ opened.push(day); }
    if(!node.classList.contains('open') && idx>-1){ opened.splice(idx,1); }
    localStorage.setItem('openedDays', JSON.stringify(opened));
  });
  calendar.appendChild(node);
}