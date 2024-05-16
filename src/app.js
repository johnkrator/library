const bookForm = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");

// Theme toggle
const themeToggleBtn = document.getElementById("themeToggle");
const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

// Load books from local storage on page load
window.addEventListener("load", () => {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    renderBooks(books);
});

// Add a new book
bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const description = document.getElementById("description").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("isRead").checked;

    const book = {title, author, description, pages, isRead};

    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));

    renderBooks(books);

    bookForm.reset();
});

// Remove a book
bookList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        const bookTitle = e.target.parentElement.querySelector("h3").textContent;
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books = books.filter((book) => book.title !== bookTitle);
        localStorage.setItem("books", JSON.stringify(books));
        renderBooks(books);
    }
});

// Render books
function renderBooks(books) {
    bookList.innerHTML = "";

    books.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("bg-white", "dark:bg-gray-900", "rounded-lg", "shadow-md", "p-6");
        const title = document.createElement("h3");
        title.classList.add("text-xl", "font-bold", "mb-2", "text-gray-800", "dark:text-white");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.classList.add("text-gray-700", "dark:text-gray-300", "mb-2");
        author.textContent = `Author: ${book.author}`;

        const description = document.createElement("p");
        description.classList.add("text-gray-700", "dark:text-gray-300", "mb-2");
        description.textContent = `Description: ${book.description}`;

        const pages = document.createElement("p");
        pages.classList.add("text-gray-700", "dark:text-gray-300", "mb-2");
        pages.textContent = `Pages: ${book.pages}`;

        const isRead = document.createElement("p");
        isRead.classList.add("text-gray-700", "dark:text-gray-300", "mb-2");
        isRead.textContent = book.isRead ? "You have read this book" : "You have not read this book";

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-btn", "bg-red-500", "hover:bg-red-700", "text-white", "font-bold", "py-2", "px-4", "rounded");
        removeBtn.textContent = "Remove";

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(description);
        bookCard.appendChild(pages);
        bookCard.appendChild(isRead);
        bookCard.appendChild(removeBtn);

        bookList.appendChild(bookCard);
    });
}

// Change the icons inside the button based on previous settings
if (localStorage.getItem("color-theme") === "dark" || (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    themeToggleLightIcon.classList.remove("hidden");
} else {
    themeToggleDarkIcon.classList.remove("hidden");
}

// Toggle the icons inside the button
themeToggleBtn.addEventListener("click", function () {
    // Toggle the icons inside the button
    themeToggleDarkIcon.classList.toggle("hidden");
    themeToggleLightIcon.classList.toggle("hidden");

    // If set via local storage previously
    if (localStorage.getItem("color-theme")) {
        if (localStorage.getItem("color-theme") === "light") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("color-theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("color-theme", "light");
        }
    } else {
        // If not set via local storage previously
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("color-theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("color-theme", "dark");
        }
    }
});