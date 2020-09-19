const modal = document.getElementById('modal') as HTMLElement;
const config = {
  attributeFilter: ['style']
};

const callback = function (
  mutationsList: MutationRecord[],
  observer: MutationObserver
) {
  // Use traditional 'for loops' for IE 11
  for (let i = 0; i < mutationsList.length; i++) {
    const node = mutationsList[i].target as HTMLElement;
    if (node.style.display === 'none') {
      posts.innerHTML = renderDataToDOM();
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(modal, config);
