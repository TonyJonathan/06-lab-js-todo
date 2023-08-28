const template = document.getElementById("mon-template");
    const clone = document.importNode(template.content, true);

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

    let plannedCountText = clone.querySelector('.plannedCount');
    let inProgressCountText = clone.querySelector('.inProgressCount');
    let completedCountText = clone.querySelector('.completedCount');

    let plannedCount = parseInt(clone.querySelector('.plannedCount').textContent);
    let inProgressCount = parseInt(clone.querySelector('.inProgressCount').textContent);
    let completedCount = parseInt(clone.querySelector('.completedCount').textContent);

    
    console.log(plannedCountText); 
    let clickUrgent = 0; 
    let clickOnHold = 0; 

    
// il faudra ajouter le fait que cliquer sur l'un réinitialise l'autre :)
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
        closeModal(); 
            if(taskCategory.textContent == "PLANNED") {
                plannedCount++;
                plannedCountText.textContent = plannedCount.toString();
            } else if(taskCategory.textContent == "IN PROGRESS") {
                inProgressCount++;
                inProgressCountText.textContent = inProgressCount.toString();
            } else if(taskCategory.textContent == "COMPLETED") {
                completedCount++;
                completedCountText.textContent = completedCount.toString();
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







// document.addEventListener('click', (event) =>{
//     if(event.target){
//         console.log(event.target); 
//     }
// }); 

function addCategoryTask(){
    addTask.forEach(element => {
        
        element.addEventListener('click', (event) => {
        modal.style.display = 'block';
        if(event.target.parentNode.className == "plannedContainer"){
            taskCategory.textContent = 'PLANNED';
                   
        }else if(event.target.parentNode.className == "inProgressContainer"){
            taskCategory.textContent = 'IN PROGRESS';
                   
        } else if (event.target.parentNode.className == "completedContainer"){
                taskCategory.textContent = 'COMPLETED';
            } 
    })
        }); 

    addTaskAll.forEach(element =>{
        element.addEventListener('click', (event) => {
            modal.style.display = 'block';

            if(event.target.parentNode.parentNode.className == "plannedContainer"){
                taskCategory.textContent = 'PLANNED';
                           
            } else if(event.target.parentNode.parentNode.className == "inProgressContainer"){
                taskCategory.textContent = 'IN PROGRESS';
                           
            } else if (event.target.parentNode.parentNode.className == "completedContainer"){
                taskCategory.textContent = 'COMPLETED';
            } 
        })
    })
        
};

addCategoryTask(); 




document.getElementById("app").appendChild(clone);

//.append

// <template> utilisé pour créer un template pour inserer les tache que l'on viendra cloner à chaque fois

