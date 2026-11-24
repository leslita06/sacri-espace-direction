function show(v){
  document.querySelectorAll('main section').forEach(function(s){s.classList.toggle('hide', s.id !== 'v-' + v);});
  document.querySelectorAll('[data-v]').forEach(function(a){a.classList.toggle('on', a.dataset.v === v);});
  window.scrollTo(0, 0);
}
document.querySelectorAll('[data-v]').forEach(function(a){
  a.addEventListener('click', function(e){e.preventDefault(); show(a.dataset.v); history.replaceState(null, '', '#' + a.dataset.v);});
});
if (location.hash === '#do') show('do');

function filt(sec, co){
  sec.querySelectorAll('.seg button').forEach(function(x){x.classList.toggle('on', x.dataset.co === co);});
  sec.querySelectorAll('tr[data-co]').forEach(function(r){r.style.display = (co === 'all' || r.dataset.co === co) ? '' : 'none';});
  sec.querySelectorAll('[data-cos]').forEach(function(el){
    el.style.display = (co === 'all' || el.dataset.cos.split(' ').indexOf(co) >= 0) ? '' : 'none';
  });
}
document.querySelectorAll('.seg').forEach(function(seg){
  seg.addEventListener('click', function(e){var b = e.target.closest('button'); if (b) filt(seg.closest('section'), b.dataset.co);});
});
document.querySelectorAll('tr[data-co]').forEach(function(r){
  r.addEventListener('click', function(){var sec = r.closest('section'); var on = sec.querySelector('.seg button.on');
    filt(sec, on && on.dataset.co === r.dataset.co ? 'all' : r.dataset.co);});
});
document.querySelectorAll('.acts .btn').forEach(function(b){
  b.addEventListener('click', function(){
    var sec = b.closest('section');
    b.parentElement.innerHTML = '<span class="done">✓ ' + b.dataset.act + ' : enregistré et transmis au responsable</span>';
    var left = Array.prototype.filter.call(sec.querySelectorAll('.acts'), function(a){return a.querySelector('.btn');}).length;
    var c = sec.querySelector('.cnt'); var w = sec.id === 'v-dg' ? 'décision' : 'action';
    if (c) c.textContent = left === 0 ? 'Tout est traité' : left + ' ' + w + (left > 1 ? 's' : '') + ' restante' + (left > 1 ? 's' : '');
  });
});
