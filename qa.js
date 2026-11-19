
(() => {
  const form = document.querySelector('#qa-search');
  if (!form) return;
  const input = document.querySelector('#qa-input');
  const rows = [...document.querySelectorAll('.qa-list details')];
  const status = document.querySelector('#qa-status');
  function search() {
    const words = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let count = 0;
    rows.forEach(row => {
      const text = (row.textContent + ' ' + row.dataset.keywords).toLowerCase();
      const match = words.every(word => text.includes(word));
      row.hidden = !match;
      row.open = match && words.length > 0;
      if (match) count++;
    });
    status.textContent = words.length ? '找到 ' + count + ' 個相關問題' : '';
    document.querySelector('#qa-empty').hidden = count > 0;
  }
  form.addEventListener('submit', event => { event.preventDefault(); search(); });
  input.addEventListener('input', search);
  document.querySelector('#qa-reset').addEventListener('click', () => {
    input.value = ''; search(); input.focus();
  });
})();
