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

    // This is my API key
    var apiKey = "77052775b2b34705b38c13c6e71667d7";

  //Re-render #search-results to display the appropriate content

    // Define URL
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey 
                    + "&q=" + searchTerms
                    + "&page=1&begin_date=" + startYear + "0000"
                    + "&end_date=" + endYear + "0000";
    
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      
      // Create a div to hold each group of search results
      var searchResults = $("<div class='news-articles'>");
      
      // Store the headline data
      var headline = response.docs.headline.main;

      // Create an element to have the Headline displayed
      var pHeadline = $("<p>").text(headline);

      // Displaying the Headline
      searchResults.append(pHeadline);

      // Store the author data
      var author = response.docs.byline.original;

      // Create an element to have the author displayed
      var pAuthor = $("<p>").text(author);

      // Displaying the author
      searchResults.append(pAuthor);

      // Store the section data
      var section = response.docs.section_name;

      // Create an element to have the section name displayed
      var pSection = $("<p>").text("Section: " + section);

      // Displaying the section
      searchResults.append(pSection);

      // Store the date-released data
      var dateReleased = response.docs.pub_date;

      // Create an element to have the date released displayed
      var pDateReleased = $("<p>").text(dateReleased);

      // Displaying the date released
      searchResults.append(pDateReleased);

      // Store the Link to the News Story
      var linkToContent = response.docs.web_url;

      // Creating an element to hold the Link to the News Story
      var aLinkToContent = $("<a>").attr("href", linkToContent);

      // Append the Link to the News Story
      searchResults.append(aLinkToContent);

      // Put each block of articles on the page
      $("#search-results").append(searchResults);
    });
  });