// ⚪️ Setup and initialize MutationObserver
const config = {
  attributeFilter: ['style']
};

const callback = function (mutationsList: MutationRecord[]) {
  for (let i = 0; i < mutationsList.length; i++) {
    const mutatedModal = mutationsList[i].target as HTMLElement;
    if (mutatedModal.style.display === 'none') {
      const id = Number(mutatedModal.dataset.id);
      updateRecentlyViewed(id);
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(modal, config);

// ⚪️ Update recently viewed
function updateRecentlyViewed(id: number): void {
  lruRecentlyViewed.set(id, id);
  let dll = lruRecentlyViewed.getDLL();
  let html = '';

  while (dll) {
    const currentId = dll.value.value;
    const post = posts[currentId];
    html += `
      <div class="rv rounded recently-viewed-component d-flex justify-content-between align-items-center" data-id=${currentId} data-toggle="modal" data-target="#modal">
        <h3 class="rv">${post.title}</h3>
        <div class="rv thumbnail-container">
          <div class="rv thumbnail rounded" style="background-image: url(${post.image})"></div>
        </div>
      </div>`;
    dll = dll.next;
  }

  recentlyViewed.innerHTML = html;
}
