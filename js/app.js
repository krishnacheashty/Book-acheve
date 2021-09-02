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
     console.log(books);
      /* for wrong book name written */
    if(books.docs.length=== 0){
        errorDiv.innerHTML=`
        <div class="card-header fs-4 text-center text-dark">Error</div>
        <div class="card-body">
            <h5 class="card-title text-dark">Your Result Not Be Found.</h5>
            <p class="card-text text-dark text-center fs-5">Put a valid book name.</p>
        </div>
        `
    }
    else{
        errorDiv.innerHTML="";
    }

    /* for book matching number  */
    if(books.docs.length>0){
        // console.log(books.docs.length);
        bookCountDiv.innerHTML=`
        <div id="count-div" class="card-body  text-Dark fs-4 ">
        <p>Matching <span class="color-change"> ${books.docs.length}</span> books from total <span class="color-change"> ${books.numFound}.</span> showing  21 result only.</p>
        </div>
        `
    }
    else{
        bookCountDiv.innerHTML="";
    }



    /* for search result submit div */
    const findBook=books.docs.slice(0,21);
    findBook.forEach(myBook => {
        //  console.log(myBook);
        const url=`https://covers.openlibrary.org/b/id/${myBook.cover_i}-M.jpg`
        
        const div=document.createElement('div')
        div.classList.add('col');
        const publishDay=myBook.publish_date;
       
        div.innerHTML=`
        <div class="card">
            
            <div id="bg-info" class="card-body ">
                <div><img src="${url}" 
                id="div-hight" 
                class="card-img-top img-fluid" alt=""></div>
                <h5 class="card-title">
                <span class="text-primary">Book Name:</span>
                ${myBook.title}</h5>
                <p class="card-text fs-5">
                <span class="text-primary">author-Name:</span>
                ${myBook.author_name}</p>
                <p class="card-text fs-5">
                <span class="text-primary">first_publish_year:</span>
                 ${myBook.first_publish_year}</p>
                <p class="card-text fs-5">
                <span class="text-primary">publish_date:</span> 
                ${publishDay}</p>
                <p class="card-text fs-5">
                <span class="text-primary">contributor:</span> 
                ${myBook.contributor}</p>
            </div>
        </div>
        `
        resultDiv.appendChild(div) ;


        
    });
    
    
}

