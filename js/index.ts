// ⚪️ Interface for posts
interface Post {
  id: number;
  title: string;
  body: string;
  image: string;
}

// ⚪️ Initialize LRU for recently viewed and declare posts variable
// const lruPosts = new LRUCache(10); // keeps posts in view order
const lruRecentlyViewed = new LRUCache(5); // shows five most recent
let posts: Post[];

// ⚪️ Query DOM
const postsContainer = document.getElementById(
  'posts-container'
) as HTMLElement;
const modal = document.getElementById('modal') as HTMLElement;
const recentlyViewed = document.getElementById(
  'recently-viewed'
) as HTMLElement;

// ⚪️ Event listeners
postsContainer.addEventListener('click', e => {
  const target = e.target as HTMLElement;
  if (target.tagName === 'BUTTON') {
    // update modal
    updateModal(target);
  }
});

recentlyViewed.addEventListener('click', e => {
  const target = e.target as HTMLElement;
  if (target.tagName === 'H3') {
    updateModal(target.parentElement as HTMLElement);
  }
  if (target.classList.contains('recently-viewed')) {
    updateModal(target);
  }
});

// ⚪️ Fetch data
fetch('../data.json')
  .then((res: { json: () => any }) => res.json())
  .then(renderDataToDOM)
  .catch(console.log);

// ⚪️ Render to DOM
function renderDataToDOM(data: Post[]): void {
  posts = data;

  let html = '';
  for (let i = 0; i < data.length; i++) {
    html += makeHTML(data[i]);
  }

  postsContainer.innerHTML = html;
}

function makeHTML(post: Post): string {
  return `
    <div class="card ml-auto mr-auto mb-3">
      <div class="card-image-mask">
        <div class="card-image" style="background-image: url(${post.image})"></div>
      </div>
      <div class="card-body d-flex flex-column justify-content-center">
        <h5 class="card-title text-center">${post.title}</h5>
        <button type="button" class="btn btn-primary" data-id=${post.id} data-toggle="modal" data-target="#modal">Read More</button>
      </div>
    </div>
  `;
}

function updateModal(target: HTMLElement): void {
  // get id and post
  const id = target.dataset.id as string;
  const post = posts[Number(id)];
  // update modal
  modal.dataset.id = id; // needed for updateRecentlyViewed in modalReaction
  const modalTitle = modal.querySelector('#modalTitle') as HTMLElement;
  const modalBody = modal.querySelector('#modalBody') as HTMLElement;
  modalTitle.innerText = post.title;
  modalBody.innerText = post.body;
}
