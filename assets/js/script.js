// This is my API key
    var apiKey = "77052775b2b34705b38c13c6e71667d7";

  //Re-render #search-results to display the appropriate content using a fx
  function getResults (numberToReturn, queryURL) {

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(results) {
     
    console.log("Query URL after GET: "+ queryURL);

    console.log(results);

    for (var i = 0; i < numberToReturn; i++) {
      // Create a div to hold each group of search results
      var searchResults = $("<div class='news-articles'>");
      
      // Check if headline is 'null' so your code doesn't break
      if (results.response.docs[i].headline) {

        // Store the headline data
        var headline = results.response.docs[i].headline.main;
        console.log("Log Headline: " + headline);        

        // Create an element to have the Headline displayed
        var pHeadline = $("<p>").text(headline);

        // Displaying the Headline
        searchResults.append(pHeadline);
      }

      // Check if headline is 'null' so your code doesn't break
      if(results.response.docs[i].byline && results.response.docs[i].byline.original !=="null") {

        // Store the author data
        var author = results.response.docs[i].byline.original;
        console.log("Log Author: " + author)

        // Create an element to have the author displayed
        var pAuthor = $("<p>").text(author);

        // Displaying the author
        searchResults.append(pAuthor);
      }

      if (results.response.docs[i].section_name !=="null") {
        // Store the section data
        var section = results.response.docs[i].section_name;
        console.log("Log section: " + section);

        // Create an element to have the section name displayed
        var pSection = $("<p>").text("Section: " + section);

        // Displaying the section
        searchResults.append(pSection);
      } 

      if (results.response.docs[i].pub_date !=="null") {
        // Store the date-published data
        var dateReleased = results.response.docs[i].pub_date;

        // Create an element to have the date published displayed
        var pDateReleased = $("<p>").text(dateReleased);
        console.log("Log date published: " + pDateReleased)

        // Displaying the date published
        searchResults.append(pDateReleased);
      }

      if (results.response.docs[i].web_url !=="null") {
        // Store the Link to the News Story
        var linkToContent = results.response.docs[i].web_url;
        console.log(linkToContent);

        // Creating an element to hold the Link to the News Story
        var aLinkToContent = $("<a>").attr("href", linkToContent);

        // Append the Link to the News Story
        searchResults.append(aLinkToContent);
      }         
    }

      // Put each block of articles on the page
      $("#search-results").append(searchResults);

    });
  };


// This function handles events when SEARCH button is clicked
  $("#submit-data").on("click", function(event) {
    
    // Prevent button from doing its usual job
    event.preventDefault();

    // Empty search-results if needed
    $("#search-results").empty();
    
    // Grab the input from Search Terms field
    var searchTerms = $("#search-terms").val().trim();
    console.log(searchTerms);

    // Create an initial queryURL
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey 
                    + "&q=" + searchTerms;

    // Grab the input from # of Records to Return field
    var numberToReturn = parseInt($("#record-count").val());
    console.log(numberToReturn);

    // Grab the input from Start Year field
    var startYear = $("#start-year").val().trim();
    console.log(startYear);

    // Grab the input from End Year field
    var endYear = $("#end-year").val().trim();
    console.log(endYear);

    // Check if user inputted a Start Year; If so include queryURL
    console.log(parseInt(startYear))

    if (parseInt(startYear)) {
      queryURL = queryURL + "&begin_date=" + startYear + "0000";
    }

    // Check if user inputted an End Year; If so include queryURL
    console.log(parseInt(endYear))
    if (parseInt(endYear)) {
      queryURL = queryURL + "&end_date=" + endYear + "0000";
    }

    // Run getResults function
    getResults (numberToReturn, queryURL);

  });

// Clear the search results section on clear button click
$('#clear-data').on('click', function(){

  $("#search-results").empty();
})
