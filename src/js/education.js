'use strict';

// Variabel för att spara url
var url = 'http://localhost/projekt-api/education';

//Händelsehanterare som startar när sidan öppnas
window.onload = getEducation();

function getEducation(){
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        // Variabel som kommer innehålla all data
        let outPut = '';
        // loop för att gå igenom all data för utskrift
        data.forEach(function(post){
          outPut +=`
          <div class="container right">
          <div class="content">
          <h2>${post.start_year} - ${post.end_year}</h2>
          <span>${post.edu_name}</span>
          <p>${post.program_name}</p>
          </div>
          </div>
          `
        });
        // Skriver ut innehållet i outPut till DOM
          var items = document.getElementsByClassName("timeline"),i,len;
          
        // loop through all elements having class name ".my-class"
        for (i = 0, len = items.length; i < len; i++) {
            items[i].innerHTML = outPut;
        }
    })
}




