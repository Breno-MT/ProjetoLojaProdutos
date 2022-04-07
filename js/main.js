// inputText vai pegar o campo de input texto produto, que está na linha 27 do index.html
var inputText = document.getElementById('produto');

// btnDeleteAll vai deletar todos os itens da lista, ElementId está na linha 30
var btnDeleteAll = document.getElementById('btn-deletarTudo');

// btnDeleteMarked vai deletar os itens que estiverem marcado, ElementId está na linha 31
var btnDeleteMarked = document.getElementById('btn-deletarMarcado');

// btnSubmit vai inserir o item digitado no inpuText para a lista e mostrar no site, ElementId está na linha 29
var btnSubmit = document.getElementById('btn-submit');

// ul vai ser a nossa lista que irá mostrar os resultados de inputText, ElementId está na linha 48
var ul = document.getElementById('lista');


// Esse p2, está na Div "div-total" linha 41, vai ser usado para mostrar o valor total.
var p2 = document.getElementById('p2');

// Criando uma nova lista
var lista = [];
// guardando a lista se tiver item num localStorage, e transformado em JSON caso tenha item nele
var listaJSON = localStorage.getItem('lista')

// fazendo nossa lista retornavel como objeto
if (listaJSON) {
    lista = JSON.parse(listaJSON);
    updateScreen();
}


// transformando a lista em JSON.
 function saveStorage() {
    var listaJSON = JSON.stringify(lista);
    localStorage.setItem('lista', listaJSON);
}

// Esta função irá dar um update na tela, caso seja adicionado algum valor ou item.
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

            itemMarcado(item, checkbox.checked);


            
        }


        li.id = `i${item.id}`;
        li.innerHTML = item.name;
        
        li.appendChild(checkbox);
        li.appendChild(btnX);
        ul.appendChild(li);
    })

}

// Nesta função, está sendo feito a adição de item no nosso Array de Objetos
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

// Ira tirar o item especifico que tenha o botão X do lado
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

// Como diz, irá remover todos os itens da lista.
function removeAll() {
   
    lista.splice(0, lista.length);
    
    alert('Você deletou seus itens da Lista!');
    updateScreen();
    saveStorage();

}


// Caso algum item seja marcado pelo checkbox, irá aparecer um prompt e pedir o valor do item e somar no valor total (leia a linha 17 index.html)
function itemMarcado(item, status) {

    if(status == true) {
        item.price = parseFloat(prompt('Digite o valor R$', '1.12'));

        updateScreen();
        saveStorage();

    }

    // Esta função irá pegar os itens que tem valor na lista e irá somar, caso tenha 2 itens de 5 com valor, irá somar somente os 2. 
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

// Adicionando addEventListener pros botões, ou seja, dando vida para eles :D
btnSubmit.addEventListener('click', addItem);
btnDeleteAll.addEventListener('click', removeAll);