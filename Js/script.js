
console.log(Math.floor(Math.random()* 26))

// Selecionar elementos
const addTaskButton = document.querySelector('#add-inputs button')
const toDoTextInpunt = document.querySelector('#add-inputs #to-do')
const toDoTextInpuntHide = document.querySelector('#add-inputs #to-do-hide')
const toDoList = document.querySelector('#to-do-list')
const addTarefasShow = document.querySelector('#add-tarefas-show')
const addTarefasHide = document.querySelector('#add-tarefas-hide')
const editConfirm = document.querySelector('#edit-confirm')
const cancelButton = document.querySelector('#cancel')
const fieldSearch = document.querySelector('#field-search')
const fieldSearchCancelBtn = document.querySelector('#search-inputs button')
const fieldFilter = document.querySelector('#field-filter')
let oldTagP;
// Funções
function addTask(text, done = 0, save = 1){

    
    toDoText = text
    const toDo = document.createElement('div')
    toDo.classList.add('to-do')

    const pTask = document.createElement('p')
    pTask.innerHTML = toDoText

    const divButtons = document.createElement('div')
    divButtons.classList.add('to-do-buttons')

    const buttonConfirm = document.createElement('button')
    buttonConfirm.classList.add('confirm')
    buttonConfirm.innerHTML = '<iconify-icon icon="line-md:confirm"></iconify-icon>'

    const buttonEdit = document.createElement('button')
    buttonEdit.classList.add('edit')
    buttonEdit.innerHTML = '<iconify-icon icon="line-md:edit"></iconify-icon>'

    const buttonClose = document.createElement('button')
    buttonClose.classList.add('close')
    buttonClose.innerHTML = '<iconify-icon icon="line-md:close"></iconify-icon>'

    if(done){
        toDo.classList.add('done')
    }
    if(save){
        saveLocalStorage({text, done})
    }

    toDoList.appendChild(toDo)
    toDo.appendChild(pTask)
    toDo.appendChild(divButtons)
    divButtons.appendChild(buttonConfirm)
    divButtons.appendChild(buttonEdit)
    divButtons.appendChild(buttonClose)    

    toDoTextInpunt.value = ''
    toDoTextInpunt.focus()
    
}
function edit(){
    addTarefasShow.classList.toggle('hide')
    addTarefasHide.classList.toggle('hide')
    toDoList.classList.toggle('hide')
    
}
function updateTagP(text){

    const toDo_s = document.querySelectorAll('.to-do')

    toDo_s.forEach((toDo) =>{

        let toDoTitle = toDo.querySelector('p')

        if(toDoTitle.innerHTML === oldTagP){
            toDoTitle.innerHTML = text
            editToDoLocalStorage(oldTagP,text)
        }
    })
}
function getSearchToDos(value){

    const toDo_s = document.querySelectorAll('.to-do')
    toDo_s.forEach((toDo) =>{

        let toDoTitle = toDo.querySelector('p').innerHTML.toLowerCase()

        toDo.style.display = 'flex'

        if(!toDoTitle.includes(value.toLowerCase())){
            toDo.style.display = 'none'
        }

    })
}
function filterOptions(option){
    const toDo_s = document.querySelectorAll('.to-do')

    toDo_s.forEach((toDo) =>{

        toDo.style.display = 'none'

        if(option == 'all'){
            toDo.style.display = 'flex'
        }
        else if(option == 'done'){
            if(toDo.classList.contains('to-do') && toDo.classList.contains('done')){
                toDo.style.display = 'flex'
            }
        }
        else if(option == 'toDo'){
            if(toDo.classList.contains('to-do') && !toDo.classList.contains('done')){
                toDo.style.display = 'flex'
            }
        }

    })
}
//Eventos
addTaskButton.addEventListener("click", (e) =>{
    e.preventDefault()

    const toDoText = toDoTextInpunt.value
    if(toDoText){ 
        addTask(toDoText)
    }
    
})
document.addEventListener("click", (e) => {
    const targetElement = e.target
    const parentElement = targetElement.closest(".to-do")
    let tagP;
    
    if (parentElement && parentElement.querySelector("p")) {
        tagP = parentElement.querySelector('p').innerHTML ;
      }    
    
    if(targetElement.classList.contains('confirm')){
        parentElement.classList.toggle('done')
        putDoneToDoLocalStorage(tagP)

    }

    if(targetElement.classList.contains('close')){
        parentElement.remove()
        removeToDoLocalStorage(tagP)
    }
    if(targetElement.classList.contains('edit')){
        edit()
        
        toDoTextInpuntHide.value = tagP
        oldTagP = tagP
    }
    if(targetElement.id == 'edit-confirm'){
        console.log('aqui')
        let newValueEdited = toDoTextInpuntHide.value
        if(newValueEdited){
            updateTagP(newValueEdited)
        }

        edit()
    }
})
cancelButton.addEventListener("click", (e) =>{
    e.preventDefault()
    edit()
    
})

editConfirm.addEventListener("click", (e) => {
    e.preventDefault()
})

fieldSearch.addEventListener("keyup", (e) =>{
    const fieldSearchValue = e.target.value
    getSearchToDos(fieldSearchValue)
})
fieldSearchCancelBtn.addEventListener("click", (e) => {
    e.preventDefault()

    fieldSearch.value = ''
    fieldSearch.dispatchEvent(new Event("keyup"))

})
fieldFilter.addEventListener("change", (e) => {
    const optionFilter = e.target.value
    filterOptions(optionFilter)
})

//Local Storage
const getToDosLocalStorage = () => {
    const toDos = JSON.parse(localStorage.getItem('ToDoList')) || []

    return toDos
}

function loadToDos() {
    const toDos = getToDosLocalStorage()

    toDos.forEach((todo) => {
        addTask(todo.text, todo.done, 0)
    })
}

const saveLocalStorage = (todo) => {

    const toDos = getToDosLocalStorage()

    toDos.push(todo)

    localStorage.setItem('ToDoList', JSON.stringify(toDos))
}
const removeToDoLocalStorage = (todoText) => {
    
    const toDos = getToDosLocalStorage()

    const filteredToDos = toDos.filter((todos) => todos.text !== todoText)

    localStorage.setItem('ToDoList', JSON.stringify(filteredToDos))
}
const putDoneToDoLocalStorage = (todoText) => {
    
    const toDos = getToDosLocalStorage()

    toDos.map((todos) => todos.text === todoText ? todos.done = !todos.done : null)

    localStorage.setItem('ToDoList', JSON.stringify(toDos))
}

const editToDoLocalStorage = (todoOldText,todoNewText) => {
    
    const toDos = getToDosLocalStorage()

    toDos.map((todos) => todos.text === todoOldText ? todos.text = todoNewText : null)

    localStorage.setItem('ToDoList', JSON.stringify(toDos))
}

loadToDos();
