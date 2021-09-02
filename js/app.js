/* get all the field value */
const inputField=document.getElementById('input-field');
const searchField=document.getElementById('button-search');
const searchEmpty=document.getElementById('empty-string');
const resultDiv=document.getElementById('result-field');
const errorDiv=document.getElementById('error');
const bookCountDiv=document.getElementById('book-count');

const search=()=>{
   
    const inputText=inputField.value;
    // console.log(inputText);
    inputField.value="";  /* for search field empty */
    /* if any one search empty string */
    if(inputText===""){
        searchEmpty.innerHTML=`<p class="text-info" >Give a valid book title.</p>`
        errorDiv.innerHTML="";
        resultDiv.innerHTML="";
        bookCountDiv.innerHTML="";
        return;
    }
    else{
        searchEmpty.innerText="";
        
    }
    /* clear field */
    searchEmpty.innerHTML="";
    resultDiv.innerHTML="";
    bookCountDiv.innerHTML="";

    /* fetch part && convert to json */
    const url=`https://openlibrary.org/search.json?q=${inputText}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>findBooks(data))
    
}

 

    

const findBooks=books=>{
     /* console.log(books.docs.length); *//* need it so much */
      
      /* for wrong book name written */
    if(books.docs.length=== 0){
        errorDiv.innerHTML=`
        <div class="card-header fs-4 mt-5 text-center">Error</div>
        <div class="card-body">
            <h5 class="card-title ">Your Result Not Be Found.</h5>
            <p class="card-text">Put a valid book name.</p>
        </div>
        `
    }
    else{
        errorDiv.innerHTML="";
    }

    /* for book matching number  */
    if(books.docs.length>0){
        bookCountDiv.innerHTML=`
        <div id="count-div" class="card-body  text-Dark fs-4 ">
        <p>Matching <span class="text-light"> ${books.docs.length}</span> books from total 1000. </p>
        </div>
        `
    }
    else{
        bookCountDiv.innerHTML="";
    }



    /* for search result submit div */
    const findBook=books.docs;
    findBook.forEach(myBook => {
         console.log(myBook);
        const url=`https://covers.openlibrary.org/b/id/${myBook.cover_i}-M.jpg`
        
        const div=document.createElement('div')
        div.classList.add('col');
       
        div.innerHTML=`
        <div class="card">
            
            <div class="card-body">
                <img src="${url}" class="card-img-top" alt="">
                <h5 class="card-title"><span class="text-primary">Book Name:</span>${myBook.title}</h5>
                <p class="card-text fs-5"><span class="text-primary">author-Name:</span>${myBook.author_name}</p>
                <p class="card-text fs-5"><span class="text-primary">first_publish_year:</span> ${myBook.first_publish_year}</p>
                <p class="card-text fs-5"><span class="text-primary">publish_date:</span> ${myBook.publish_date[0]}</p>
                <p class="card-text fs-5"><span class="text-primary">type:</span> ${myBook.type}</p>
            </div>
        </div>
        `
        resultDiv.appendChild(div) ;


        
    });
    
    
}

