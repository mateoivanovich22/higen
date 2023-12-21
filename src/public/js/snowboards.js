
window.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.cyberpunk-checkbox');
  
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', async () => {
        let selectedFilter = '';
    
        if (checkbox.checked) {
          checkboxes.forEach(otherCheckbox => {
            if (otherCheckbox !== checkbox) {
              otherCheckbox.checked = false;
            }
          });
    
          selectedFilter = checkbox.value;
        }
    
        try {
          let url = '/snowboards/filter';
          
          if (selectedFilter !== '') {
            url += `?filter=${selectedFilter}`;
          }
          window.location.href = url;
    
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      });
    });
  
    const urlParams = new URLSearchParams(window.location.search);

    const filter = urlParams.get('filter');
  
    checkboxes.forEach(checkbox => {
      if (checkbox.value === filter) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    });
});


