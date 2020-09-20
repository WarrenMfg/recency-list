// ⚪️ Initialize LRU for posts and recently viewed
const lruPosts = new LRUCache(10); // keeps posts in view order
const lruRecentlyViewed = new LRUCache(5); // shows five most recent

// ⚪️ Query DOM
const posts = document.getElementById('posts') as HTMLElement;
const modal = document.getElementById('modal') as HTMLElement;
const recentlyViewed = document.getElementById(
  'recently-viewed'
) as HTMLElement;

// ⚪️ Event listeners
posts.addEventListener('click', e => {
  const target = e.target as HTMLElement;
  if (target.tagName === 'BUTTON') {
    // update modal
    updateModal(target);
  }
});

recentlyViewed.addEventListener('click', e => {
  const target = e.target as HTMLElement;
  // update modal
  updateModal(target);
});

// ⚪️ Fetch data
interface Post {
  id: number;
  title: string;
  body: string;
}

fetch('../data.json')
  .then((res: { json: () => any }) => res.json())
  .then((d: Post[]) => {
    for (let i = 0; i < d.length; i++) {
      lruPosts.set(d[i].id, d[i]);
    }

    posts.innerHTML = renderDataToDOM();
  })
  .catch(console.log);

// ⚪️ Render to DOM
function renderDataToDOM(): string {
  let dll = lruPosts.getDLL();
  let html = '';
  while (dll) {
    html += makeHTML(dll.value);
    dll = dll.next;
  }
  return html;
}

function makeHTML(node: LRUCacheItem): string {
  return `
    <div class="card ml-auto mr-auto mb-3">
      <img src="https://placeimg.com/500/250/any?q=${node.value.id}" class="card-img-top img-fluid" alt="Nature photo" width="500" height="250">
      <div class="card-body d-flex flex-column justify-content-center">
        <h5 class="card-title text-center">${node.value.title}</h5>
        <button type="button" class="btn btn-primary" data-id=${node.value.id} data-toggle="modal" data-target="#modal">Read More</button>
      </div>
    </div>
  `;
}

function updateModal(target: HTMLElement): void {
  // get post
  const post = lruPosts.get(target.dataset.id as string);
  // update modal
  modal.dataset.id = target.dataset.id;
  const modalTitle = modal.querySelector('#modalTitle') as HTMLElement;
  const modalBody = modal.querySelector('#modalBody') as HTMLElement;
  modalTitle.innerText = post.title;
  modalBody.innerText = post.body;
}
