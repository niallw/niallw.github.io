jQuery(document).ready(function() {
    jQuery('.header-opener').click(function(e) {
        jQuery('.header-nav').slideToggle(500);
  
        e.preventDefault();
    });
     
});

jQuery(document).ready(function() {
    jQuery('.calendar-opener').click(function(e) {
        jQuery('.calendar-container').slideToggle(500);
		jQuery('.calendar-opener').find((".fa-chevron-down")).toggleClass('fa-flip-vertical', 1);
		
        e.preventDefault();
    });
     
});

jQuery(document).ready(function() {
	jQuery('.toggler').click(function(e) {
		jQuery(this).next('.collapsed').slideToggle(500);
		jQuery(this).find('.fa-arrow-circle-down').toggleClass('fa-flip-vertical');

		e.preventDefault();
	});
});

jQuery(document).ready(function() {
	jQuery('.menu-item-has-children').hover(function(e) {
		jQuery(this).find('.fa-caret-down').toggleClass('fa-flip-vertical');
		jQuery(this).next('.sub-menu').slideToggle(500);
		e.preventDefault();
	});
});


jQuery(document).ready(function() {
   
	jQuery('#tax').on('change', function() {
		this.form.submit();
	});
  
	/*setInterval(function(){
   
    jQuery(".rotthis").toggleClass("toggled");

	}, 5000);*/
	
	let slideIndex = 0;
	showSlides();

	function showSlides() {
		let i;
		let slides = document.getElementsByClassName('rotthis');
		if(typeof slides !== 'undefined'){
			for (i = 0; i < slides.length; i++) {
			slides[i].style.visibility = 'hidden';
			slides[i].style.opacity = '0';
			slides[i].style.height = '0px';
			}
			slideIndex++;
			if (slideIndex > slides.length) {slideIndex = 1}
			slides[slideIndex-1].style.visibility = 'visible';
			slides[slideIndex-1].style.opacity = '1';
			slides[slideIndex-1].style.height = 'auto';
			if(slides.length > 1) {setTimeout(showSlides, 9000);} // Change image every 2 seconds
		}
	}
	
});
