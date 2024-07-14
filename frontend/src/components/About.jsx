import React from "react";
import img from "../assets/img/about.jpg";
import Button from "../layouts/Button";

const About = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center lg:px-32 px-5 bg-coffee">
      <h1 className=" font-semibold text-center text-4xl lg:mt-14 mt-24 mb-8">The Bin(i)s</h1>

      <div className=" flex flex-col lg:flex-row items-center gap-5">
        <div className=" w-full lg:w-2/4">
          <img className=" rounded-lg" src={img} alt="img" />
        </div>
        <div className=" w-full lg:w-2/4 p-4 space-y-3">
          <h2 className=" font-semibold text-3xl">
          Why Kah-peh Bini?
          </h2>
          <p className="mt-10">
          The name "Kah-peh Binis" is a nod to both "Cafe beans" and our beloved girl group, as we wanted to blend the rich Filipino coffee tradition with the vibrant energy of BINI. 
          Our brand is a celebration of great coffee and the empowering spirit of BINI's music, so every cup you brew embodies the fusion of flavorful Philippine coffee and the infectious passion of BINI.
          </p>
          <p>
          Our beans are lovingly cultivated locally, delivering a taste that's as vibrant and captivating as a BINI performance. So, if you're ready to sip on a cup of pure Pinoy pride with a side of girl power, join us as we brew up a storm!
          </p>

          {/* <Button title="Learn More" /> */}
        </div>
      </div>
    </div>
  );
};

export default About;
