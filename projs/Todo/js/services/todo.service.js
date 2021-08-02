var gTodos = [];
var gFilterBy = 'all';
var gImporant = '1';
var gSort = 'txt';
_createTodos();


function getTodosForDisplay() {
    if (gFilterBy === 'all') return gTodos;

    var todos = gTodos.filter(function (todo) {
        return (gFilterBy === 'active' && !todo.isDone) ||
            (gFilterBy === 'done' && todo.isDone)

    })

    return todos;
}

function removeTodo(todoId) {
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === todoId
    })
    gTodos.splice(idx, 1);
    _saveTodosToStorage();
}

function addTodo(txt) {
    var time = new Date();
    var todo = {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds(),
        importance: gImporant,
    }
    gTodos.unshift(todo);
    _saveTodosToStorage()
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    })
    todo.isDone = !todo.isDone;
    _saveTodosToStorage();
}

function setFilterBy(filterBy) {
    gFilterBy = filterBy
}

function setSortBy(sort) {
    gSort = sort;
    mySort(sort);
}

function mySort(sort) {
    console.log('before', gTodos);
    switch (sort) {
        case 'txt':
            gTodos.sort(function (a, b) {
                console.log('b', b);
                if (a.txt.toUpperCase() < b.txt.toUpperCase()) return -1;
                else if (a.txt.toUpperCase() > b.txt.toUpperCase()) return 1;
                return 0;
            })
            break;
        case 'created':
            gTodos.sort(function (a, b) {
                return a.createdAt.localeCompare(b.createdAt)
            })
            break;
        case 'importance':
            gTodos.sort(function (a, b) {
                return a.importance - b.importance;
            })
            break;

        default:
            break;
    }
    console.log('after', gTodos);
}

function setImporant(imporant) {
    gImporant = imporant;
}

function getTotalCount() {
    return gTodos.length
}
function getActiveCount() {
    var activeTodos = gTodos.filter(function (todo) {
        return !todo.isDone
    })
    return activeTodos.length;
}


function _saveTodosToStorage() {
    saveToStorage('todoDB', gTodos)
}

function _createTodos() {
    var todos = loadFromStorage('todoDB')
    if (todos && todos.length) {
        gTodos = todos
    } else {
        addTodo('Learn HTML');
        addTodo('Master CSS');
        addTodo('Practive JS');
    }
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}