let appDiv = document.getElementById("app");

// There are 2 end-points for getting data.
// The first one - /users - returns the list of users.
const users = [
  { name: "Avtushenko Andrey", books: [1, 2, 6] },
  { name: "Belousova Daryay", books: [4, 6] },
  { name: "Mirzoev Ruslan", books: [] },
];

// The second one - /books - returns the list of books.
const books = [
  { id: 1, name: "The Da Vinci Code", author: "Dan Braun" },
  { id: 2, name: "Clean code", author: "Robert Martin" },
  { id: 3, name: "William Shakespeare", author: "Hamlet" },
  { id: 4, name: "Faust", author: "Johann Wolfgang von Goethe" },
  { id: 5, name: "Nineteen Eighty-Four", author: "George Orwell" },
  { id: 6, name: "Brave New World", author: "Aldous Huxley" },
];

// Each user has a "books" field, which stores the books read by the user.
// It is necessary to display a list of users with all their books.

// The final array that should be obtained.
// const result = [
//   {
//     name: 'Avtushenko Andrey',
//     books: [
//       { id: 1, name: 'The Da Vinci Code', author: 'Dan Braun' },
//       { id: 2, name: 'Clean code', author: 'Robert Martin' },
//       { id: 6, name: 'Brave New World', author: 'Aldous Huxley' },
//     ],
//   },
//   {
//     name: 'Belousova Daryay',
//     books: [
//       { id: 4, name: 'Faust', author: 'Johann Wolfgang von Goethe' },
//       { id: 6, name: 'Brave New World', author: 'Aldous Huxley' },
//     ],
//   },
//   {
//     name: 'Mirzoev Ruslan',
//     books: [],
//   },
// ];

// The result can be output via console.log(), or via html.

let outputData = [];

function createOutputData() {
  for (let user of users) {
    let booksByUser = [];

    // for (let book of books) {
    //   for (let userBookId of user.books) {
    //     if (book.id === userBookId) {
    //       booksByUser.push(book);
    //     }
    //   }
    // }

    books.forEach((book) => {
      user.books.forEach((userBookId) => {
        if (book.id === userBookId) {
          booksByUser.push(book);
        }
      });
    });

    const newOutputItem = {
      name: user.name,
      books: booksByUser,
    };

    outputData.push(newOutputItem);
  }

  return outputData;
}

function createHtmlList(data) {
  const htmlListElement = createHtmlListElement();

  for (let i = 0; i < data.length; i++) {
    let htmlNode = data[i];
    let htmlNodeElement = createHtmlListNodeElement(htmlNode);

    htmlListElement.appendChild(htmlNodeElement);

    if ("books" in htmlNode && htmlNode.books.length > 0) {
      htmlNodeElement.appendChild(createHtmlList(htmlNode.books));
    }
  }

  return htmlListElement;
}

function createHtmlListElement() {
  const htmlList = document.createElement("ul");
  return htmlList;
}

function createHtmlListNodeElement(htmlNodeData) {
  const htmlNode = document.createElement("li");

  if (!htmlNodeData.id) {
    htmlNode.textContent = `${htmlNodeData.name}`;
  } else {
    htmlNode.textContent = `${htmlNodeData.id}, ${htmlNodeData.name}, ${htmlNodeData.author}`;
  }

  return htmlNode;
}

function appendToDiv() {
  appDiv.appendChild(createHtmlList(outputData));
}

createOutputData();
appendToDiv();
