/* CUSTOM JQUERY
/*--------------------------------------------------------------------------------------------------------------------------------------*/
;(function($, window, document, undefined) {
	'use strict';
	var $win = $(window);
	var $doc = $(document);
	var $winW = function(){ return $(window).width(); };
	var $winH = function(){ return $(window).height(); };
	$(document).ready(function() {
/*--------------------------------------------------------------------------------------------------------------------------------------*/
		
		/*========================================================== 
		 PRELOADER JS
		========================================================== */	
		$(window).on('load', function() {
            $('.preloader-bounce').fadeOut();
            $('.preloader').delay(350).fadeOut('slow');
        });
		
		/*========================================================== 
		 ANIMATIONS WITH WATPOINTS 
		 ========================================================== */
		$('.animated-row').each(function(){
			var $this = $(this);
			$this.find('.animate').each(function(i){
				var $item = $(this);
				var animation = $item.data('animate');
				$item.waypoint(function(){
						setTimeout(function () {
								$item.addClass('animated '+animation).removeClass('animate');
						}, i*50);
				},
				{
						offset: '100%',
						triggerOnce: true
				});
			});
		});
			
		/*========================================================== 
		 BACK TO TOP ARROW
		========================================================== */
		$(window).on('scroll',function () {
			if( $(window).scrollTop() > 200 ){
				$('.back-top').fadeIn();
			} else {
				$('.back-top').fadeOut();
			}
		});
		
		/*========================================================== 
		 TEXT TYPE IN MAIN BANNER
		========================================================== */
		if($(".typed-text").length) {
			$(".typed-text").typed({
				strings: ["Creative", "Developers", "Designers"],
				typeSpeed: 40,
				backSpeed: 6,
				backDelay: 2000,
				loop: true
			 });
		 }
		
		/*========================================================== 
		 SMOOTH SCROLLING BACK TO TOP
		========================================================== */
		$('.back-top').on('click', function() {
			$('html:not(:animated),body:not(:animated)').animate({ scrollTop:0}, 'normal');
			return false;
		});
		
		/*========================================================== 
		 BUTTON CLICK ON MAIN BANNER
		========================================================== */
		$('.scroll-down').on('click', function() {
			var getOffsetmain = $('#main').offset().top-63;
			$("html, body").animate({ scrollTop:getOffsetmain},550);
			return false;
		});
		
		/*========================================================== 
		 COUNTERS
		========================================================== */
		if ($('.count-number').length) {
			$('.count-number').counterUp({
				delay: 30,
				time: 1000
			});
		}
		
		/*========================================================== 
		 LIGHTBOX
		========================================================== */	
		if($('.portfolio-box').length){
			$('.portfolio-box').magnificPopup({
				delegate: '.zoom-icon',
				type: 'image',
				tLoading: 'Loading image #%curr%...',
				mainClass: 'mfp-img-mobile',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1]
				}			
			});
		}
		
		/*========================================================== 
		 TESTIMONIALS SLIDER
		========================================================== */
		if( $('.testimonials-slider').length){
			$('.testimonials-slider').owlCarousel({
				loop:true,
				nav:false,
				dots:true,
				items:2,
				margin: 50,
				autoplay:true,
				center: true,
				smartSpeed:700,
				autoplayTimeout:7000,
				responsive: {
					0: {
						items: 1,
						margin: 0
					},
					992: {
						items: 2,
						margin: 50
					}	
				}
			});
		}	
		
		/*========================================================== 
		  PROJECTS SLIDER
		========================================================== */
		if( $('.projects-slider').length){
			$('.projects-slider').owlCarousel({
				loop:true,
				dots:false,
				items:1,
				autoplay:true,
				smartSpeed:500,
				autoplayTimeout:2500
			});
		}
		
		/*========================================================== 
		 IMAGES SLIDER ( PROJECT DETAILS PAGE )
		========================================================== */
		if( $('.img-slider').length){
			$('.img-slider').owlCarousel({
				loop:true,
				dots:true,
				items:1,
				autoplay:true,
				smartSpeed:700,
				autoplayTimeout:3000
			});
		}
		
		/*===========================
		 SCROLLSPY MENU
		=============================*/
		if($('.scrollnav').length){
			var lastId,
				topMenu = $(".scrollnav"),
				menuItems = topMenu.find("a"),
				scrollItems = menuItems.map(function(){
					var item = $($(this).attr("href"));
					if (item.length) { return item; }
				});
			
			menuItems.on('click', function(e){
				var href = $(this).attr("href");				
				menuItems.parent('li').removeClass('active');
				$(this).parent('li').addClass('active');
				$('.navbar-collapse').removeClass('collapse show').addClass('collapse').height(0);
				var offsetTop = href === "#" ? 0 : $(href).offset().top+1;
				$('html, body').stop().animate({ 
					scrollTop: offsetTop-64
				}, 500);
				e.preventDefault();
			});
			
			$(window).on('scroll', function(){
				var fromTop = $(this).scrollTop()+64;
				var cur = scrollItems.map(function(){
					if ($(this).offset().top < fromTop) {
						return this;
					}
				});
				cur = cur[cur.length-1];
				var id = cur && cur.length ? cur[0].id : "";
				if (lastId !== id) {
					lastId = id;
					menuItems.parent().removeClass("active").end().filter("[href='#"+id+"']").parent().addClass("active");
			   }                   
			});
		}		
	
	 	/*========================================================== 
	   	PROGRESS BARS
	 	 ========================================================== */
		if ($('.skills-row').length !== 0) {
			var skillbar_active = false;
			$('.progress-bar-value').hide();
			if ($(window).scrollTop() === 0 && isScrolledIntoView($('.skills-row')) === true) {
				skillbarActive();
				skillbar_active = true;
			} else if (isScrolledIntoView($('.skills-row')) === true) {
				skillbarActive();
				skillbar_active = true;
			}
			$(window).bind('scroll', function() {
				if (skillbar_active === false && isScrolledIntoView($('.skills-row')) === true) {
					skillbarActive();
					skillbar_active = true;
				}
			});
		}
		function isScrolledIntoView(elem) {
			var docViewTop = $(window).scrollTop();
			var docViewBottom = docViewTop + $(window).height();
			var elemTop = $(elem).offset().top;
			var elemBottom = elemTop + $(elem).height();
			return ((elemBottom <= (docViewBottom + $(elem).height())) && (elemTop >= (docViewTop - $(elem).height())));
		}
		function skillbarActive() {
			setTimeout(function() {
				$('.progress-bar-value').each(function() {
					$(this).data("origWidth", $(this)[0].style.width).css('width', '1%').show();
					$(this).animate({
						width: $(this).data("origWidth")						
					}, 1600);
				});
			}, 250);
		}
		$('.progress-bar-value').each(function() {
			var skillBarPercentage = $(this).attr('data-percentage');
			$(this).css('width', '' + skillBarPercentage + '');
		});
		
		if($('.parallax').length) {
			$(window).stellar();
		}
		
	
/*--------------------------------------------------------------------------------------------------------------------------------------*/		
	});	
	
/*--------------------------------------------------------------------------------------------------------------------------------------*/
})(jQuery, window, document);