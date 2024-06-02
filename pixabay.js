


const searchImages = async (text)=>{
  const key = '44196250-ec7a66247a6f9cc1631bd6704'
  const url =`https://pixabay.com/api/?key=${key}&q=${text}`
  const response = await fetch(url)
  return response.json()
}

const createLink= (tag)=>`
<a href= '#' onClick='loadGallery(${tag})'>
${tag}
</a>
`
const createCard = ({webformatURL, pageURL, tags, likes, comments})=>{
  const card = document.createElement('div')
  card.setAttribute('class', 'card-container')
  card.innerHTML= `
  <a href= '${pageURL}' class='card-image'>
  <img src=${webformatURL}>
  </a>

  <div class='card-info'>
      <div class='card-tags'>
       ${tags.split(',').map(createLink).join('')}
      </div>
      <div class='card-action'>
          <div class='card-like'>
          <i class="far fa-thumbs-up"></i>
          <span>${likes}</span>
          </div>
          <div class ='card-comment'>
          <i class="far fa-comment"></i>
          <span>${comments}</span>
          </div>
          <div class='card-save'>
          <i class="far fa-bookmark"></i>
          </div>
      </div>
  
  </div>
  `
 return card
}

const loadGallery = async (text, page= 1) => {
  const container = document.querySelector('.container-gallery')
     const {hits, totalHits} = await searchImages(`${text}&page=${page}`)
     const cards = hits.map(createCard)
     container.replaceChildren(...cards)

     const totaPages = Math.ceil(totalHits / 20);
    document.querySelector('#page-total').textContent = `/ ${totaPages}`;

      text

     document.querySelector('#page').value = page

}

const handleKeypresse = ({key, target})=>{
  if(key === 'Enter'){
    loadGallery(target.value)

  }
}
document.querySelector('#search-input')
        .addEventListener('keypress', handleKeypresse)


const handlePage ({key, target})=>{
  const  text= document.querySelector('#search-input').value
  if(key === 'Enter'){
    loadGallery(text, target.value)

  }
}
document.querySelector('#page').addEventListener('keypress', handlePage)

const  handleNext = ()=>{
  let page = Number(document.querySelector("#page"))
  const totaPages = Number(document.querySelector('#page-total').textContent.replace('/',''))
  const  text= document.querySelector('#search-input').value
  if(page < totaPages){
    page++
    loadGallery(text, page)
  }
}

const handlePrevious = () => {
  let page = Number(document.querySelector('#page').value);
  const text = document.querySelector('#search-input').value;
  if (page > 1) {
      page--;
      loadGallery(text, page);
  }
};


document.querySelector('#page-next').addEventListener('click', handleNext);
document.querySelector('#page-previous').addEventListener('click', handlePrevious);