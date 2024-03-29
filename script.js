window.addEventListener("DOMContentLoaded", (event) => {
  // LENIS
  "use strict";

  if (Webflow.env("editor") === undefined) {
    const lenis = new Lenis({
      duration: 1.2,
      //easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
      wheelMultiplier: 0.7,
      infinite: false,
      gestureOrientation: "vertical",
      normalizeWheel: false,
      smoothTouch: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    $("[data-lenis-start]").on("click", function () {
      lenis.start();
    });
    $("[data-lenis-stop]").on("click", function () {
      lenis.stop();
    });
    $("[data-lenis-toggle]").on("click", function () {
      $(this).toggleClass("stop-scroll");
      if ($(this).hasClass("stop-scroll")) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

    function connectToScrollTrigger() {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
    }
    // Uncomment this if using GSAP ScrollTrigger
    connectToScrollTrigger();
  }

  gsap.registerPlugin(ScrollTrigger);

  //MATCHMEDIA
  gsap.matchMediaRefresh();

  // GENERAL CODES
  //menu heading letterspacing
  const menuButton = document.querySelector(".menu-button");
  const navItems = document.querySelectorAll(".heading-huge.is-nav");

  menuButton.addEventListener("click", function () {
    // Toggle the active class on the nav items
    navItems.forEach((item) => item.classList.toggle("active"));

    // Define the animation timeline
    const tl = gsap.timeline({ delay: 0 });

    // Add the animation to the timeline
    tl.from(".heading-huge.is-nav.active", {
      letterSpacing: "0.75em",
      duration: 0.6,
      ease: "ease"
    });
  });
  //parallax
  gsap
    .matchMedia()
    .add(
      "(min-width: 992px) and (prefers-reduced-motion: no-preference)",
      () => {
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
      }
    );

  //marquee
  gsap.set("[marquee]", { xPercent: 100 });
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "[marquee]",
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
        ease: "none"
      }
    })
    .to("[marquee]", { xPercent: -30 });
  //INTROS
  //landing intro
  const lptext = $('[landingintro="text"]');
  const lpImageWrapper = $('[landingintro="image"]');
  const lpImage = $(lpImageWrapper).find(".image-100");
  gsap.set("[landingintro]", { autoAlpha: 1 });
  let tlintro = gsap
    .timeline({
      delay: 1.25,
      ease: Power4.easeInOut
    })
    .from(
      lpImageWrapper,
      {
        yPercent: -100,
        duration: 0.4
      },
      "<"
    )
    .from(lpImage, {
      rotation: 0,
      duration: 0.8,
      ease: "expo.inOut"
    });

  //subpage intro
  gsap.set(".subhero_image-wrapper, .subhero_heading-wrapper", {
    autoAlpha: 1
  });
  let subintro = gsap
    .timeline({
      delay: 1.4,
      ease: Power4.easeInOut
    })
    .to(".subhero_image-wrapper", {
      yPercent: -25,
      duration: 0.6
    });
  //LANDING
  gsap.matchMedia().add("(min-width: 992px)", () => {
    //landing intro scroll DESKTOP
    let tlintroscroll = gsap
      .timeline({
        scrollTrigger: {
          trigger: '[tlintroscroll="trigger"]',
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          toggleActions: "play none reverse none",
          ease: "none"
        }
      })
      .to(lptext, {
        yPercent: 100,
        duration: 0.6
      })
      .to(
        ".image-100.is-1",
        {
          xPercent: -110,
          yPercent: -40,
          scale: 0.8,
          rotation: 0,
          duration: 0.8
        },
        "<25%"
      )
      .to(
        ".image-100.is-2",
        {
          xPercent: 150,
          yPercent: 15,
          height: "75%",
          scale: 0.8,
          rotation: 0,
          duration: 0.6
        },
        "<25%"
      )
      .to(
        ".image-100.is-3",
        {
          xPercent: -150,
          yPercent: 130,
          height: "50%",
          scale: 0.8,
          rotation: 0,
          duration: 0.6
        },
        "<25%"
      )
      .to(
        ".image-100.is-4",
        {
          xPercent: 15,
          rotation: 0,
          duration: 0.8
        },
        "<15%"
      );
  });
  gsap.matchMedia().add("(max-width: 991px)", () => {
    //landing intro scroll MOBILE TABLET
    let tlintroscroll = gsap
      .timeline({
        scrollTrigger: {
          trigger: '[tlintroscroll="trigger"]',
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          ease: "none"
        }
      })
      .to("[hero-images]", {
        delay: 0.5,
        opacity: 0,
        stagger: { each: 1, from: "end" }
      });
  });

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
      invalidateOnRefresh: true,
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
        start: "bottom top",
        endTrigger: "[enlarge-endtrigger]",
        end: "top bottom",
        scrub: true,
        ease: "none"
      }
    })
    .to("[enlarge]", { width: "100%", height: "100vh" })
    //jumpfix with gsap set
    .set("[enlarge] .image_vertical-height", { paddingTop: "150%" }, "<")
    .to("[enlarge] .image_vertical-height", { paddingTop: "100vh" }, "<");
  //SALON
  //team image
  $(".is-team-col").each(function (index) {
    let childImages = $(this).find("[team-image].is-hidden");
    let childTrigger = $(this).find("[team-trigger]");
    let tlteam = gsap.timeline({
      scrollTrigger: {
        trigger: childTrigger,
        start: "top 80%",
        end: "top 10%",
        scrub: true
      }
    });
    tlteam.to(childImages, {
      delay: 1,
      opacity: 1,
      stagger: 0.4,
      ease: "none"
    });
  });

  //SERVICES
  //services image enlarge
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "[services-enlarge-trigger]",
        start: "top top",
        end: "bottom +=150%",
        scrub: 1,
        ease: "none",
        fastScrollEnd: true
      }
    })
    .to("[services-enlarge]", {
      borderRadius: "0",
      width: "100%",
      height: "100vh"
    });
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

  //FOOTER END
});
