let container = document.getElementById('card_container');
let fragment = document.createDocumentFragment();

for(var card of data.events){
    let div = document.createElement('div');
    div.innerHTML = `<div class="cards1 d-flex "><div class="card1"><figure class="card">
    <img src=${card.image} alt="" class="card1"></figure><div class="body-card">
    <div class="des"><h4>${card.name}</h4><p class="description">${card.description}</p>
    </div><div class="footer-card"><div><p class="description-footer">${card.price}</p>
    </div> <div class="button-footer"><button type="button" class="btn btn-outline-danger">
    <a href="./details.html">Ver Más</a></button></div></div></div></div>`
    fragment.appendChild(div);
}
 container.appendChild(fragment);