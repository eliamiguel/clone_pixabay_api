

const buscarImagemAPI = async (texto)=>{
  const key = '12180485-63058e50c2824559402449f76';
  const url = `https://pixabay.com/api/?key=${key}&q=${texto}`;
  const response = await fetch(url)
  return await response.json()
}

const carregarImagem = async (texto, page=1)=>{
const container = document.querySelector('.container-gallery')
const {hits, totalHits} = await buscarImagemAPI(`${texto}&page=${page}`)
const cardes = hits.map(criarCardes)
container.replaceChildren(...cardes)


const totalPaginas = Math.ceil(totalHits / 20)

  document.querySelector('#search-input').value = texto;
  document.querySelector('#page-total').textContent = `/ ${totalPaginas}`;
  document.querySelector('#page').value = page;
  
}

const criarCardes =({webformatURL, pageURL, likes, comments, tags})=>{
  const card =document.createElement('div')
  card.setAttribute('class', 'card-container')
  card.innerHTML= `
  <a href=${pageURL} class='card-image'> 
     <img src='${webformatURL}'>
  </a> 
  <div class="card-info"> 
    <div class="card-tags">
      ${tags.split(',').map(criarTag).join('')}
    </div>
    <div class="card-action">  
        <div class="card-like">
            <i class="far fa-thumbs-up"></i>
            <span>${likes}</span>
        </div>
        <div class="card-comment">
            <i class="far fa-comment"></i>
            <span>${comments}</span>
        </div>
        <div class="card-save">
            <i class="far fa-bookmark"></i>
        </div>
    </div>
  </div>
  `
 return card
}
const criarTag = (tag)=>`<a href='#'<a href="#" onClick="carregarImagem('${tag}')">
${tag}
</a>
  `


const pesquisarImagem =({key, target})=> {
  if(key === "Enter"){
    carregarImagem(target.value) 
  }
}


const ligarPagina = ({key, target})=>{
 const texto = document.getElementById('page')
 if(key === 'Enter'){
  carregarImagem(texto, target.value )
 }

}

const proximaPagina = ()=>{
  let pagina  = Number(document.querySelector('#page').value)
  console.log(pagina)
  const totalPaginas = Number(document.querySelector('#page-total').textContent.replace('/', ''));
  const texto = document.querySelector('#search-input').value;
  if (pagina< totalPaginas) {
      pagina++;
      carregarImagem(texto, pagina);
  }

}

const paginaAnterior = ()=>{
  let pagina  = Number(document.querySelector('#page').value);
  
  const texto = document.querySelector('#search-input').value;
  if (pagina > 1) {
      pagina--;
      carregarImagem(texto, pagina);
  }
}
document.getElementById('page').addEventListener('keypress', ligarPagina)
document.getElementById('search-input').addEventListener('keypress', pesquisarImagem)
document.querySelector('#page-next').addEventListener('click', proximaPagina);
document.querySelector('#page-previous').addEventListener('click', paginaAnterior)





const searchImages = async (text) => {
  const key = '12180485-63058e50c2824559402449f76';
  const url = `https://pixabay.com/api/?key=${key}&q=${text}`;
  const response = await fetch(url);
  return response.json();
};

const createLink = (tag) => `
  <a href="#" onClick="loadGallery('${tag}')">
      ${tag}
  </a>
`;

const createCard = ({webformatURL, pageURL, tags, likes, comments}) => {
  const card = document.createElement('div');
  card.classList.add('card-container');
  card.innerHTML = `
      <a href="${pageURL}" class="card-image">
          <img src=${webformatURL} >
      </a>
      <div class="card-info">
          <div class="card-tags">
             ${tags.split(',').map(createLink).join('')}
          </div>
          <div class="card-action">  
              <div class="card-like">
                  <i class="far fa-thumbs-up"></i>
                  <span>${likes}</span>
              </div>
              <div class="card-comment">
                  <i class="far fa-comment"></i>
                  <span>${comments}</span>
              </div>
              <div class="card-save">
                  <i class="far fa-bookmark"></i>
              </div>
          </div>

      </div>
  `;
  return card;
};

const loadGallery = async (text, page = 1) => {
  const container = document.querySelector('.container-gallery');
  const {hits, totalHits} = await searchImages(`${text}&page=${page}`);
  const cards = hits.map(createCard);
  container.replaceChildren(...cards);

  const totaPages = Math.ceil(totalHits / 20);
  document.querySelector('#page-total').textContent = `/ ${totaPages}`;
  document.querySelector('#search-input').value = text;
  document.querySelector('#page').value = page;
};

const handleKeypress = ({key, target}) => {
  if (key === 'Enter') {
      loadGallery(target.value);
  }
};

const handlePage = ({key, target}) => {
  const text = document.querySelector('#search-input').value;
  if (key === 'Enter') {
      loadGallery(text, target.value);
  }
};

const handleNext = () => {
  let page = Number(document.querySelector('#page').value);
  const totalPages = Number(document.querySelector('#page-total').textContent.replace('/', ''));
  const text = document.querySelector('#search-input').value;
  if (page < totalPages) {
      page++;
      loadGallery(text, page);
  }
};

const handlePrevious = () => {
  let page = Number(document.querySelector('#page').value);
  const text = document.querySelector('#search-input').value;
  if (page > 1) {
      page--;
      loadGallery(text, page);
  }
};

document.querySelector('#search-input').addEventListener('keypress', handleKeypress);
document.querySelector('#page').addEventListener('keypress', handlePage);
document.querySelector('#page-next').addEventListener('click', handleNext);
document.querySelector('#page-previous').addEventListener('click', handlePrevious);
*/