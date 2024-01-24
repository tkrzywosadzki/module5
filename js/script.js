'use strict';

// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   });

const links = document.querySelectorAll('.titles a');

for(let link of links){
    console.log(link);
}

const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!')

    /* [DONE] remove class 'active' from all arcitles */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);

    /* [DONE] remove class 'active from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* [DONE[ get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute("href");
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attrubute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');

}

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}


/* generate title links script */

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

function generateTitleLinks(){

    /*remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = '';

    /*for each article */

    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);

    let html = '';
        /* get the article id */

    for(let article of articles){
        const articleId = article.getAttribute("id");
        // console.log(articleId);

        /* find the title element */

        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        // console.log(articleTitle);

        /* get the title from the title element */

        /* create HTML of the link */

        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        // console.log(linkHTML);

        /* insert link into titleList */

        // titleList.innerHTML = titleList.innerHTML + linkHTML;
        html = html + linkHTML;
        console.log(html);

    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }

}

generateTitleLinks();