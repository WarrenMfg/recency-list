// ⚪️ Setup and initialize MutationObserver
const config = {
  attributeFilter: ['style']
};

const callback = function (mutationsList: MutationRecord[]) {
  for (let i = 0; i < mutationsList.length; i++) {
    const mutatedModal = mutationsList[i].target as HTMLElement;
    if (mutatedModal.style.display === 'none') {
      posts.innerHTML = renderDataToDOM();
      const title = mutatedModal.querySelector('#modalTitle') as HTMLElement;
      const titleText = title.innerText;
      updateRecentlyViewed(mutatedModal.dataset.id as string, titleText);
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(modal, config);

// ⚪️ Update recently viewed
function updateRecentlyViewed(id: string, value: string): void {
  lruRecentlyViewed.set(Number(id), value);
  let dll = lruRecentlyViewed.getDLL();
  let html = '';

  while (dll) {
    html += `<h3 class="rounded recently-viewed" data-id=${dll.value.key} data-toggle="modal" data-target="#modal">${dll.value.value}</h3>`;
    dll = dll.next;
  }

  recentlyViewed.innerHTML = html;
}
