if (localStorage.getItem('myDataActive') == null) {localStorage.setItem('myDataActive', 'Task to be done')}
let active = localStorage.getItem('myDataActive').split(',');
if (localStorage.getItem('myDataDone') == null) {localStorage.setItem('myDataDone','Finished task')}
let done = localStorage.getItem('myDataDone').split(',');
if (localStorage.getItem('myDataPool') == null) {localStorage.setItem('myDataPool','Task is the Pool')}
let pool = localStorage.getItem('myDataPool').split(',');
let newTaskBtn = document.getElementById('addtask');
let removeFromPool = document.getElementById('removeFromPoolBtn');
let moveToActive = document.getElementById('addToActiveBtn');
let moveToDone = document.getElementById('addToDoneBtn');
let removeToPool = document.getElementById('removeToPoolBtn');
let clearList = document.getElementById('clearListBtn')

function addTasks(listID,listName){
    let ul = document.getElementById(listID);
    let li = document.createElement('li');
    let input = document.createElement('input');
    ul.appendChild(li);
    li.appendChild(input);
    li.classList.add('list-group-item');
    input.classList.add('form-check-input');
    input.classList.add('me-1');
    input.type = 'checkbox';
    li.appendChild(document.createTextNode(listName));
};
for (i=0; i<pool.length; i++){
    addTasks('poolList', pool[i])
};
for (i=0; i<active.length; i++){
    addTasks('activeList', active[i])
};
for (i=0; i<done.length; i++){
    addTasks('doneList', done[i])
};
function emptyList(variable,text,list,myDataName){
    if (variable.length == 0){
        variable.push(text)
        addTasks(list, variable[0])
        localStorage.setItem(myDataName,text)
    };
}
function removeReserved(listID,liText,listName){
    let ul = document.getElementById(listID).querySelectorAll(`li`);
    if (ul[0].innerText === liText) {
        ul[0].remove()
        listName.splice(0)
    };
}
newTaskBtn.addEventListener('click', ()=> {
    
    let val = document.getElementById('inpAddTask').value
    if (val == '') {
        document.getElementById('inpAddTask').placeholder = 'Introduce any task'
    }
    else {
        removeReserved('poolList','Task is the Pool',pool)
        pool.push(val)
        document.getElementById('inpAddTask').value = ''
        addTasks('poolList',val)
        document.getElementById('inpAddTask').placeholder = 'Task Name'
        localStorage.setItem('myDataPool', pool);
    }
} );
function remove(listID,listName,myDataName){
    let task = document.getElementById(listID).querySelectorAll(`input:checked`)
    for (i=0; i<task.length; i++){
        let taskName = task[i].nextSibling.data
        for(n = 0; n < listName.length; n++){ 
            if (listName[n] === taskName) { 
                listName.splice(n, 1); 
            }
        }
        task[i].offsetParent.remove();
    }
    localStorage.setItem(myDataName,listName)
};
function clear(listID,listName,myDataName,toListID,toListName,toMyDataName){
    let task = document.getElementById(listID).querySelectorAll(`input`)
    for (i=0; i<task.length; i++){
        let taskName = task[i].nextSibling.data
        addTasks(toListID,taskName)
        toListName.push(taskName)
    }
    localStorage.setItem(toMyDataName, toListName)
    for (i=0; i<task.length; i++){
        let taskName = task[i].nextSibling.data
        for(n = 0; n < listName.length; n++){ 
            if (listName[n] === taskName) { 
                listName.splice(n, 1); 
            }
        }
        task[i].offsetParent.remove();
    }
    localStorage.setItem(myDataName,listName)
} 
function moveFromList(fromListID,toListID,toListName,toMyDataName){
    let task = document.getElementById(fromListID).querySelectorAll(`input:checked`)
    for (i=0; i<task.length; i++){
        let taskName = task[i].nextSibling.data
        addTasks(toListID,taskName)
        toListName.push(taskName)
    }
    localStorage.setItem(toMyDataName, toListName)
};
removeFromPool.addEventListener('click', ()=>{
    remove('poolList',pool,'myDataPool')
    emptyList(pool,'Task is the Pool','poolList','myDataPool')
})
moveToActive.addEventListener('click', ()=>{
    removeReserved('activeList','Task to be done',active)
    moveFromList('poolList','activeList',active,'myDataActive')
    remove('poolList',pool,'myDataPool')
    emptyList(pool,'Task is the Pool','poolList','myDataPool')
});
removeToPool.addEventListener('click', ()=>{
    moveFromList('activeList','poolList',pool,'myDataPool')
    moveFromList('doneList','poolList',pool,'myDataPool')
    remove('activeList',active,'myDataActive')
    emptyList(active,'Task to be done','activeList','myDataActive')
    remove('doneList',done,'myDataDone')
    emptyList(done,'Finished task','doneList','myDataDone')
});
moveToDone.addEventListener('click', () =>{
    removeReserved('doneList','Finished task',done)
    moveFromList('activeList','doneList',done,'myDataDone')
    remove('activeList',active,'myDataActive')
    emptyList(active,'Task to be done','activeList','myDataActive')
})
clearList.addEventListener('click', ()=>{
    clear('activeList',active,'myDataActive','poolList',pool,'myDataPool')
    emptyList(active,'Task to be done','activeList','myDataActive')
    clear('doneList',done,'myDataDone','poolList',pool,'myDataPool')
    emptyList(done,'Finished task','doneList','myDataDone')
})
