const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

let apiQuotes = [];

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function loadingComplete(){
        quoteContainer.hidden = false;
        loader.hidden = true;
}

function newQuotes(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   
    if(quote.author === ''){
        authorText.textContent = 'Unknown';
    }else{
        authorText.textContent = quote.author;
    }
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    loadingComplete();
}

async function getQuote(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
  try{
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuotes();
  }catch(error){
    
  }
}

function tweetQuote(){
    const quote = quoteText.textContent;
    const author = authorText.textContent;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuotes);
twitterBtn.addEventListener('click', tweetQuote);

getQuote();

