import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { Button } from "@nextui-org/react";

const LandingPage = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const toRotate = ["Astrophile"];
  const toRotate2 = ["Get Start"];
  const period = 700;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
      tick2();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  });

  const tick2 = () => {
    let i = loopNum % toRotate2.length;
    let fullText = toRotate2[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText2(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum((prevLoopNum) => prevLoopNum + 1);
      setDelta(500);
    }
  };
  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum((prevLoopNum) => prevLoopNum + 1);
      setDelta(500);
    }
  };

  const handleScroll = () => {
    window.location = "/login";
  };
  return (
    <div className={"banner grid grid-cols-1 gap-3 md:grid-cols-2  "} id="home">
      <Container>
        <div className="flex flex-col items-center justify-center h-full">
          <div>
            <h1 className="text-5xl font-bold text-black">
              Hello <span className="text-primary"> Astrophile </span>
            </h1>
            <h2 className="text-2xl font-bold text-black">
              welcome to {text}
              <span className="cursor"></span>
            </h2>
          </div>
          <Button
            className="w-[240px] mt-4 self-start md:self-center text-white text-[20px] bg-slate-900  font-bold animate-bounce"
            variant="filled"
            color="primary"
            radius="lg"
            onClick={handleScroll}
          >
            {text2}
          </Button>
        </div>
      </Container>
      <Container className="order-first md:order-last ">
        <div className="aligh-items-center">
          <div>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                >
                  <img src={"/homepage/header-img.svg"} alt="Header Img" />
                </div>
              )}
            </TrackVisibility>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;
