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
    const plannedContainer = clone.querySelector('.plannedContainer');
    const inProgressContainer = clone.querySelector('.inProgressContainer');
    const completedContainer = clone.querySelector('.completedContainer');

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

        // ajoute la tâche
        const listTemplate = document.getElementById('listTemplate');
        const ulClone = document.importNode(listTemplate.content, true);
        const todoList = ulClone.querySelector('#todoList');
        
        const taskTemplate = document.getElementById('taskTemplate');
        const taskClone = document.importNode(taskTemplate.content, true);

        let task = taskClone.querySelector('.task'); 

        let noClickedTask = taskClone.querySelector('.noClickedTask');

        let taskText1 = taskClone.querySelector('.noClickedTask > p:nth-child(1)');
        taskText1.textContent = inputTitle.value;
        let alert = taskClone.querySelector('.alert'); 
        

        if(buttonUrgent.checked==true){
            alert.classList.add('alertUrgent'); 
            console.log("aller"); 
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
        closeModal(); 
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





submit.addEventListener('click', function() {

    if(inputTitle.value == ''){

    } else {
        console.log(inputTitle.value); 
    }
});


function deleteTask(event){
    let taskBinAll = document.querySelectorAll('.clickedTask > img:nth-child(2)');

    taskBinAll.forEach(element =>{
        if(event.target==element){
            element.parentNode.parentNode.remove(); 
        }
        
    })
}

document.addEventListener('click', deleteTask); 
 

document.getElementById("app").appendChild(clone);

//.append

// <template> utilisé pour créer un template pour inserer les tache que l'on viendra cloner à chaque fois

