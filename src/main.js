const typed = new Typed(".typing", {
  strings: ["Web Developer.", "Freelancer.", "Designer."],
  typeSpeed: 60,
  loop: true,
  showCursor: true,
  backSpeed: 60
});

const map = new GMaps({
  el: ".map",
  lat: 35.93282,
  lng: 10.30045
});
map.addMarker({
  lat: 35.93282,
  lng: 10.30045,
  title: "My Info",
  infoWindow: {
    content: "<p>street 09 Avril Kondar-sousse Tunisia</p>"
  }
});

const swiper = new Swiper(".swiper-container", {
  effect: "coverflow",
  // grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 30,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false
  },
  
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false
  }
});


$(".owl-carousel").owlCarousel({
  loop:true,
  autoplay:true,
  smartSpeed: 450,
  responsiveClass: true,
  items:5,
  dots:false,
  autoplayHoverPause: true, // stop autoplay when hover 
  responsive:{	
      480:{
      items:2
      },
      
      678:{
      items:3
      },
      
      960:{
      items:5
      }
      }
});

$(function () {
  $(document).scroll(function () {
    const $nav = $(".fixed-top"),
    $header=$(".header");
	  $nav.toggleClass('scrolled', $(this).scrollTop() > $header.height());
	});
});