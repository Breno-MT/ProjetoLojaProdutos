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
    
    var totalItens = 0;

    lista.forEach(function (item, index) {

        totalItens += item.price;
        


        var btnX = document.createElement('button');
        btnX.innerHTML = '❌';
        btnX.onclick = function () {
            removeItem(index);
            updateScreen();
            saveStorage();
        }
        
        var li = document.createElement('li');
        
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.price ? "checked" : ""; 

        
        checkbox.onclick = function () {
            
            itemMarcado(item.id, item.name, item.price, index);
            
        }


        li.id = `i${item.id}`;
        li.innerHTML = item.name;


        li.style.textDecoration = item.price ? 'line-through': ""
        
        li.appendChild(checkbox);
        li.appendChild(btnX);
        ul.appendChild(li);
    })

    
    p2.innerHTML = totalFormatado(totalItens);

}

// Nesta função, está sendo feito a adição de item no nosso Array de Objetos
function addItem() {


    if(inputText.value) {

        lista.push({
            id: Date.now(),
            name: inputText.value,
            price: false,
        });

        inputText.value = '';

        saveStorage();
        updateScreen();

    } else {
        alert("Insira o nome do produto!")
    }
}

// Ira tirar o item especifico que tenha o botão X do lado
function removeItem(id) {
    lista.splice(id, 1)
}

// Como diz, irá remover todos os itens da lista.
function removeAll() {
   
    lista.splice(0, lista.length);
    
    alert('Você deletou seus itens da Lista!');
    updateScreen();
    saveStorage();

}


// Caso algum item seja marcado pelo checkbox, irá aparecer um prompt e pedir o valor do item e somar no valor total (leia a linha 17 index.html)
function itemMarcado(id, nome, price, index) {

    if(price == false) {
        price = window.prompt('Digite o valor R$', '1.12');
        
        if(!isNaN(price) && price > 0) {

            var produto = {
                "id": id,
                "name": nome,
                "price": Number(price),
            }
        }
        lista.splice(index, 1, produto);
        saveStorage();
        updateScreen();

    } else {
        
        var produto = {
            "id": id,
            "name": nome,
            "price": false,
        }

        lista.splice(index, 1, produto);
        saveStorage();
        updateScreen();
    }

}

// Esta função irá pegar os itens que tem valor na lista e irá somar, caso tenha 2 itens de 5 com valor, irá somar somente os 2. 
function totalFormatado(total) {

    // if(valorTotal = lista.map(preco => preco.price).reduce((acc, preco) => preco + acc, 0)) {
        
    //     p2.innerHTML = valorTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL', minimumFractionDigits: 2});;
    //     updateScreen();
    //     saveStorage();

    // }

    return p2.innerHTML = total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL', minimumFractionDigits: 2});

}

updateScreen();
saveStorage();

function removeMarked() {
    for (let i = lista.length - 1; i >= 0; i--) {
        if(lista[i].price != false) {
            removeItem(i)
        }
    }
}

// Adicionando addEventListener pros botões, ou seja, dando vida para eles :D
btnSubmit.addEventListener('click', addItem);
btnDeleteAll.addEventListener('click', removeAll);
btnDeleteMarked.addEventListener('click', () => {
    removeMarked();
    saveStorage();
    updateScreen()
});
