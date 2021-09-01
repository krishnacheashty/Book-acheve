
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
    if(inputText===""){
        searchEmpty.innerText="Give a valid book title."
        errorDiv.innerHTML="";
        resultDiv.innerHTML="";
        return;
    }
    else{
        searchEmpty.innerText="";
        
    }
    /* clear field */
    searchEmpty.innerHTML="";
    resultDiv.innerHTML="";
    bookCountDiv.innerHTML="";

    const url=`http://openlibrary.org/search.json?q=${inputText}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>findBooks(data))
    
}

 

    

const findBooks=books=>{
    console.log(books.docs);/* need it so much */
      
      
    if(books.docs.length=== 0){
        errorDiv.innerHTML=`
        <div class="card-header fs-4 text-center">Error</div>
        <div class="card-body">
            <h5 class="card-title ">Your Result Not Be Found.</h5>
            <p class="card-text">Put a valid book name.</p>
        </div>
        `
    }
    else{
        errorDiv.innerHTML="";
    }


    if(books.docs.length>0){
        bookCountDiv.innerHTML=`
        <div class="card-body bg-info text-dark fs-4 ">
        <p>Matching ${books.docs.length} books from total 100. </p>
        </div>
        `
    }




    const findBook=books.docs;
    findBook.forEach(myBook => {
        // console.log(myBook);
        const url=`https://covers.openlibrary.org/b/id/${myBook.cover_i}-M.jpg`
        
        const div=document.createElement('div')
        div.classList.add('col');
       
        div.innerHTML=`
        <div class="card">
            <img src="${url}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title"><span class="text-primary">Book Name:</span>${myBook.title}</h5>
                <p class="card-text fs-5"><span class="text-primary">author-Name:</span>${myBook.author_name}</p>
                <p class="card-text fs-5"><span class="text-primary">first_publish_year:</span> ${myBook.first_publish_year}</p>
                <p class="card-text fs-5"><span class="text-primary">publish_date:</span> ${myBook.publish_date}</p>
            </div>
        </div>
        `
        resultDiv.appendChild(div) ;


        
    });
    
    
}

