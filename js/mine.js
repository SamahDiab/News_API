var links = document.getElementsByClassName("nav-link");
var news ;
var category = "general";
var country = "eg";
var searchInp = document.getElementById("search");
var searchBtn = document.getElementById("myBtn");
var term ;
var changeCountry = document.getElementsByClassName("country-link");
var countryShortcut = document.getElementsByClassName("shortcut");


getNews()

searchBtn.addEventListener("click",function(){
     term = searchInp.Value;
     globalSearch(); 

})


for(var i = 0; i<changeCountry.length; i++)
{
    changeCountry[i].addEventListener("click", function(e){

       // country = e.target.getAttribute("title");
        country = this.getAttribute("title");
        //console.log(country);
        getNews();

    })
}

for(var i = 0; i < links.length; i++)
{
    links[i].addEventListener("click", function(e){
        category = e.target.innerHTML;
        getNews();
    })
}


function getNews(){
    var url = `https://newsapi.org/v2/top-headlines?country=`+country+`&category=`+category+`&apiKey=367dbbc0b2f24b64a848b3c77680b574`
    var req ;
    if(window.XMLHttpRequest){
        req = new XMLHttpRequest();
    }
    else{
    req = new ActiveXObject("microsoft.XMLHTTP");
    }
    req.open("GET",url);

    req.onreadystatechange = function(){
        if(req.readyState==4 && req.status == 200){
            news = JSON.parse(req.response);
            news = news.articles
            displayNews();
        }
    }
    req.send();
}

function  displayNews(){
     var temp="";
     for(var i=0 ; i< news.length ; i++){
         temp +=` <div class="col-md-4 col-sm-6 col-xs-12">
                    <img src="`+news[i].urlToImage+`" class="img-fluid" />
                    <div class="p-2">
                        <h5 class="news-header">`+news[i].title+`</h5>
                        <p class="text-muted">`+news[i].description+`</p>
                    </div>
                </div>
            `
     }
     document.getElementById("newsRow").innerHTML = temp;
}


 function globalSearch(){
    var url = `https://newsapi.org/v2/everything?q=`+term+`&from=2019-07-21&sortBy=publishedAt&apiKey=367dbbc0b2f24b64a848b3c77680b574`
    var req ;
    if(window.XMLHttpRequest){
        req = new XMLHttpRequest();
    }
    else
    {
        req = new ActiveXObject("microsoft.XMLHTTP");
    }
    req.open("GET",url);

    req.onreadystatechange = function()
    {
        if(req.readyState == 4 && req.status == 200){
            news = JSON.parse(req.response);
            news = news.articles
            displayNews();
        }
    }
    req.send();

 }

