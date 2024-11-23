import { css } from "@emotion/css";
import { motion, useAnimation } from "framer-motion";
import React, { useCallback, useEffect, useRef } from "react";

export type ArchData = {
  name: string;
  value: number;
  color: string;
};

export interface MotionPieArchProps {
  fill: string;
  path: string;
  name: string;
  value: number;
  finish?: React.MutableRefObject<Promise<any>>;
  onMouseMove?: (
    e: React.MouseEvent<SVGPathElement, MouseEvent>,
    data: ArchData
  ) => void;
  onMouseOut?: (e: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
}

const MotionPieArch = React.memo(
  ({
    fill,
    path,
    name,
    value,
    finish,
    onMouseMove,
    onMouseOut
  }: MotionPieArchProps) => {
    const pathRef = useRef<SVGPathElement>(null);
    const animationController = useAnimation();

    const handleAnimationEnd = useCallback(() => {
      if (pathRef.current) {
        pathRef.current.removeAttribute("stroke-dasharray");
        pathRef.current.removeAttribute("stroke-dashoffset");
      }
    }, []);
    const handleOnHover = useCallback(
      (e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
        if (onMouseMove) {
          onMouseMove(e, {
            name,
            value,
            color: fill
          });
        }
      },
      [fill, name, onMouseMove, value]
    );

    useEffect(() => {
      if (finish) {
        finish.current = animationController.start({
          pathLength: [0, 1, 1],
          fill: ["#fff", "#fff", fill]
        });
      }
    }, [animationController, finish, fill]);

    return (
      <motion.path
        className={css`
          transition: stroke-width 200ms ease;
          &:hover {
            stroke-width: 8;
          }
        `}
        d={path}
        ref={pathRef}
        stroke={fill}
        custom={fill}
        onMouseMove={handleOnHover}
        onMouseOut={onMouseOut}
        onAnimationComplete={handleAnimationEnd}
        initial={{ fill: "transparent", pathLength: 0 }}
        transition={{ type: "tween", duration: 2 }}
        animate={animationController}
      />
    );
  }
);
MotionPieArch.displayName = "MotionPieArch";

export default MotionPieArch;
