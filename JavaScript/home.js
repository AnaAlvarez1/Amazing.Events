let checkboxCont = [];
let searchCont = "";

const container_cards = document.getElementById('card_container');

async function interfazData(container){
  try{
    let rest = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
    let data = await rest.json()

    see_cards(data.events, container)
    const category_checkbox_container = document.getElementById('category_checkbox');
    category_checkbox_container.appendChild(checkboxs(data.events));

    let checkboxes = document.querySelectorAll('input[type="checkbox"]')
    let inputSelected = [];

    console.log(checkboxes);
    checkboxes.forEach(checkbox => {
    checkbox.addEventListener( 'change', () => {
      inputSelected = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(input => input.value);
      console.log(inputSelected);
      filter_all(data.events, inputSelected, text_search, container)
    })
      });

    const search_input = document.getElementById('searchs');
    console.log(search_input);
    let text_search = '';
    search_input.addEventListener('keyup', (e) => {
    text_search = e.target.value
    filter_all(data.events, inputSelected, text_search, container)// paso como parametro "data.events"
    });

  }catch(error){
    console.log('Estoy en el catch: ' + error.mesage)
  }
  
}

interfazData(container_cards)

function see_cards(cards_list, container){
    container.innerHTML= '';
    if (cards_list.length > 0){
        let fragment = document.createDocumentFragment();
        for (var card of cards_list){
            let div = document.createElement('div');
            div.innerHTML = `
            <div class="col">
              <div class="card h-100">
                <div class="cont">
                  <img src=${card.image} class="card-img-top width" alt="...">
                  <div class="m_card">
                  <div class="card-body">
                    <h5 class="card-title">${card.name}</h5>
                    <p class="card-text">${card.description}</p>
                  </div>
                  <div class="card-footer">
                      <div class="price">
                          <p class="description-footer">${card.price}</p>
                      </div>
                      <div class="button-footer">
                          <button type="button" class="btn btn-outline-danger"><a href="./details.html?id=${card._id}">See More</a></button>
                      </div>
                  </div>
                </div>
                </div>
              </div>
            </div>`
            fragment.appendChild(div);
        }
        container.appendChild(fragment);
    }
    else {
        let div = document.createElement('div');
        div.innerHTML = `<p>The event does not exist</p>
        <p>Please search again</p>`
        container.appendChild(div);
    }
}

//see_cards(data.events, container_cards);

//Filtrar categorias para que no se repitan y las guardo en un array
//const category_checkbox_container = document.getElementById('category_checkbox');
//category_checkbox_container.appendChild(checkboxs(data.events));

function checkboxs (array){
    let array_categories = [];
    for(let elements of array){
      let card_categories = elements.category;
      array_categories.push(card_categories);
    }
    let categori = array_categories.filter((item, index) => {
      return array_categories.indexOf(item) === index;
    })

    //Genero un div por cada category ya filtrado, con su 
    //respectivo checkbox y lo muestro con sus estilos
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

//escuhar chexbox
//let checkboxes = document.querySelectorAll('input[type="checkbox"]')
//console.log(checkboxes);

// checkboxes.forEach(checkbox => { 
//   checkbox.addEventListener('change', verifyCheckbox )
// });

//capturo cada uno de los checkbox escuchados y los muestro
//let inputSelected = [];

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
// const search_input = document.getElementById('searchs');
// console.log(search_input);
// let text_search = '';
// search_input.addEventListener('keyup', (e) => {
//   text_search = e.target.value
  //console.log(text_search)
  //console.log(text(text_search,data.events))
  // filter_all(data.events)// paso como parametro "data.events"
// });

function text(search, list_card){
  if(search == "") return list_card;
  let new_arrays = list_card.filter(elements => elements.name.toLowerCase().includes(search.toLowerCase().trim()));
  return new_arrays;
}

//Filtros Cruzados
// let select_checked = [];
// let input_text = '';
function filter_all(array, input_select, textSearch, contenedor) {
  
  let cardsCheckesFiltered = array_filter (input_select, array); 
  let cardsInputFiltered = text (textSearch, cardsCheckesFiltered);
  see_cards(cardsInputFiltered, contenedor)
}



 