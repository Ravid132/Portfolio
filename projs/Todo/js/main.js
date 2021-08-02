function onInit() {
    console.log('Hi');
    renderTodos();
}

function renderTodos() {
    var todos = getTodosForDisplay();

    var strHTMLs = todos.map(function (todo) {
        return `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
            ${todo.txt}
            <button onclick="onRemoveTodo('${todo.id}', event)">x</button>
        </li>`
    })

    var elTodoList = document.querySelector('.todo-list');
    elTodoList.innerHTML = strHTMLs.join('');

    document.querySelector('.total-count').innerText = getTotalCount();
    document.querySelector('.active-count').innerText = getActiveCount();
    if (!todos.length || !todos) {
        elTodoList.innerHTML = 'No todos / No Active Todos, No Done Todos';
    }

}


function onToggleTodo(todoId) {
    console.log('Toggling: ', todoId);
    toggleTodo(todoId)
    renderTodos()
}

function onRemoveTodo(todoId, ev) {
    console.log('Removing: ', todoId);
    ev.stopPropagation();
    var res = confirm("are you sure?");
    if (!res) return;
    removeTodo(todoId);
    renderTodos();
}

function onAddTodo() {
    var elTxt = document.querySelector('[name=newTodoTxt]');
    var txt = elTxt.value;
    if (!txt) return;

    addTodo(txt)
    elTxt.value = '';

    renderTodos();
}

function onSetFilter(filterBy) {
    console.log('Filtering by:', filterBy);
    setFilterBy(filterBy);
    renderTodos();
}

function onSort(sort) {
    console.log('Sorting by:', sort);
    setSortBy(sort);
    renderTodos();
}

function onSetImportance(important) {
    console.log('imporant', important);
    setImporant(important);
}