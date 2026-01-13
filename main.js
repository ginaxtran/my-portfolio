document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = Array.from(document.querySelectorAll('.container .card'));
  const toggleBtn = document.getElementById('cardToggleBtn');
  
  let currentFilter = 'all';
  let isExpanded = false;
  const visibleLimit = 3;

  function updateGallery() {
    const filteredCards = cards.filter(card => {
      const category = card.getAttribute('data-category');
      return currentFilter === 'all' || category === currentFilter;
    });


    cards.forEach(card => card.classList.add('hide')); 


    filteredCards.forEach((card, index) => {
      if (isExpanded || index < visibleLimit) {
        card.classList.remove('hide');
        card.classList.remove('hidden');
      } else {
        card.classList.add('hide');
      }
    });


    if (filteredCards.length <= visibleLimit) {
      toggleBtn.style.display = 'none';
    } else {
      toggleBtn.style.display = 'block';
    }

    toggleBtn.innerHTML = isExpanded ? 
      'Show Less <i class="fas fa-chevron-up"></i>' : 
      'Show More <i class="fas fa-chevron-down"></i>';
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      currentFilter = btn.getAttribute('data-filter');
      isExpanded = false;
      updateGallery();
    });
  });


  toggleBtn.addEventListener('click', () => {
    isExpanded = !isExpanded;
    updateGallery();
  });


  updateGallery();
});