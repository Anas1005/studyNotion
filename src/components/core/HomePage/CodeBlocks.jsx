import React from "react";
import { Button } from "./Button";
import { TypeAnimation } from "react-type-animation";

export const CodeBlocks = ({
  position,
  heading,
  subHeading,
  btn1,
  btn2,
  codeBlock,
  bgGradient,
  codeColour,
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      <div className="w-[50%] flex flex-col gap-8">
        {heading}
        <div className=" text-richblack-300 font-bold">{subHeading}</div>

        <div className="flex gap-7 mt-7">
          <Button active={btn1.active} linkTo={btn1.linkTo}>
            <div className="flex gap-2 items-center">{btn1.btnText}</div>
          </Button>

          <Button active={btn2.active} linkTo={btn2.linkTo}>
            <div className="flex gap-2 items-center">{btn2.btnText}</div>
          </Button>
        </div>
      </div>

      <div className=" h-fit flex flex-row text-[15px] w-[100%] py-4 lg:w-[500px]">
        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-bold">
          {/* Add SomeGradient */}
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
        </div>

        <div
          className={`w-[90%] flex flex-col font-mono gap-2 font-bold pr-2 ${codeColour}`}
        >
          <TypeAnimation
            sequence={[codeBlock, 20, ""]}
            repeat={Infinity}
            cursor={true}

            style={{
                whiteSpace:"pre-line",
                display:"block"
            }}
          />
        </div>
      </div>
    </div>
  );
};
