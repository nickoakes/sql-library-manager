/*
    SQL Library Manager
    pagination.js
*/

//pagination

let allBooks = document.querySelectorAll('tbody > tr');
let numberPerPage = 5;

function showPage(list, page) {
    let startIndex = (page * numberPerPage) - numberPerPage;
    let endIndex = page * numberPerPage;
 
    for(let i = 0; i < list.length; i++) {
       if(i >= startIndex && i < endIndex) {
          list[i].style.display = '';
       } else {
          list[i].style.display = 'none';
       }
    }
 }

 function appendPageLinks(list) {
    const pageDiv = document.querySelector('#paginationLinks');
    const ul = document.createElement('ul');
 
 //five books per page
 
    const pagesNeeded = Math.ceil(list.length / 5);
  
    pageDiv.appendChild(ul);
 
 //page navigation
    
    for(let i = 0; i < pagesNeeded; i++){
       const li = document.createElement('li');
       ul.appendChild(li);
       const a = document.createElement('a');
       a.href = '#';
       a.textContent = i + 1;
       li.appendChild(a);
    }
 
    const anchors = document.querySelectorAll('a');
 
 //make page 1 navigation item active on initial page load
 
    ul.firstElementChild.firstElementChild.className = "active";
 
 //add click event listener to each page navigation element
 
    for(let i = 0; i < anchors.length; i++) {
       anchors[i].addEventListener('click', (e) => {
       const liCollection = ul.getElementsByTagName('li');
 
 //remove and reassign active class according to the navigation link clicked
 
    for(let i = 0; i < liCollection.length; i++) {
       liCollection.item(i).firstElementChild.className = "";
    }
       e.target.className = "active";
       showPage(list, e.target.textContent);
    })
 }
 }

 //function calls
appendPageLinks(allBooks);
showPage(allBooks, 1);