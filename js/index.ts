const lru = new LRUCache(10);
const posts = document.getElementById('posts') as HTMLElement;

interface Post {
  id: number;
  title: string;
  body: string;
}

fetch('../data.json')
  .then((res: { json: () => any }) => res.json())
  .then((d: Post[]) => {
    for (let i = 0; i < d.length; i++) {
      lru.set(d[i].id, d[i]);
    }
    posts.addEventListener('click', e => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON') {
        // get the post
        const post = lru.get(target.dataset.id as string);
        // get modal
        const modalTitle = document.getElementById('modalTitle') as HTMLElement;
        const modalBody = document.getElementById('modalBody') as HTMLElement;
        // update modal
        modalTitle.innerText = post.title;
        modalBody.innerText = post.body;
      }
    });
    posts.innerHTML = renderDataToDOM();
  })
  .catch(console.log);

function renderDataToDOM(): string {
  let dll = lru.getDLL();
  let html = '';
  while (dll) {
    html += makeHTML(dll.value);
    dll = dll.next;
  }
  return html;
}

function makeHTML(node: LRUCacheItem): string {
  return `
    <div class="card w-50 ml-auto mr-auto mb-3">
      <img src="https://placeimg.com/500/250/nature?q=${node.value.id}" class="card-img-top img-fluid" alt="Nature photo" width="500" height="250">
      <div class="card-body d-flex flex-column justify-content-center">
        <h5 class="card-title text-center">${node.value.title}</h5>
        <button type="button" class="btn btn-primary" data-id=${node.value.id} data-toggle="modal" data-target="#modal">Read More</button>
      </div>
    </div>
  `;
}
