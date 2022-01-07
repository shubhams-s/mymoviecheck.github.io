let textBox = document.getElementById("textBox");
let results = document.querySelector('.results');

document.body.addEventListener("click", ()=>{
    results.classList.add("hidden");
});

const fetchMovies = async (searchText) => {
    const res = await fetch('movies.json');
    const movies = await res.json();


    let matches = movies.filter(movie => {
        return movie.title.toLowerCase().includes(searchText.toLowerCase()) || movie.year.includes(searchText);
    })
  
 
    
   let myhtml = matches.length == 0 ? `<div class="noresults"> Sorry No Results </div>` : matches.map(movie => `<div class="padder">
    <div class="moviecard">
        <div class="img"><img src=${movie.posterUrl} class="poster"></div>
        <div class="left">
            <div class="title">${movie.title.replace(new RegExp(searchText, "gi"), (match) => `<mark>${match}</mark>`)}</div>
            <div class="plot">${movie.plot}</div>
            <div class="period">
                <div class="year">${movie.year.replace(new RegExp(searchText, "gi"), (match) => `<mark>${match}</mark>`)}</div>
                <div class="runtime">${movie.runtime} min</div>
            </div>
           
        </div>
        
    </div>
    </div>`
    ).join('');
    results.classList.remove('hidden');

    if(textBox.value == "")
    {
     myhtml = "";
     matches = [];
     results.classList.add("hidden");
    }

results.innerHTML = myhtml;
  
}


textBox.addEventListener("keyup", () => {
    fetchMovies(textBox.value);
})

