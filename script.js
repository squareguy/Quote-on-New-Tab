var 
xhr,
yql = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%20%3D%20%22http%3A%2F%2Fapi.forismatic.com%2Fapi%2F1.0%2F%3Fmethod%3DgetQuote%26format%3Djson%26lang%3Den%22&format=json", 
quoteEle = document.getElementById("quote"), 
authorEle = document.getElementById("author"), 
now = new Date();
var quotes = new Array(), authors = new Array();
document.body.setAttribute("class", now.getHours() >= 18 || now.getHours() <= 5 ? "night" : "day");
var footer = document.getElementsByTagName("footer")[0];
var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
footer.innerHTML = "Today is " + days[now.getDay()] + ", " + now.getDate() + " " + months[now.getMonth()] + ", " + now.getFullYear();
if (localStorage.getItem("quoteN")) {
  quoteEle.innerHTML = localStorage.quoteN;
  authorEle.innerHTML = localStorage.authorN;
}
else callApi();

function parseQuote(response) {
  console.log("parseQuote is running");
  if (!localStorage.getItem("quoteN")) {
    quoteEle.innerHTML = response.query.results.json.quoteText;
    authorEle.innerHTML = response.query.results.json.quoteAuthor === "" ? "Anonymous" : response.query.results.json.quoteAuthor;
    callApi();
  }
  localStorage.quoteN = response.query.results.json.quoteText;
  localStorage.authorN = response.query.results.json.quoteAuthor === '' ? "Anonymous" : response.query.results.json.quoteAuthor;
  localStorage.read = "false";
}

authorEle.addEventListener("click", function() {
  var wiki = window.open("https://www.google.co.in/#q=" + encodeURIComponent(authorEle.innerHTML));
});

function callApi() {
  xhr = new XMLHttpRequest();
  xhr.open("GET", yql);
  xhr.send();
  xhr.onreadystatechange = function(){
    if(xhr.status === 200 && xhr.readyState === 4)
    parseQuote(JSON.parse(xhr.response));
    };
}

quoteEle.addEventListener("click", function() {
  if (localStorage.read === "false") {
    localStorage.read = "true";
    callApi();
  }
});
