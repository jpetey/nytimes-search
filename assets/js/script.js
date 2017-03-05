

// This function handles events when SEARCH button is clicked
  $("#submit-data").on("click", function(event) {
    
    // Prevent button from doing its usual job
    event.preventDefault();
    
    // Grab the input from all textboxes
    var searchTerms = $("#search-terms").val().trim();
    console.log(searchTerms);

    var numberToReturn = parseInt($("#record-count").val());
    console.log(numberToReturn);

    var startYear = $("#start-year").val().trim();
    console.log(startYear);

    var endYear = $("#end-year").val().trim();
    console.log(endYear);

    // Adding movie from the textbox to our array
    // movies.push(movie);
});    