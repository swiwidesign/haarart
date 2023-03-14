window.addEventListener("DOMContentLoaded", (event) => {
  // lenis

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    orientation: "vertical", // vertical, horizontal
    gestureOrientation: "vertical", // vertical, horizontal, both
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // GENERAL CODE
  gsap.registerPlugin(ScrollTrigger);

  // apply parallax effect to any element with a data-speed attribute
  gsap.utils.toArray("[data-speed]").forEach((el) => {
    gsap.to(el, {
      y: function () {
        return (
          (1 - parseFloat(el.getAttribute("data-speed"))) *
          (ScrollTrigger.maxScroll(window) -
            (this.scrollTrigger ? this.scrollTrigger.start : 0))
        );
      },
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "max",
        invalidateOnRefresh: true,
        scrub: true
      }
    });
  });

  //marquee
  gsap.set("[marquee]", { xPercent: 100 });
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "[marquee]",
        start: "top bottom", // when the top of the trigger hits the top of the viewport
        end: "bottom top", // end after scrolling 500px beyond the start
        scrub: 2,
        ease: "none"
      }
    })
    .to("[marquee]", { xPercent: -30 });
  //LANDING
  //landing services image change
  let childTriggers = $(".sticky-track").find(".services_text-wrapper");
  let childTargets = $(".sticky-track").find("[services-image]");
  // switch active class
  function makeItemActive(index) {
    childTriggers.removeClass("is-active");
    childTargets.removeClass("is-active");
    childTriggers.eq(index).addClass("is-active");
    childTargets.eq(index).addClass("is-active");
  }
  makeItemActive(0);
  // create triggers
  childTriggers.each(function (index) {
    ScrollTrigger.create({
      trigger: $(this),
      start: "top center",
      end: "bottom center",
      onToggle: (isActive) => {
        if (isActive) {
          makeItemActive(index);
        }
      }
    });
  });
  //landing service image last enlarge
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "[enlarge-trigger]",
        start: "bottom center",
        endTrigger: "[enlarge-endtrigger]",
        end: "bottom bottom",
        scrub: 2,
        ease: "none",
        defer: true,
        lazy: true
      }
    })
    .to("[enlarge]", { width: "100%", height: "100vh" })
    .to(
      "[enlarge] .image_vertical .image_vertical-height",
      { paddingTop: "100vh" },
      "<"
    );
  //SERVICES
  //services image enlarge
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "[services-enlarge-trigger]",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        ease: "none",
        defer: true,
        lazy: true
      }
    })
    .to(
      "[services-enlarge]",
      {
        borderRadius: "0",
        width: "100%",
        height: "100vh"
      },
      "<"
    );
  //FOOTER
  //footer marquee
  let footerMarquee = gsap.timeline({ repeat: -1 });
  footerMarquee.fromTo(
    ".footer_marquee-track",
    {
      xPercent: 0
    },
    {
      xPercent: -50,
      duration: 14,
      ease: "none"
    }
  );
  //footer instagram button image reveal
  let instagram = document.querySelector("[insta-button]");
  let instaAni = gsap.to(".footer_insta-image", {
    paused: true,
    marginTop: "0%",
    stagger: 0.2,
    ease: "elastic.out(1, 0.6)",
    duration: 2
  });

  instagram.addEventListener("mouseenter", () => instaAni.play());
  instagram.addEventListener("mouseleave", () => instaAni.reverse());

  //END CODE
});
