const template = document.getElementById("mon-template");
    const clone = document.importNode(template.content, true);

    const buttonUrgent = clone.querySelector('.urgent > input'); 
    const buttonOnHold = clone.querySelector('.onHold > input'); 

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


document.getElementById("app").appendChild(clone);


//.append

// <template> utilisé pour créer un template pour inserer les tache que l'on viendra cloner à chaque fois

