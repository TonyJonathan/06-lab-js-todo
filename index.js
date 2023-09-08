const template = document.getElementById("mon-template");
const clone = document.importNode(template.content, true);
const filterTask = clone.querySelector('header > input');
const buttonUrgent = clone.querySelector('.urgent > input'); 
const buttonOnHold = clone.querySelector('.onHold > input'); 
const newTask = clone.querySelector('.new_task'); 
const cross = clone.querySelector('.taskDescription > .clear:nth-child(3)');
const modal = clone.querySelector('.modal'); 
const submit = clone.querySelector('.modalContent > p:nth-child(5)');
const inputTitle = clone.querySelector('.modalContent > input:nth-child(2)');
const textAreaDescription = clone.querySelector('.textArea'); 
const taskCategory = clone.querySelector('.taskDescription > p:nth-child(1)'); 
const quotationMark = clone.querySelector('.taskDescription > img:nth-child(2)'); 
const addTask = clone.querySelectorAll('.addTask');
const addTaskAll = clone.querySelectorAll('.addTask > *');
const plannedContainer = clone.querySelector('.plannedContainer');
const inProgressContainer = clone.querySelector('.inProgressContainer');
const completedContainer = clone.querySelector('.completedContainer');
const completedContainerBin = clone.querySelector('.completed > img');

let plannedCountText = clone.querySelector('.plannedCount');
let inProgressCountText = clone.querySelector('.inProgressCount');
let completedCountText = clone.querySelector('.completedCount');
let plannedCount = parseInt(clone.querySelector('.plannedCount').textContent);
let inProgressCount = parseInt(clone.querySelector('.inProgressCount').textContent);
let completedCount = parseInt(clone.querySelector('.completedCount').textContent);
let clickUrgent = 0; 
let clickOnHold = 0; 
// il faudra ajouter le fait que cliquer sur l'un réinitialise l'autre :)

var task; 
var allTaskClone; 


function clickAgainReset(event){
    if(event.target == buttonUrgent && clickUrgent == 0){
        clickUrgent++; 
        clickOnHold = 0;
    } else if (event.target == buttonUrgent && clickUrgent == 1){
        buttonUrgent.checked = false;
        clickUrgent--;
    }else if(event.target == buttonOnHold && clickOnHold == 0){
        clickOnHold++; 
        clickUrgent = 0;
    } else if (event.target == buttonOnHold && clickOnHold == 1){
        buttonOnHold.checked = false;
        clickOnHold--;
    }
}

document.addEventListener('click', clickAgainReset); 


function openModal(){
    modal.style.display = 'block'; 
    inputTitle.classList.remove('error'); 
    inputTitle.placeholder = 'Title of the task';
    inputTitle.value = ''; 
}


function closeModal(){
    taskCategory.textContent = 'PLANNED'; 
    modal.style.display = 'none';
    inputTitle.classList.remove('error'); 
    inputTitle.placeholder = 'Title of the task';
    inputTitle.value = ''; 
    textAreaDescription.value = ''; 
    buttonOnHold.checked = false; 
    buttonUrgent.checked = false; 
    clickUrgent = 0; 
    clickOnHold = 0;  
}

newTask.addEventListener('click', openModal);
cross.addEventListener('click', closeModal); 
submit.addEventListener('click', submitInfo); 


function submitInfo(){

    if(inputTitle.value == ''){
        inputTitle.placeholder = 'Please add a title to your task'; 
        inputTitle.classList.add('error'); 
    } else {
        // ajoute la tâche
        
        const listTemplate = document.getElementById('listTemplate');
        const ulClone = document.importNode(listTemplate.content, true);
        const todoList = ulClone.querySelector('#todoList');
        
        const taskTemplate = document.getElementById('taskTemplate');
        const taskClone = document.importNode(taskTemplate.content, true);
        task = taskClone.querySelector('.task'); 
        allTaskClone = taskClone.querySelectorAll('.task');
        let noClickedTask = taskClone.querySelector('.noClickedTask');
        let taskText1 = taskClone.querySelector('.noClickedTask > p:nth-child(1)');
        taskText1.textContent = inputTitle.value;
        let alert = taskClone.querySelector('.alert'); 
        
        if(buttonUrgent.checked==true){
            alert.classList.add('alertUrgent'); 
        } else if(buttonOnHold.checked==true){
            alert.classList.add('alertOnHold'); 
        } 
        let taskText2 = taskClone.querySelector('.noClickedTask > p:nth-child(3)');
        taskText2.textContent = "...";
        
        noClickedTask.appendChild(taskText1); 
        noClickedTask.appendChild(alert); 
        noClickedTask.appendChild(taskText2); 
        task.appendChild(noClickedTask); 
        let taskText3 = taskClone.querySelector('.taskAlert');
        taskText3.classList.remove('taskAlert')
        if(buttonUrgent.checked == true){
            taskText3.textContent = "URGENT";
            taskText3.classList.add('taskAlertUrgent'); 
        } else if(buttonOnHold.checked == true){
            taskText3.textContent = "ON HOLD";
            taskText3.classList.add('taskAlertOnHold'); 
        } else {
            taskText3.hidden = true; 
        }
        let clickedTask = taskClone.querySelector('.clickedTask'); 
        let taskText4 = taskClone.querySelector('.clickedTask > p:nth-child(1)');
        if(textAreaDescription.value == ''){
            taskText4.textContent = 'no description'; 
        } else {
            taskText4.textContent = textAreaDescription.value;
        }
        
        let taskBin = taskClone.querySelector('.clickedTask > img:nth-child(2)');
        task.appendChild(taskText3);
        clickedTask.appendChild(taskText4);
        clickedTask.appendChild(taskBin);
        task.appendChild(clickedTask); 
        todoList.appendChild(taskClone);
        // Ajouter la liste à la page
        document.body.appendChild(ulClone);
        
        // ferme le modal et incrémente le nombre de tâches
        
            if(taskCategory.textContent == "PLANNED") {
                plannedCount++;
                plannedCountText.textContent = plannedCount.toString();
                plannedContainer.appendChild(task); 
            } else if(taskCategory.textContent == "IN PROGRESS") {
                inProgressCount++;
                inProgressCountText.textContent = inProgressCount.toString();
                inProgressContainer.appendChild(task); 
            } else if(taskCategory.textContent == "COMPLETED") {
                completedCount++;
                completedCountText.textContent = completedCount.toString();
                completedContainer.appendChild(task); 
        }
        // Sauvegardez les données de la tâche dans le stockage local
        var titleTaskLocalStorage = inputTitle.value;
        var taskData = {
            title: inputTitle.value,
            description: taskText4.textContent,
            urgent: buttonUrgent.checked,
            onHold: buttonOnHold.checked,
            category: task.parentNode.className
        };
        localStorage.setItem(`task_${titleTaskLocalStorage}`, JSON.stringify(taskData));
        allTask = document.querySelectorAll('.task'); 
        closeModal();
        

        if(darkButton.classList.length == 2){
            task.classList.add('darkTask'); 
        }
       
        
    }
}

function changeCategoryTask(){
    if(taskCategory.textContent == "PLANNED"){
        taskCategory.textContent = 'IN PROGRESS';
    } else if(taskCategory.textContent == "IN PROGRESS"){
        taskCategory.textContent = 'COMPLETED';
    } else if(taskCategory.textContent == "COMPLETED"){
        taskCategory.textContent = 'PLANNED';
    }
}

taskCategory.addEventListener('click', changeCategoryTask);
quotationMark.addEventListener('click', changeCategoryTask);





function addCategoryTask(){
    addTask.forEach(element => {
    
        element.addEventListener('click', (event) => {
            modal.style.display = 'block';
            if(event.target.parentNode.className == "plannedContainer"){
                taskCategory.textContent = 'PLANNED';
                    
            }else if(event.target.parentNode.className == "inProgressContainer" || event.target.parentNode.className == "inProgressContainer darkInProgressContainer"){
                taskCategory.textContent = 'IN PROGRESS';
                    
            } else if (event.target.parentNode.className == "completedContainer" || event.target.parentNode.className == "completedContainer darkCompletedContainer"){
                    taskCategory.textContent = 'COMPLETED';
                } 
        })
    }); 

addTaskAll.forEach(element =>{
    element.addEventListener('click', (event) => {
        modal.style.display = 'block';
        console.log(event.target.parentNode.parentNode.className); 
        if(event.target.parentNode.parentNode.className == "plannedContainer"){
            taskCategory.textContent = 'PLANNED';
                       
        } else if(event.target.parentNode.parentNode.className == "inProgressContainer" || event.target.parentNode.parentNode.className == "inProgressContainer darkInProgressContainer"){
            taskCategory.textContent = 'IN PROGRESS';
                       
        } else if (event.target.parentNode.parentNode.className == "completedContainer" || event.target.parentNode.parentNode.className == "completedContainer darkCompletedContainer"){
            taskCategory.textContent = 'COMPLETED';
        } 
    })
})
};

addCategoryTask(); 

function deleteTask(event){
let taskBinAll = document.querySelectorAll('.clickedTask > img:nth-child(2)');
taskBinAll.forEach(element =>{
    if(event.target==element){
        let taskElement = element.parentNode;
        

        if(taskElement.parentNode.childNodes[0].nodeName == "#text"){
            var keyName = "task_" + taskElement.parentNode.childNodes[4].childNodes[4].textContent;
        } else {
            var keyName = "task_" + taskElement.parentNode.childNodes[0].childNodes[0].textContent; 
        }

        if(taskElement.parentNode.parentNode.className == "plannedContainer"){
            plannedCount--;
            plannedCountText.textContent = plannedCount.toString();
                   
        }else if(taskElement.parentNode.parentNode.className == "inProgressContainer"){
            inProgressCount--; 
            inProgressCountText.textContent = inProgressCount.toString();
                   
        } else if (taskElement.parentNode.parentNode.className == "completedContainer"){
                completedCount--; 
                completedCountText.textContent = completedCount.toString();
            }
        element.parentNode.parentNode.remove(); 
        localStorage.removeItem(keyName);
    }

})
}


var elements = []; 
var keys = Object.keys(localStorage);

keys.forEach(function(key){
    var valeur = localStorage.getItem(key);
    elements.push(valeur);
})



function recreateTaskElements(){
    elements.forEach(element =>{
        var parsedElement = JSON.parse(element); // Si vos données sont stockées au format JSON
        var recreateTask = document.createElement('div');
        recreateTask.classList.add('task'); 
        recreateTask.setAttribute('tabindex', '0');
        recreateTask.setAttribute('draggable', 'true');
        var recreateNoClickedTask = document.createElement('div');
        recreateNoClickedTask.classList.add('noClickedTask'); 
        
        var recreateTitle = document.createElement('p'); 
        recreateTitle.textContent = parsedElement.title; 
        var recreateAlert = document.createElement('div'); 
        recreateAlert.classList.add('alert'); 
        if(parsedElement.urgent == true){
            recreateAlert.classList.add('alertUrgent');  
        } else if(parsedElement.onHold == true){
            recreateAlert.classList.add('alertOnHold');  
        }
        var recreateMenu = document.createElement('p');
        recreateMenu.classList.add('clear');
        recreateMenu.textContent = '...';
        
        recreateTask.appendChild(recreateNoClickedTask);
        recreateNoClickedTask.appendChild(recreateTitle);
        recreateNoClickedTask.appendChild(recreateAlert);
        recreateNoClickedTask.appendChild(recreateMenu); 
        var recreateButtonTask = document.createElement('p'); 
        if(parsedElement.urgent == true){
            recreateButtonTask.textContent = "URGENT";
            recreateButtonTask.classList.add('taskAlertUrgent'); 
        } else if(parsedElement.onHold == true){
            recreateButtonTask.textContent = "ON HOLD";
            recreateButtonTask.classList.add('taskAlertOnHold'); 
        } else {
            recreateButtonTask.hidden = true; 
        }
        recreateTask.appendChild(recreateButtonTask); 
        var recreateClickedTask = document.createElement('div');
        recreateClickedTask.classList.add('clickedTask'); 
        recreateTask.appendChild(recreateClickedTask); 
        var recreateDescription = document.createElement('p');
        recreateDescription.textContent = parsedElement.description; 
        recreateClickedTask.appendChild(recreateDescription); 
        if(parsedElement.category == 'plannedContainer'){
            plannedCount++;
            plannedCountText.textContent = plannedCount.toString();
            plannedContainer.appendChild(recreateTask); 
        } else if (parsedElement.category == 'inProgressContainer'){
            inProgressCount++;
            inProgressCountText.textContent = inProgressCount.toString();
            inProgressContainer.appendChild(recreateTask); 
        } else {
            completedCount++;
            completedCountText.textContent = completedCount.toString();
            completedContainer.appendChild(recreateTask); 
        }

        if(parsedElement.urgent == true){
            var recreateTaskAlert = document.createElement('p'); 
            recreateTaskAlert.classList.add('taskAlertUrgent'); 
            recreateTaskAlert.textContent = 'URGENT'; 
        } else if(parsedElement.onHold == true){
            var recreateTaskAlert = document.createElement('p'); 
            recreateTaskAlert.classList.add('taskAlertOnHold'); 
            recreateTaskAlert.textContent = 'ON HOLD'; 
        }
        var recreateBin = document.createElement('img');
        recreateBin.src = 'picture/Corbeille.svg';
        recreateBin.width = 25;
        recreateBin.height = 26;
        recreateBin.alt = 'Corbeille';
        recreateBin.className = 'clear';
        recreateClickedTask.appendChild(recreateBin); 
    })
}

recreateTaskElements();

function deleteAllCompleteTask(){
    const completedContainerTask = Array.from(completedContainer.childNodes).filter(node => {
        return node.tagName === 'DIV' && node.classList.contains('task');
        }
    );
    completedContainerTask.forEach(divTask => {
        
        divTask.remove(); 
        if(divTask.childNodes[0].nodeName == "#text"){
            divTaskKey = 'task_' + divTask.childNodes[4].childNodes[4].textContent;
        } else {
            var divTaskKey = 'task_'+ divTask.childNodes[0].childNodes[0].textContent;
        }
        
        localStorage.removeItem(divTaskKey);
    });
    completedCount = 0;
    completedCountText.textContent = completedCount.toString();
}


document.addEventListener('click', deleteTask); 
completedContainerBin.addEventListener('click', deleteAllCompleteTask); 
document.getElementById("app").appendChild(clone);


function filterTaskWhenType(){
        let filterText = filterTask.value; 
        let allTaskTitle = document.querySelectorAll(".noClickedTask > p:nth-child(1)");
        allTaskTitle.forEach(element =>{
        let parentTask = element.parentNode.parentNode;

        /* fonction if qui sert à avoir un impact sur les tâches actualisé et les tâches créer post actualisation */
        if(parentTask.childNodes[0].nodeName == "#text"){
            var taskDescription = parentTask.childNodes[4].childNodes[4].textContent
        } else {
            var taskDescription = parentTask.childNodes[0].childNodes[0].textContent;
        }
        // let taskDescription = parentTask.childNodes[6].childNodes[3].textContent;
        
        if(filterText ==''){
            element.parentNode.parentNode.style.display="block"; 
            
        } else if(element.textContent.toLowerCase().includes(filterText) == false && taskDescription.toLowerCase().includes(filterText) == false){
        
            element.parentNode.parentNode.style.display="none"; 
        } else if (element.textContent.toLowerCase().includes(filterText) == true || taskDescription.toLowerCase().includes(filterText) == true){
            element.parentNode.parentNode.style.display="block";
        }
    })
}

filterTask.addEventListener('input', filterTaskWhenType); 

const darkButton = document.querySelector('.darkButton'); 
const app = document.querySelector('#app'); 
const header = document.querySelector('header'); 
const clearLogo = document.querySelector('header > img:nth-child(1)');
const darkLogo = document.querySelector('.darkLogoHidden'); 
const darkButtonCircle = document.querySelector('.darkButtonCircle');
const clearElement = document.querySelectorAll('.clear'); 
const modalContent = document.querySelector('.modalContent');
let allTask = document.querySelectorAll('.task'); 
const allCloneTask = clone.querySelectorAll('.task'); 

function darkMode() {
    app.classList.toggle('darkApp'); 
    header.classList.toggle('darkHeader'); 
    clearLogo.classList.toggle('clearLogo');
    darkLogo.classList.toggle('darkLogo'); 
    filterTask.classList.toggle('darkFilterTask'); 
    newTask.classList.toggle('darkNewTask'); 
    darkButton.classList.toggle('darkButtonActivate'); 
    darkButtonCircle.classList.toggle('darkButtonActivateCircle'); 
    plannedContainer.classList.toggle('darkPlannedContainer'); 
    plannedCountText.classList.toggle('darkCount'); 
    inProgressCountText.classList.toggle('darkCount'); 
    completedCountText.classList.toggle('darkCount'); 
    inProgressContainer.classList.toggle('darkInProgressContainer');
    completedContainer.classList.toggle('darkCompletedContainer'); 

    addTask.forEach(element =>{
        element.classList.toggle('darkAddTask'); 
    })
    clearElement.forEach(element =>{
        element.classList.toggle('dark'); 
    })
    modalContent.classList.toggle('darkModalContent'); 
    cross.classList.toggle('darkCross'); 
    console.log(allTask); 
    allTask.forEach(element =>{
        console.log(element);
        element.classList.toggle('darkTask'); 
    })
    // allTaskClone.forEach(element =>{
    //     console.log(element);
    //     element.classList.toggle('darkTask');
    // })

}

darkButton.addEventListener('click', darkMode); 



document.addEventListener('keydown', (event) =>{
    if(event.key === 'Enter') {
        submitInfo();
    }
});

//.append


// document.addEventListener('click', (event) =>{
//     if(event.target){
//         console.log(event.target); 
//     }
// }); 

//drag n drop

let dragSrcEl = null;

// Gestionnaire pour le début du glissement
function handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    this.classList.add('dragging');
}

// Gestionnaire pour le survol pendant le glissement
function handleDragOver(e) {

        e.preventDefault();

    this.classList.add('over');
    e.dataTransfer.dropEffect = 'move';
    return false;
}

// Gestionnaire pour quitter le survol
function handleDragLeave() {
    this.classList.remove('over');
}

// Gestionnaire pour le lâcher
function handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();

    if (dragSrcEl !== this) {
        if(dragSrcEl.parentNode !== this.parentNode){
            if(dragSrcEl.parentNode.childNodes[1].childNodes[3].className == 'plannedCount'){
                plannedCount--;
                plannedCountText.textContent = plannedCount.toString();
            } else if(dragSrcEl.parentNode.childNodes[1].childNodes[3].className == 'inProgressCount'){
                inProgressCount--;
                inProgressCountText.textContent = inProgressCount.toString();
            } else if(dragSrcEl.parentNode.childNodes[1].childNodes[3].className == 'completedCount'){
                completedCount--;
                completedCountText.textContent = completedCount.toString();
            }

            if(this.parentNode.childNodes[1].childNodes[3].className == 'plannedCount'){
                plannedCount++;
                plannedCountText.textContent = plannedCount.toString();
            } else if(this.parentNode.childNodes[1].childNodes[3].className == 'inProgressCount'){
                inProgressCount++;
                inProgressCountText.textContent = inProgressCount.toString();
            } else if(this.parentNode.childNodes[1].childNodes[3].className == 'completedCount'){
                completedCount++;
                completedCountText.textContent = completedCount.toString();
            }
        }

        var taskContainer = this.parentNode.className;
        var taskName = dragSrcEl.childNodes[0].childNodes[0].textContent;

        console.log(taskName); 
        // Déplacez l'élément glissé (dragSrcEl) après l'élément cible (this)
        this.parentNode.insertBefore(dragSrcEl, this.nextSibling);
    
        
        elements.forEach(element =>{
            var parsedData = JSON.parse(element);
            console.log(parsedData.title); 

            if(taskName == parsedData.title){
                // parsedData.category = taskContainer; 
                var keyName = "task_"+parsedData.title;
                var currentValue = localStorage.getItem(keyName); 
                var taskValue = JSON.parse(currentValue);
                taskValue.category = taskContainer; 
                var newValue = JSON.stringify(taskValue); 
                localStorage.setItem(keyName, newValue); 
            }
        }) 
        
        
    }

    return false;
}

// Gestionnaire pour la fin du glissement
function handleDragEnd() {
    this.classList.remove('over');
    this.classList.remove('dragging');
}

allTask.forEach(element =>{
    element.addEventListener('dragstart', handleDragStart, false); 
    element.addEventListener('dragenter', handleDragOver, false);
    element.addEventListener('dragover', handleDragOver, false);
    element.addEventListener('dragleave', handleDragLeave, false);
    element.addEventListener('drop', handleDrop, false);
    element.addEventListener('dragend', handleDragEnd, false); 
    element.addEventListener('mouseleave', () => {
        element.classList.remove('over'); 
    })
    
}); 

// window.addEventListener('beforeunload', function (event) {
//     // Votre code ici, par exemple, pour demander une confirmation avant le rechargement
//     event.returnValue = 'Voulez-vous vraiment quitter cette page ?';
// });