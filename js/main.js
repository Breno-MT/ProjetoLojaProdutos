var inputText = document.getElementById('produto');
var btnDeleteAll = document.getElementById('btn-deletarTudo');
var btnDeleteMarked = document.getElementById('btn-deletarMarcado');
var btnSubmit = document.getElementById('btn-submit');
var ul = document.getElementById('lista');


// Esse p2, está na Div "div-total", vai ser usado para mostrar o valor total.
var p2 = document.getElementById('p2');


var lista = [];
// guardando a lista se tiver item num localStorage, e transformado em JSON caso tenha item nele
var listaJSON = localStorage.getItem('lista')

if (listaJSON) {
    lista = JSON.parse(listaJSON);
    updateScreen();
}


// transformando a lista em JSON.
 function saveStorage() {
    var listaJSON = JSON.stringify(lista);
    localStorage.setItem('lista', listaJSON);
}

function updateScreen() {
    
    ul.innerHTML = '';
    
    lista.forEach(function (item) {
        var btnX = document.createElement('button');
        btnX.innerHTML = 'x';
        btnX.onclick = function () {
            removeItem(item.id);
            updateScreen();
            saveStorage();
        }
        
        var li = document.createElement('li');
        
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        
        checkbox.onclick = function () {
            itemMarcado(item,checkbox.checked);

        }
        li.id = `i${item.id}`;
        li.innerHTML = item.name;
        
        li.appendChild(checkbox);
        li.appendChild(btnX);
        ul.appendChild(li);
    })

}

function addItem() {
    if(inputText.value) {
        lista.push({
            id: Date.now(),
            name: inputText.value,
            price: null
        });

        inputText.value = '';

        updateScreen();
        saveStorage();

    } else {
        alert("Insira o nome do produto!")
    }
}

// Ira tirar o item especifico que tenha
function removeItem(id) {
    var novaLista = [];
    
    lista.forEach(function (item) {
        if (item.id !== id) {
            novaLista.push(item)
        }
    })
    
    lista = novaLista;
    updateScreen();
}

function removeAll() {
   
    lista.splice(0, lista.length);
    
    alert('Você deletou seus itens da Lista!');
    updateScreen();
    saveStorage();

}

function removeMarked () {
    
}

function itemMarcado(item, status) {

    if(status) {
        item.price = parseFloat(prompt('Digite o valor R$', '1.12'));
        updateScreen();
        saveStorage();
    }

    function total() {

        if(valorTotal = lista.map(preco => preco.price).reduce((acc, preco) => preco + acc, 0)) {

            p2.innerHTML = `R$${valorTotal}`;
            updateScreen();
            saveStorage();
        }
    }

    total();
    updateScreen();
    saveStorage();
}








btnSubmit.addEventListener('click', addItem);
btnDeleteAll.addEventListener('click', removeAll);