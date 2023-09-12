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
const containerTask = clone.querySelectorAll('.containerTask > div'); 

let plannedCountText = clone.querySelector('.plannedCount');
let inProgressCountText = clone.querySelector('.inProgressCount');
let completedCountText = clone.querySelector('.completedCount');
let plannedCount = parseInt(clone.querySelector('.plannedCount').textContent);
let inProgressCount = parseInt(clone.querySelector('.inProgressCount').textContent);
let completedCount = parseInt(clone.querySelector('.completedCount').textContent);



let clickUrgent = 0; 
let clickOnHold = 0; 


export function clickAgainReset(event){
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




export function openModal(){
    modal.style.display = 'block'; 
    inputTitle.classList.remove('error'); 
    inputTitle.placeholder = 'Title of the task';
    inputTitle.value = ''; 
}


export function closeModal(){
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

document.addEventListener('click', clickAgainReset); 

newTask.addEventListener('click', openModal);
cross.addEventListener('click', closeModal); 