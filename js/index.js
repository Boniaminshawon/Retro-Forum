

let markReadCount = 0;
const titleContainer = document.getElementById('title-container');

const allPost = async (searchText) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
  const data = await response.json();
  const posts = data.posts;
  // console.log(data)
  // console.log(posts)

  const postsContainer = document.getElementById('posts-container');
  postsContainer.textContent='';
  posts.forEach(post => {
    
    
    const div = document.createElement('div');
    div.innerHTML = `
        <div  class=" flex mb-5 gap-5 bg-[#797dfc1a] p-10 border-[#797DFC] border-2 rounded-3xl shadow-xl">
                    <div>
                        <div class="  w-9"> <img class="rounded-lg" src=" ${post.image} " alt=""></div>
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
                          <button onclick="postClick(${post.id})" class="text-end ml-[250px] "><img src="images/email 1.png" alt=""></button>
                     </div>
                    </div>
                </div>
        `
    postsContainer.appendChild(div);


  });
}

const postClick = (id) => {
  markReadCount++;
  setInnerText('mark-count', markReadCount);


  fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
  .then((res)=>res.json())
  .then((data)=>{
    const posts =data.posts.find((item)=> item.id=id);

console.log(posts)

    


      const div = document.createElement('div');
      div.innerHTML = `
      <div class="flex items-center gap-2 mb-4 p-4 bg-white shadow-2xl rounded-lg">
      <h1 class="font-semibold text-sm text-[#12132D]">${posts.title}</h1>
      <img src="images/tabler-icon-eye.png" alt=""><span class="">${posts.view_count}</span>
    </div>
      `
    titleContainer.appendChild(div);
  });
}

const searchField = ()=>{
  const searchText  = document.getElementById('search-field').value;
 
  if(searchText){
    allPost('searchText')
  }
  else{
    alert('Please provide the right text');
  }

}

allPost('');

function setInnerText(id, value) {
  const element = document.getElementById(id);
  element.innerText = value;
}




