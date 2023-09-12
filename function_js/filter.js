const template = document.getElementById("mon-template");
const clone = document.importNode(template.content, true);
const filterTask = clone.querySelector('header > input');



export function filterTaskWhenType(){
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