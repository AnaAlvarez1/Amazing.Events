//visualización de las 7 card
const container_cards = document.getElementById('card_container');
let date_current = new Date(data.currentDate);

function see_cards(cards_list, container){
  container.innerHTML = '';
  if (cards_list.length > 0){
    let fragment = document.createDocumentFragment();
    for (var card of cards_list){
      let date_events = new Date(card.date);
      if(date_current > date_events){
        let div = document.createElement('div');
        div.innerHTML = `<div class="card1"><figure class="card">
        <img src=${card.image} alt="" class="card1"></figure><div class="body-card">
        <div class="des"><h4>${card.name}</h4><p class="description">${card.description}</p>
        </div><div class="footer-card"><div><p class="description-footer">${card.price}</p>
        </div> <div class="button-footer"><button type="button" class="btn btn-outline-danger">
        <a href="./details.html?id=${card._id}" class="nav-link">Ver Más</a></button></div></div></div></div>`
        fragment.appendChild(div);
      }
      container.appendChild(fragment);
    }
  }
  else {
    let div = document.createElement('div');
    div.innerHTML = `<h3>El evento no existe. Realice la búsqueda nuevamente</h3>`
    container.appendChild(div);
  }
}
see_cards(data.events, container_cards);

//Filtrar categorias para que no se repitan y las guardo en un array
const category_checkbox_container = document.getElementById('category_checkbox');
category_checkbox_container.appendChild(checkboxs(data.events));

function checkboxs(array){
  let array_categories = [];
  for (let elements of array){
    let card_categories = elements.category;
    array_categories.push(card_categories);
  }
  let categori = array_categories.filter((item, index) => {
    return array_categories.indexOf(item) === index;
  })

//Genero un div por cada category ya filtrado, con su 
//respectivo checkbox y lo muesto con sus estilos
  let fragment_checkbox = document.createDocumentFragment();
  for(let catego of categori){
    let div = document.createElement('div');
    div.innerHTML = `
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="${catego.split(" ").join("_")}" value="${catego}" name= "categories">
        <label class="form-check-label" for="${catego.split(" ").join("")}">${catego}</label>
      </div>`
    fragment_checkbox.appendChild(div);
  }
return fragment_checkbox;
}

//Escucho los checkbox
let checkboxes = document.querySelectorAll('input[type="checkbox"]')
console.log(checkboxes);

checkboxes.forEach(checkbox => { 
  checkbox.addEventListener('change', verifyCheckbox )
});

//capturo cada uno de los checkbox escuchados y los muestro
let inputSelected = [];

function verifyCheckbox(){
  inputSelected = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(input => input.value);
  console.log(inputSelected);
  filter_all(data.events)
}

function array_filter(array_string, cards_list){
  if(array_string.length === 0) return cards_list;
  return cards_list.filter(elements => array_string.includes(elements.category));
}

//serchs        
const search_input = document.getElementById('searchs');
console.log(search_input);
let text_search = '';
search_input.addEventListener('keyup', (e) => {
  text_search = e.target.value
  //console.log(text_search)
  //console.log(text(text_search, data_cards.events))
  filter_all(data.events)// paso como parametro "data.events"
});

function text(search, list_card){
  if(search == "") return list_card;
  let new_arrays = list_card.filter(elements => elements.name.toLowerCase().includes(search.toLowerCase().trim()));
  return new_arrays;
}

//Filtros Cruzados
let select_checked = [];
let input_text = '';
function filter_all(array) {
  
  let cardsCheckesFiltered = array_filter (inputSelected, array); 
  let cardsInputFiltered = text (text_search, cardsCheckesFiltered);
  see_cards(cardsInputFiltered, container_cards)
}