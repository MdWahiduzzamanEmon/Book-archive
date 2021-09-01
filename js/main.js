const cardDiv = document.getElementById("card-div");
const inputDiv = document.getElementById("input-div");

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
    const inputField = document.getElementById("inputField");
    const inputFieldValue = inputField.value;
  
    // pass input value 
    const url = ` http://openlibrary.org/search.json?q=${inputFieldValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => getData(data.docs))
        .finally(inputField.value = "");
    cardDiv.textContent = "";
    
})

const getData = books => {
    if (books.length === 0) {
        inputDiv.classList.remove("d-none");
        
        } else if(books.length){
            inputDiv.innerHTML=`Found total ${books.length} books`
       
        }
    
    
        books.forEach(book => {
            if (
                book.cover_i === undefined ||
                book.first_publish_year === undefined ||
                book.author_name
                === undefined || book.first_publish_year === undefined) {
                const div = document.createElement("div");
                div.innerHTML = `
          <div class="card h-100">
                         
                         <img src="" class="card-img-top img-fluid" height="50" alt="Sorry no image found">
                         
                        <div class="card-body">
                            <h5 class="card-title">
                            <p ><span class="fw-bold"></span>Book Name:</span>${book.title}</p>
                            <p ><span>Author Name:</span>NO record found</p>
                            <p ><span>Publisher:</span>NO record found</p>
                            <p ><span>First Publish:</span>NO record found</p>
                            </h5>
                           
                        </div>
                    </div>
        `;
                cardDiv.appendChild(div);
            } else {
                const div = document.createElement("div");
                div.innerHTML = `
          <div class="card h-100">
                         <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid h-50" alt="cover">
                         
                        <div class="card-body">
                            <h5 class="card-title">
                            <p ><span class="fw-bold"></span>Book Name:</span>${book.title}</p>
                            <p ><span>Author Name:</span>${book.author_name}</p>
                            <p ><span>Publisher:</span>${book.publisher}</p>
                            <p ><span>First Publish:</span>${book.first_publish_year}</p>
                            </h5>
                           
                        </div>
                    </div>
        `;
                cardDiv.appendChild(div);
            }
        
        })
    }
// }