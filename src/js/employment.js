'use strict';

// Variabel för att spara url
var url = 'http://localhost/projekt-api/employment.php';

//Händelsehanterare som startar när sidan öppnas
window.onload = getEmployment();

function getEmployment(){
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        // Variabel som kommer innehålla all data
        let outPut = '';
        // loop för att gå igenom all data för utskrift
        data.forEach(function(post){
          outPut +=`
          <div class="card">
          <div class="inner">
          <h2 clas="title">${post.place}</h2>
          <p>${post.title}</p>
          <p class="subtitle">${post.start_year} - ${post.end_year} </p>
          </div>
          </div>
          `
        });

        // Skriver ut innehållet i outPut till DOM
          document.getElementById("employment").innerHTML = outPut;
    
    })
}




