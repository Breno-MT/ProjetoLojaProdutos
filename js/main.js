var inputText = document.getElementById('produto');
var btnDeleteAll = document.getElementById('btn-deletarTudo');
var btnSubmit = document.getElementById('btn-submit');



var listaProdutos = [];





btnSubmit.addEventListener('click', () => {
    var ul = document.getElementById('lista');
    var li = document.createElement('li');
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode("bbb"));
    ul.appendChild(li);
})
