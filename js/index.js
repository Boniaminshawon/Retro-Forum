

let markReadCount = 0;
const titleContainer = document.getElementById('title-container');
const loadingSpinner = document.getElementById('loading-spinner');
loadingSpinner.classList.remove('hidden');

const allPost = async (searchText) => {

  const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
  const data = await response.json();
  const posts = data.posts;
  // console.log(data)
  // console.log(posts)

  const postsContainer = document.getElementById('posts-container');
  postsContainer.textContent = '';


  setTimeout(() => {
    document.getElementById('title-box').classList.remove('hidden');
    posts.forEach(post => {

      loadingSpinner.classList.add('hidden');
      // console.log(post.isActive)
      // const activeStatus = document.getElementById('active-status');
      // console.log(activeStatus)
      if (post.isActive) {

        // console.log(post?.isActive)
        // console.log(activeStatus)

      }
      const div = document.createElement('div');
      div.innerHTML = `
        <div  class=" flex mt-5 gap-5 bg-[#797dfc1a] p-10 border-[#797DFC] border-2 rounded-3xl shadow-xl">
                    <div class="relative">
                    <div id="active-status" class="w-3 h-3 absolute right-[-3px] top-[-5px] rounded-full bg-[green]"></div>
                        <div class="  w-10"> <img class="rounded-lg" src=" ${post.image} " alt=""></div>
                        
                    </div>
                    <div class="">
                      <div class="flex space-x-10 text-[#12132DCC] font-medium">
                        <p># ${post.category} </p>
                        <p>Author : ${post.author.name}</p>
                      </div>
                      <h2 class="text-[#12132D] font-bold text-xl mt-3">${post.title}</h2>
                      <p class="text-[#12132D99] mt-5 ">${post.description}</p>
                      <div class=" mt-5 w-full border-dashed border-[#0307124D] border-[1px]"></div>
                     <div class="flex justify-between mt-5">
                    
                        <div class="flex gap-3 justify-between text-[#12132D99]">
                        <img  src="images/tabler-icon-message-2.png" alt=""><span class="mr-3">${post.comment_count}</span>
                        <img class="ml-3" src="images/tabler-icon-eye.png" alt=""><span class="">${post.view_count}</span>
                        <img class="ml-3" src="images/tabler-icon-clock-hour-9.png" alt=""><span> ${post.posted_time} min</span>

                          </div>
                          <button onclick="postClick(${post.id})" class="text-end  lg:ml-[260px] "><img src="images/email 1.png" alt=""></button>
                     </div>
                    </div>
                </div>
        `
      postsContainer.appendChild(div);
    });

  }, 2000);
}

const postClick = (id) => {
  markReadCount++;
  setInnerText('mark-count', markReadCount);


  fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    .then((res) => res.json())
    .then((data) => {
      const posts = data.posts.find((item) => item.id == id);

      // console.log(posts)


      const div = document.createElement('div');
      div.innerHTML = `
      <div class="flex justify-between items-center gap-2 mb-3 lg:mb-4 p-4 bg-white shadow-2xl rounded-lg">
      <h1 class="font-semibold text-sm text-[#12132D]">${posts.title}</h1>
      <div class"flex"> <img src="images/tabler-icon-eye.png" alt=""><p class="">${posts.view_count}</p></div>
    </div>
      `
      titleContainer.appendChild(div);
    });
}

const searchField = () => {

  const searchText = document.getElementById('search-field');
  const searchValue = searchText.value;

  if (searchValue) {
    loadingSpinner.classList.remove('hidden');
    allPost(searchValue);
  }
  else {
    loadingSpinner.classList.remove('hidden');
    allPost('')
    setTimeout(() => {
      alert('Please provide the right text');
    }, 2000);
  }
  searchText.value = '';

}

// setTimeout(() => {
//    document.getElementById('title-box').classList.remove('hidden')
//   allPost('');
// },2000);

const latestPost = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
  const data = await response.json();
  const posts = data;

  const latestPostContainer = document.getElementById('latest-post-container');
  posts.forEach(post => {

    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card  bg-base-100 shadow-xl border border-[#12132D26]">
                    <figure class="p-7 ">
                      <img src="${post.cover_image}" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="p-6 pt-0 space-y-4 ">
                        <div class="flex gap-2">
                            <img src="images/Frame (10).png" alt="">
                            <p class="text-[#12132D99]">${post.author?.posted_date || 'No Publish Date'}</p>
                        </div>
                      <h2 class=" card-title font-extrabold text-lg text-[#12132D]">${post.title}</h2>
                      <p class="text-[#12132D99]">${post.description} </p>
                      <div class="flex gap-3 ">
                        <img class="w-12 h-12 rounded-full" src="${post.profile_image}" alt="">

                        <div class="">
                          <h2 class="text-[#12132D] font-bold">${post.author.name}</h2>
                          <p class="text-[#12132D99]">${post.author?.designation || 'Unknown'}</p>
                        </div>
                    </div>
                    </div>
                  </div>
    `
    latestPostContainer.appendChild(div);

  })

}

latestPost();

allPost('');

function setInnerText(id, value) {
  const element = document.getElementById(id);
  element.innerText = value;
}




