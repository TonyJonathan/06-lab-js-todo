const template = document.getElementById("mon-template");
    const clone = document.importNode(template.content, true);

   

document.getElementById("app").appendChild(clone);


//.append

// <template> utilisé pour créer un template pour inserer les tache que l'on viendra cloner à chaque fois

