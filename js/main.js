var inputText = document.getElementById('produto');
var btnDeleteAll = document.getElementById('btn-deletarTudo');
var btnSubmit = document.getElementById('btn-submit');
var ul = document.getElementById('lista');



var lista = [];

var listaJSON = localStorage.getItem('lista')
if (listaJSON) {
    lista = JSON.parse(listaJSON);
    updateScreen();
}

function saveStorage() {
    var listaJSON = JSON.stringify(lista);
    localStorage.setItem('lista', listaJSON);
}

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
   
}


function changePrice() {
    
}


function updateScreen() {
    ul.innerHTML = '';
    
    lista.forEach(function (item) {
        var btnX = document.createElement('button');
        btnX.innerHTML = 'x';
        btnX.onclick = function () {
            removeItem(item.id);
        }
        
        var li = document.createElement('li');
        
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        
        
        li.id = `i${item.id}`;
        li.innerHTML = item.name;
        
        ul.appendChild(checkbox);
        li.appendChild(btnX);
        ul.appendChild(li);
    })
}







function addItem() {
    if(inputText.value) {
        lista.push({
            id: Date.now(),
            name: inputText.value,
            price: null,
        });

        inputText.value = '';

        updateScreen();
        saveStorage();

    } else {
        alert("Insira o nome do produto!")
    }
}



btnSubmit.addEventListener('click', addItem);
btnDeleteAll.addEventListener('click', removeAll);