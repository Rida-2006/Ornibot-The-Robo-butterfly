const scroll = new LocomotiveScroll({
   el: document.querySelector('#main'),
   smooth: true
 });

function videoconAnimation() {
  var videocon = document.querySelector("#video-container");
  var playbtn = document.querySelector("#play");
  

  videocon.addEventListener("mouseenter", function () {
    gsap.to(playbtn, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  videocon.addEventListener("mouseleave", function () {
    gsap.to(playbtn, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    });
  });

  videocon.addEventListener("mousemove", function (dets) {
    gsap.to(playbtn, {
      left: dets.clientX,
      top: dets.clientY,
      duration: 0.1
    });
  });
}
videoconAnimation();

function loadinganimation() {
  gsap.from("#page1 h1", {
    y: 180,
    opacity: 0,
    delay: 0.7,
    duration: 0.7,
    stagger: 0.4
  });

  gsap.from("#page1 #video-container", {
    scale: 0.9,
    opacity: 0,
    delay: 1.2,
    duration: 0.5,
    stagger: 0.5
  });
}
loadinganimation();

document.addEventListener("mousemove", function(dets)
{
  gsap.to("#cursor",{
    left: dets.x,
    top: dets.y
  })
})

