document.addEventListener('DOMContentLoaded', function () {
  const perPage = 6;

  document.querySelectorAll('.books-grid[data-category]').forEach((grid) => {
    const section = grid.closest('.writing-category');
    const controls = section.querySelector('.pagination-controls');
    const status = section.querySelector('.pagination-status');
    const heading = section.querySelector('h2');
    const items = Array.from(grid.querySelectorAll('.paginated-item'));
    if (!controls || !status || !heading || items.length <= perPage) return;

    const totalPages = Math.ceil(items.length / perPage);

    function showPage(page, moveFocus = false) {
      const start = (page - 1) * perPage;
      items.forEach((item, index) => {
        item.style.display = index >= start && index < start + perPage ? '' : 'none';
      });
      controls.querySelectorAll('button[data-page]').forEach((button) => {
        const current = Number(button.dataset.page) === page;
        button.classList.toggle('is-active', current);
        if (current) button.setAttribute('aria-current', 'page');
        else button.removeAttribute('aria-current');
      });
      status.textContent = `Showing ${start + 1}–${Math.min(start + perPage, items.length)} of ${items.length} articles · Page ${page} of ${totalPages}`;
      if (moveFocus) {
        heading.focus({ preventScroll: true });
        heading.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
    }

    for (let page = 1; page <= totalPages; page++) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'pagination-button';
      button.dataset.page = page;
      button.setAttribute('aria-label', `Go to page ${page} in ${heading.textContent.trim()}`);
      button.textContent = page;
      button.addEventListener('click', () => showPage(page, true));
      controls.appendChild(button);
    }
    controls.hidden = false;
    showPage(1);
  });
});
