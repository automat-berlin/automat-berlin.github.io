$(document).ready(function() {
	
	setTimeout(function() {
	  if( location.hash && $(location.hash).length > 0 ) { // if there is a hash in the URL and that ID exists on the page
	    window.scrollTo(0, 0); // <- Keeps the page from jumping by default
			    
	    setTimeout( function() {
	      TweenLite.to(window, 1, {scrollTo: $(location.hash).offset().top -120 });
	    }, 500 ); // This is my delay so the smooth scroll doean't start immediately ... adjust to your needs
	        
	  }
	}, 1);

	//  Bind scroll to anchor links
	$(document).on("click", "a[href^=#]", function(e) {
			e.preventDefault();
	    var id = $(this).attr("href");
	
	    if($(id).length > 0) {
	        e.preventDefault();
	
	        TweenLite.to(window, 1, {scrollTo: $(id).offset().top -120 });
	
	        // If supported by the browser we can also update the URL
	        if (window.history && window.history.pushState) {
	            history.pushState("", document.title, id);
	        }
	    };
	});
	
});