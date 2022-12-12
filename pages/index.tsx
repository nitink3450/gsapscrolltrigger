import React, { useLayoutEffect, useEffect, useRef } from "react";
import { render } from "react-dom";
// import "./style.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AppProps {}
interface AppState {
  name: string;
}

function App(props) {
  const number = useRef(null);

  useEffect(() => {
    gsap.to("#h1", {
      scrollTrigger: {
        trigger: "#header",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      yPercent: 50,
      scale: 3,
      opacity: 0,
    });
    // Section 1 H2
    gsap.from("#h2", {
      scrollTrigger: {
        trigger: "#h2",
        start: "top bottom",
        end: "top 400px",
        // start: "top",
        // end: 'bottom',
        scrub: 1,
        // toggleActions: "play complete none reset"
      },
      xPercent: -100,
      opacity: 0,
    });
    // Execution heading
    gsap.from("#h3", {
      scrollTrigger: {
        trigger: "#h3",
        start: "top bottom+=100px",
        // scrub: true
        toggleActions: "play complete none reset",
      },
      xPercent: 100,
      opacity: 0.5,
      duration: 1,
    });
    // Custom trigger
    ScrollTrigger.create({
      trigger: "#h3",
      start: "top bottom+=-200px", // 200px after the top passes the bottom of the viewport
      endTrigger: "#section2",
      end: "bottom top",
      onUpdate: (self) => {
        const progress = Math.max(2, Math.ceil(self.progress * 100)); //No lower than 2.
        number.current.innerHTML = progress;
        // console.log(
        //   "progress:",
        //   self.progress.toFixed(3),
        //   "direction:",
        //   self.direction,
        //   "velocity",
        //   self.getVelocity()
        // );
      },
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <main>
      <header id="header">
        <h1 id="h1">Execution Is Everything</h1>
      </header>
      <section>
        <h2 id="h2">The idea is step 1.</h2>
      </section>
      <section id="section2">
        <h2 id="h3">
          Execution is steps <span ref={number}>2</span>.
        </h2>
      </section>
    </main>
  );
}
