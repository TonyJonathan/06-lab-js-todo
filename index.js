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

    console.log(addNewTask.parentNode);
   

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
            
        }
        
        if(event.target == buttonOnHold && clickOnHold == 0){
            clickOnHold++; 
            clickUrgent = 0;
        } else if (event.target == buttonOnHold && clickOnHold == 1){
            buttonOnHold.checked = false;
            clickOnHold--;
        }
    }
  
    document.addEventListener('click', clickAgainReset); 

    function openModal(){
        taskCategory.textContent = 'PLANNED'; 
        modal.style.display = 'block'; 
        inputTitle.classList.remove('error'); 
        inputTitle.placeholder = 'Title of the task';
        inputTitle.value = ''; 
        textAreaDescription.value = ''; 
        buttonOnHold.checked = false; 
        buttonUrgent.checked = false; 
        clickUrgent = 0; 
        clickOnHold = 0; 
    }

    function closeModal(){
        modal.style.display = 'none';
    }



    newTask.addEventListener('click', openModal);
    cross.addEventListener('click', closeModal); 

    submit.addEventListener('click', submitInfo); 

function submitInfo(){
    
    if(inputTitle.value == ''){
        inputTitle.placeholder = 'Please add a title to your task'; 
        inputTitle.classList.add('error'); 
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



document.getElementById("app").appendChild(clone);



// document.addEventListener('click', (event) =>{
//     if(event.target){
//         console.log(event.target); 
//     }
// }); 

function addNewTask(){
    addTask.forEach(element => {
        
        element.addEventListener('click', (event) => {
        modal.style.display = 'block';
        console.log(event.target.parentNode.className);
        if(event.target.parentNode.className == "inProgressContainer"){
            taskCategory.textContent = 'IN PROGRESS'
                   
        } else if (event.target.parentNode.className == "completedContainer"){
                taskCategory.textContent = 'COMPLETED'
                console.log('completed');
            } 
    })
        }); 

        

        
    };

    // {
    //     modal.style.display = 'block';
    //     if(element.parentNode.className == "inProgressContainer"){
    //         taskCategory.textContent = 'IN PROGRESS'
    //         console.log('inprogress');
    //     } else if (element.parentNode.className == "completedContainer"){
    //         taskCategory.textContent = 'COMPLETED'
    //         console.log('completed');
    //    

    // function addNewTask(){
    //     addTask.forEach(element => {
    //         console.log(element.parentNode.className);
    //         element.addEventListener('click', (event) =>{
    //             if(event.target){
    //                 console.log(event.target.parentNode.className); 
    //             }
    //         });
    //         if(element.parentNode.className == "inProgressContainer"){
    //             inputTitle.textContent = 'IN PROGRESS'
    //         } else if (element.parentNode.className == "completedContainer"){
    //             inputTitle.textContent = 'COMPLETED'
    //         } else {
    //             console.log('aaaahah')
    //         }
    //     });



addNewTask(); 

//.append

// <template> utilisé pour créer un template pour inserer les tache que l'on viendra cloner à chaque fois

