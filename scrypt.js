"use strict"

fetch('https://dummyjson.com/posts')
.then((response)=>response.json())
.then((json)=>showPosts(json))

function reaction_elements(count){
    let reaction_block = document.createElement('div');
    reaction_block.className = 'reaction_block';

    let iru = document.createElement('input');
    iru.type = 'button';
    iru.name = 'iru';
    iru.id = 'iru';
    iru.value = 'Increase';
    reaction_block.append(iru);

    let reaction = document.createElement('div');
    reaction.className = 'reaction';
    reaction.innerText = count;
    reaction_block.append(reaction);

    let ird = document.createElement('input');
    ird.type = 'button';
    ird.name = 'ird';
    ird.id = 'ird';
    ird.value = 'Decrease';
    reaction_block.append(ird);

    return reaction_block;
}

function post_html (obj) {
    let post                = document.createElement('div');
    post.className          = 'post';
    
    post.append(reaction_elements(obj.reactions));


    let post_content        = document.createElement('div');
    post_content.className  = 'post_content';
    post.append(post_content);
    
    let title               = document.createElement('h1');
    title.innerText         = obj.title;
    post_content.append(title);
    
    let body                = document.createElement('p');
    body.innerText          = obj.body;
    post_content.append(body);
    
    let tags                = document.createElement('div');
    tags.className          = 'tags';
    post_content.append(tags);
    for (const tag of obj.tags){
        let t = document.createElement('div')
        t.className         = 'tag';
        t.innerText         = tag;
        tags.append(t);
    }
    
    fetch(`https://dummyjson.com/comments/post/${obj.id}`)
    .then(res => res.json())
    .then(cmmnts => {
        if (cmmnts.total > 0){
            let comments            = document.createElement('div');
            comments.className      = 'comments';
            post_content.append(comments);

            for (const cmmnt of cmmnts.comments) {
                let comment = document.createElement('div');
                comment.className      = 'comment';
            
                let uname = document.createElement('b');
                let text = document.createElement('p');
                
                uname.innerText = cmmnt.user.username;
                text.innerText = cmmnt.body;
        
                comment.append(uname,text);
                comments.append(comment);
            }
        }
    });
    
    return post;
}


function showPosts(json){
    let content = document.body.children.content;
    content.innerHTML = '';
    
    for (const post of json.posts){
        content.append(post_html(post));
    }
}















let btnsearch = document.querySelector('#btnsrc');
btnsearch.addEventListener("click", showSearch);

function showSearch(){
    let vsearch = document.querySelector('#src').value;
    console.log(vsearch);
    fetch(`https://dummyjson.com/posts/search?q=${vsearch}`)
    .then((response)=>response.json())
    .then((json)=>showPosts(json))
}