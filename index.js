const template = document.getElementById("mon-template");
    const clone = document.importNode(template.content, true);

    const header = document.createElement("div"); 
    header.classList.add("header");

    clone.appendChild(header);

    

        const logo = document.createElement("img");
        logo.setAttribute("src", "picture/logo.png");
        logo.setAttribute("alt", "To do list écrit à côté d'une liste à compléter sur un calpin");
        logo.classList.add("logo"); 

        clone.appendChild(logo);
        header.appendChild(logo); 

        const filter = document.createElement("input");
        filter.setAttribute("type", "text");
        filter.setAttribute("placeholder", "Type to filter task...");

        header.appendChild(filter);



        const newTaskButton = document.createElement("div");
        newTaskButton.classList.add("new_task");

            const p1 = document.createElement("p");
            p1.textContent = "+";


            const p2 = document.createElement("p");
            p2.textContent = "New task";
            

            newTaskButton.appendChild(p1);
            newTaskButton.appendChild(p2);

        
        header.appendChild(newTaskButton); 

        const darkButton = document.createElement("div");
        darkButton.classList.add("darkButton"); 

            const darkButtonCircle = document.createElement("div");
            darkButtonCircle.classList.add("darkButtonCircle"); 
            darkButton.appendChild(darkButtonCircle);

        header.appendChild(darkButton); 

    

    document.getElementById("app").appendChild(clone);