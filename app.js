console.log("Hello World!\n==========\n");

// PROJECT Section
console.log("PROJECT:\n==========\n");

let addBookForm = document.getElementById("addBookForm");


class Book {
    constructor(id, title, author, read){
        this.id = id;
        this.title = title;
        this.author = author;
        this.read = read;
    }
}

class Library {
    constructor(bookCount, bookArray){
        this.bookCount = bookCount;
        this.bookArray = bookArray;
    }

    markRead(checkbox, id){
        
        for(let i = 0; i < this.bookArray.length; i++){
            if(id == this.bookArray[i].id){
                let foundBook = this.bookArray[i]
                foundBook.read = true;
                checkbox.disabled = true;
            }
        }
    }

    removeBook(bookTitle, id){

        //removing book from bookArray
        let filteredBooks = this.bookArray.filter((element) => {
            if (element.id != id){
                return false;
            }
            else{
                return true;
            }
        });
        this.bookArray = filteredBooks;

        let bookTable = document.getElementById("tableBody");
        let tableRows = bookTable.getElementsByTagName("tr");
        
        for(let i = 0; i <= tableRows.length; i++){
            let bookT = tableRows[i].getElementsByTagName("td")[0];
            if(bookT.textContent == bookTitle){
                let rowToRemove = tableRows[i];
                rowToRemove.remove();
                break;
            }
        }

    }

    addBook(){
        //grabbing values from user input
        let id = this.bookCount
        let bookTitle = document.getElementById("bookTitle").value
        let bookAuthor = document.getElementById("bookAuthor").value
        let hasRead = document.getElementById("hasRead").checked
        //creating new book object
        let newBook = new Book(id, bookTitle, bookAuthor, hasRead);

        //resetting data fields for user
        document.getElementById("bookTitle").value = "";
        document.getElementById("bookAuthor").value = "";
        document.getElementById("hasRead").checked = false;


        //creating table row and cells for new book to be added
        let newRow = document.createElement("tr");
        let titleCell = document.createElement("td");
        let authorCell = document.createElement("td");
        let readCell = document.createElement("td");
        let checkmarkBox = document.createElement("input");
        //allowing checkmark box to call the markRead method when it gets clicked
        checkmarkBox.type = "checkbox";
        checkmarkBox.addEventListener("change", () => {
            this.markRead(checkmarkBox, id);
        });

        //adding remove button
        let removeCell = document.createElement("td");
        let removeButton = document.createElement("input");
        removeButton.type = "button";
        removeButton.value = "Remove";
        removeButton.className = "removeButton";
        removeButton.addEventListener("click", () => {
            this.removeBook(bookTitle, id);
        });

        //adding content to cells
        titleCell.textContent = newBook.title;
        authorCell.textContent = newBook.author;
        checkmarkBox.checked = newBook.read;
        if(checkmarkBox.checked){
            checkmarkBox.disabled = true;
        }

        console.log(newBook);

        //appending cells to new row
        readCell.append(checkmarkBox);
        removeCell.append(removeButton);
        newRow.append(titleCell);
        newRow.append(authorCell);
        newRow.append(readCell);
        newRow.append(removeCell);

        //appending new row to library table
        let bookTable = document.getElementById("tableBody");
        bookTable.append(newRow);
        
        //adding new book to library array
        this.bookArray.push(newBook);

        //increasing book count
        this.bookCount += 1;

        console.log(this.bookArray);
    }

}



const newLibary = new Library(0, []);
console.log(newLibary);


let addBookButton = document.getElementById("addBook");
addBookButton.addEventListener("click", function(){
    newLibary.addBook();
    removeBookButtons = document.querySelectorAll(".removeButton");
});


