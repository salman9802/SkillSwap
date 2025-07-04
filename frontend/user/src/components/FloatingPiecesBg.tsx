import React from "react";
import { IoExtensionPuzzleOutline } from "react-icons/io5";

const FloatingPiecesBg: React.FC<{
  puzzlePieces: {
    top: string;
    left: string;
    delay: string;
    size: string;
    rotate: string;
  }[];
}> = ({ puzzlePieces }) => {
  return (
    <div className="absolute inset-0 -z-10">
      {puzzlePieces.map((piece, index) => (
        <IoExtensionPuzzleOutline
          key={index}
          className={`animate-bounce [--rotation:${piece.rotate}deg] absolute`}
          style={
            {
              width: piece.size,
              height: piece.size,
              top: piece.top,
              left: piece.left,
              animationDelay: piece.delay,
              opacity: 0.2,
              filter: "blur(1px)",
              // rotate: piece.rotate,
              "--rotation": `${piece.rotate}deg`,
            } as React.CSSProperties
          }
        />
      ))}
      {/* Replace the SVG below with your own puzzle piece */}
      {/* <IoExtensionPuzzleOutline /> */}

      {/* {Array.from({ length: 20 }, (_, i) => {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = 16 + Math.random() * 10; // px size
        const delay = Math.random() * 5; // seconds
        const rotate = 90 + Math.random() * 3;

        return (
          <img
            key={i}
            className="animate-float absolute rounded-sm opacity-30"
            src="TR-piece.png"
            alt=""
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              transform: `rotate(${rotate}deg)`,
            }}
          />
        );
      })} */}

      {/* <img
        style={{
          left: `${25 + Math.random() * 55}%`,
          top: `${25 + Math.random() * 55}%`,
          transform: `rotate(${90 + Math.random() * 3}deg)`,
        }}
        className="text-primary absolute w-32 animate-bounce opacity-30"
        src="TR-piece.png"
        alt=""
      /> */}

      {/* <IoExtensionPuzzleOutline
        style={{
          left: `${25 + Math.random() * 55}%`,
          top: `${25 + Math.random() * 55}%`,
          transform: `rotate(${90 + Math.random() * 3}deg)`,
        }}
        className="text-primary absolute size-24 animate-bounce opacity-30"
      /> */}
    </div>
  );
};

export default FloatingPiecesBg;
