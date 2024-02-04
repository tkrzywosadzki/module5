'use strict';

// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   });

const templates = {

  titleLink: Handlebars.compile(document.querySelector('#title-list-template').innerHTML),
  articleTagLink: Handlebars.compile(document.querySelector('#article-tag-template').innerHTML)
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  console.log(link);
}

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all arcitles */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE[ get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attrubute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');

};

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}


/* generate title links script */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post .post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

function generateTitleLinks(customSelector = '') {

  /*remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = '';

  /*for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  //console.log(articles);

  let html = '';
  /* get the article id */

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    // console.log(articleId);

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    // console.log(articleTitle);

    /* get the title from the title element */

    /* create HTML of the link */

    const linkHTML = templates.titleLink({articleId: articleId, articleTitle: articleTitle});
    // console.log(linkHTML);

    /* insert link into titleList */

    // titleList.innerHTML = titleList.innerHTML + linkHTML;
    html = html + linkHTML;
    console.log(html);

  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {max: '0', min: '999999'};

  for(let tag in tags){
    if(tags[tag] > params.max) {
      params.max = tags[tag];
    }
  }

  for(let tag in tags) {
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      //console.log(tag);
      /* generate HTML of the link */
      const tagHTML = templates.articleTagLink({tagName: tag});
      //console.log(tagHTML);
      /* add generated code to html variable */
      html = html + tagHTML;
      //console.log(html);
      if(!allTags[tag]){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = html;
    /* END LOOP: for every article: */
  }
  const tagList = document.querySelector(optTagsListSelector);

  //tagList.innerHTML = allTags.join(' ');
  console.log(allTags);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  let allTagsHTML = '';

  for(let tag in allTags){
    allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
  }
  console.log(allTagsHTML);

  tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]'); // '.post-tags .list a.active'
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]'); // (a[href^="#tag-"])
  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}


addClickListenersToTags();

function generateAuthors() {
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles){
    const authorList = article.querySelector(optArticleAuthorSelector);

    //let html = '';

    const author = article.getAttribute('data-author');

    const authorHTML = '<a href="#author-' + author + '">' + 'by '  + author + '</a>';

    //html = html + authorHTML;

    authorList.innerHTML = authorHTML;
    console.log(authorHTML);

    if(!allAuthors[author]){
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    console.log(allAuthors);
  }

  const authorList = document.querySelector(optAuthorsListSelector);

  //tagList.innerHTML = allTags.join(' ');
  //console.log(allTags);

  // const tagsParams = calculateTagsParams(allTags);
  // console.log('tagsParams:', tagsParams);

  let allAuthorsHTML = '';

  for(let author in allAuthors){
    allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + ' ('+ allAuthors[author] +')</a></li>';
  }
  console.log(allAuthorsHTML);

  authorList.innerHTML = allAuthorsHTML;

}

generateAuthors();


function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  const href = clickedElement.getAttribute('href');
  console.log(href);

  const author = href.replace('#author-', '');
  console.log(author);

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }

  const authorsLinks = document.querySelectorAll('a[href="' + href + '"]');

  for (let authorLink of authorsLinks) {
    authorLink.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {

  const links = document.querySelectorAll('a[href^="#author-"]');

  for (let link of links) {

    link.addEventListener('click', authorClickHandler);

  }
}

addClickListenersToAuthors();