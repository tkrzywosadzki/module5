'use strict';

// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   });

const links = document.querySelectorAll('.titles a');

for(let link of links){
    console.log(link);
}

const titleClickHandler = function(){
    console.log('Link was clicked!')
    console.log(event)

    /* remove class 'active' from all arcitles */

    /* add class 'active' to the clicked link */

    /* remove class 'active from all articles */

    /* get 'href' attribute from the clicked link */

    /* find the correct article using the selector (value of 'href' attrubute) */

    /* add class 'active' to the correct article */
}

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}