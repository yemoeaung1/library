let myLibrary = [];

function Book(name, author, page, read) {
    this.name = name;
    this.author = author;
    this.page = page;
    this.read = read;
}

function addBookToLibrary(Book) {
    myLibrary.push(Book);
}

const main_container = document.getElementsByClassName('main-feed')[0];

function createBook(Book) {
    const book_div = document.createElement('div');
    const title = document.createElement('h2'); 
    const author = document.createElement('p'); 
    const page = document.createElement('p'); 
    const read = document.createElement('p'); 

    book_div.setAttribute("class", "book")
    read.setAttribute("id", "read-status");
    

    title.textContent = "Title: " + Book.name;
    author.textContent = "Author: " + Book.author;
    page.textContent = "Page Count: " +Book.page;
    read.textContent = "Read: " + Book.read;

    book_div.appendChild(title);
    book_div.appendChild(author);
    book_div.appendChild(page);
    book_div.appendChild(read);

    return book_div;
    // main_container.appendChild(book_div);
    
}

function displayBooks(myLibrary) {
    main_container.innerHTML = '';
    myLibrary.forEach(function(Book, index) {
        const book_div = createBook(Book);
        removeBook(book_div, index);
        updateBook(book_div, index);
        
        book_div.setAttribute('id', index);
        main_container.appendChild(book_div);
    });
}

function updateBook(book_div, index) {
    const updateButton = document.createElement('button');
    updateButton.textContent = "Update";
    let status = book_div.querySelector("#read-status");
    updateButton.addEventListener('click', function() {
        if(myLibrary[index].status === true) {
            myLibrary[index].status = false;
        } else {
            myLibrary[index].status = true;
        }
        status.textContent = "Read: " + myLibrary[index].status;
    });
    book_div.appendChild(updateButton);

}

function removeBook(book_div, index) {
    const removeButton = document.createElement('button');
    removeButton.setAttribute('data-bookID', index);
    removeButton.textContent = "Remove";
    removeButton.addEventListener('click', () => {
        main_container.removeChild(main_container.children[index])
            myLibrary.splice(index, 1);
    });
    book_div.appendChild(removeButton);
}


function getBookInput(form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const page = document.getElementById('page').value;
        let read = document.getElementById('status');

        if(title.trim() == '' || author.trim() == '' || page.trim() == '') {
            alert("You must fill in all fields");
            return;
        }


        let status = false;
        read.addEventListener('change', function() {
            if (read.checked) {
                status = true;
            }
        });

        const book = new Book(title, author, page, status);
        addBookToLibrary(book);
        displayBooks(myLibrary);
        form.reset();
    });
}

const input_form = document.getElementById('new-book');
getBookInput(input_form);
