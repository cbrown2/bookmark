// console.log("hello");

// Event Listener for form submit
document.querySelector('#myForm').addEventListener("submit", saveBookmark);

//Save bookmarks
function saveBookmark(e) {
e.preventDefault();

//console.log("Hello from saveBookmark");

//Get User input
var siteName = document.querySelector("#siteName").value;

console.log(siteName)

var siteUrl = document.getElementById("siteUrl").value;
console.log(siteUrl);

//Create an object for bookmark
var bookmark = {
  name: siteName,
  url: siteUrl,


};
//check if name or url is empty
console.log(bookmark);
if(siteName ===""||siteUrl === "") {
  alert("Site name and url cannot be empty");
  return false;
}

//localStorage.getItem("test", "Hello World");
//console.log(localStorage.getItem("test"));
// store bookmarks array into local storage
// check if the bookmarks array exists
if(localStorage.getItem("bookmarks")===null ){
    // Init bookmarks array
    var bookmarks =[];
    //Adding new bookmark into array
    bookmarks.push(bookmark);
    //Set to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}else {
//Get bookmarks from local storage
var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
// Add new bookmarks into bookmarks
bookmarks.push(bookmark);
//Reset bookmarks from local storage
localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
//reset the form
document.querySelector("#myForm").reset();
fetchBookmarks();
}
//fetch Bookmarks
function fetchBookmarks() {

// Get bookmarks from local storage
var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
//get the output div by id
var bookmarksResult = document.querySelector("#bookmarksResult"); 

//console.log(bookmarksResult);

//Reset the output div
bookmarksResult.innerHTML ="";
//loop through bookmarks
for (var i= 0; i < bookmarks.length; i++) {
  var name = bookmarks[i].name;
  var url = bookmarks[i].url;
  bookmarksResult.innerHTML += 
'<div>' +
  '<h3>'+ 
    name + ' ' +
      '<a class = "btn btn-success" href=" '+url+'">Visit</a>' + 
      '<button class= "btn btn-danger" onclick="deleteBookmark(\''+ name +"')\">Delete</button>" +
      "</h3>" +
    "</div>";
}
}
function deleteBookmark(name) {
//console.log(name);
//getbookmarks from local storage
var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
//loop through bookmarks
for(var i = 0; i < bookmarks.length; i++) {
  // remove the bookmark with the given name
  if(bookmarks[i].name === name) {
    bookmarks.splice(i, 1);
    break;
  }
}
//reset bookmarks back to local storage
localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
// Re-fetch bookmarks Result
fetchBookmarks();
}
