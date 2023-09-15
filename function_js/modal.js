const template = document.getElementById("mon-template");
const clone = document.importNode(template.content, true);
const buttonUrgent = clone.querySelector('.urgent > input'); 
const buttonOnHold = clone.querySelector('.onHold > input'); 
const newTask = clone.querySelector('.new_task'); 
const cross = clone.querySelector('.taskDescription > .clear:nth-child(3)');
const modal = clone.querySelector('.modal'); 
const inputTitle = clone.querySelector('.modalContent > input:nth-child(2)');
const textAreaDescription = clone.querySelector('.textArea'); 
const taskCategory = clone.querySelector('.taskDescription > p:nth-child(1)'); 

let clickUrgent = 0; 
let clickOnHold = 0; 

export {clickUrgent}; 
export {clickOnHold};
export {buttonUrgent};
export {buttonOnHold}; 


// Lorsque que l'on clic sur le bouton URGENT ou ON HOLD, clicAgainReset permet de recliquer dessus pour annuler la sélection

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






