'use strict';

// Variabel för att spara url
var url = 'http://localhost/projekt-api/projects.php';

//Händelsehanterare som startar när sidan öppnas
window.onload = getProjects();

function getProjects(){
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        // Variabel som kommer innehålla all data
        let outPut = '';
        // loop för att gå igenom all data för utskrift
        data.forEach(function(post){
          outPut +=`
          <div class="pages">
          <a href="${post.url}" target="_blank">
          <img src="${post.image}" width="350" height="400" alt="project"></a>
          <h3 class="page-title">${post.title}</h3>
          <p class="page-desc">${post.project_desc}</p>
          </div>
          `
        });
        // Skriver ut innehållet i outPut till DOM
          var items = document.getElementsByClassName("grid-container"),i,len;
          
        // loop through all elements having class name ".my-class"
        for (i = 0, len = items.length; i < len; i++) {
            items[i].innerHTML = outPut;
        }
    })
}




