import React from "react";
import { useSprings, interpolate } from "react-spring";
import { useGesture } from "react-use-gesture";
import * as R from "ramda";

const MAX_COUNT = 3;
const PEEK_OFFSET = 18;
const COMMIT_FRACTION = 0.4;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const REDUCED_MOTION_CONFIG = { duration: 120 };

const onNext = (
  { args: [index], down },
  { isNextTrigger, getStartData, onChange, ref, drag },
  i
) => {
  if (!isNextTrigger || down) return;

  const reduced = prefersReducedMotion();
  const configOverride = reduced ? { config: REDUCED_MOTION_CONFIG } : {};

  if (index === i) {
    return {
      ...getStartData(i),
      x: -ref.current.offsetWidth,
      sc: 1,
      opacity: reduced ? 0 : 1,
      immediate: false,
      ...configOverride,
      onStart: () => onChange(index + 1),
      onRest: () => drag.cancel(),
    };
  }

  if (i - index > 0) {
    const currentIndex = i - index - 1;
    return {
      ...getStartData(currentIndex),
      immediate: false,
      ...configOverride,
      onStart: undefined,
      onRest: undefined,
    };
  }
};

const onPrev = (
  { args: [index], down },
  { isPrevTrigger, getStartData, onChange, drag },
  i
) => {
  if (!isPrevTrigger || down) return;

  if (index > 0 && i - index >= -1 && isPrevTrigger) {
    const reduced = prefersReducedMotion();
    const configOverride = reduced ? { config: REDUCED_MOTION_CONFIG } : {};
    const currentIndex = i - index + 1;

    const indexConf = {
      onStart: undefined,
      onRest: undefined,
    };

    if (index === i) {
      indexConf.onStart = () => onChange(index - 1);
      indexConf.onRest = () => drag.cancel();
    }

    return {
      ...getStartData(currentIndex),
      immediate: false,
      ...configOverride,
      ...indexConf,
    };
  }
};

const lerp = (a, b, t) => a + (b - a) * t;

const lerpStartData = (from, to, t) => ({
  ...from,
  x: lerp(from.x, to.x, t),
  y: lerp(from.y, to.y, t),
  sc: lerp(from.sc, to.sc, t),
  opacity: lerp(from.opacity, to.opacity, t),
});

const isNotTarget = (
  { args: [index], down, movement },
  ctx,
  i
) => {
  if (index === i) return;

  const { getStartData, isNextTrigger, isPrevTrigger } = ctx;

  if (!down || isNextTrigger || isPrevTrigger) {
    return { onStart: undefined, onRest: undefined };
  }

  const cardWidth = ctx.ref.current ? ctx.ref.current.offsetWidth : 300;
  const commitThreshold = cardWidth * 0.4;

  if (movement[0] < 0 && i > index) {
    const progress = Math.min(-movement[0] / commitThreshold, 1);
    const from = getStartData(i - index);
    const to = getStartData(i - index - 1);
    return {
      ...lerpStartData(from, to, progress),
      immediate: true,
      onStart: undefined,
      onRest: undefined,
    };
  }

  return { onStart: undefined, onRest: undefined };
};

const isNotDown = ({ down, args: [index] }, { drag, getStartData }, i) => {
  if (down) return;

  if (i === index) {
    return {
      x: 0,
      immediate: false,
      onRest: () => drag.cancel(),
    };
  }

  if (i > index) {
    return {
      ...getStartData(i - index),
      immediate: false,
      onStart: undefined,
      onRest: undefined,
    };
  }

  return { onStart: undefined, onRest: undefined };
};

const onDefault = ({ movement }, ctx) => {
  const { isAtLeftEdge, isAtRightEdge } = ctx;
  let x = movement[0];

  if (isAtLeftEdge && x > 0) {
    x = Math.pow(x, 0.7);
  } else if (isAtRightEdge && x < 0) {
    x = -Math.pow(-x, 0.7);
  }

  return {
    x,
    immediate: true,
    reset: false,
    onStart: undefined,
    onRest: undefined,
  };
};

const useIsDrag = () => {
  const [state] = React.useState({ isDrag: false, movement: [0, 0] });

  const setIsDrag = (movement) => {
    if (Math.abs(movement[0]) < 10) return;
    state.movement = movement;
    state.isDrag = true;
  };

  const cancel = () => {
    state.movement = [0, 0];
    state.isDrag = false;
  };

  return { state, setIsDrag, cancel };
};

export const useSlider = ({ data, onChange, ref, onClick }) => {
  const totalItems = data.length;
  const drag = useIsDrag();

  const getStartData = (i) => {
    const isVisible = i <= MAX_COUNT - 1;
    const multiplier = i === 0 ? 1 : 1.1;

    return {
      x: isVisible
        ? (i * PEEK_OFFSET) / multiplier
        : (MAX_COUNT - 1) * PEEK_OFFSET,
      y: 0,
      sc: isVisible
        ? 1 / (MAX_COUNT / (MAX_COUNT * multiplier - i))
        : 1 / MAX_COUNT,
      opacity: isVisible ? 1 / (MAX_COUNT / (MAX_COUNT - i)) : 0,
      display: "block",
      pointerEvents: i === 0 ? "" : "none",
      boxShadow:
        i === 0
          ? "0 10px 40px rgba(0, 0, 0, .2)"
          : "0 0px 0px rgba(0, 0, 0, .2)",
      position: "",
      transformOrigin: "",
      width: "",
      height: "",
    };
  };

  const [props, set] = useSprings(totalItems, getStartData);

  const bind = useGesture({
    onDrag: (state) => {
      const {
        args: [index],
        down,
        movement,
        cancel,
      } = state;

      const cardWidth = ref.current ? ref.current.offsetWidth : 300;
      const commitThreshold = cardWidth * COMMIT_FRACTION;

      const isAtLeftEdge = index === 0;
      const isAtRightEdge = index === totalItems - 1;

      const isNextTrigger =
        movement[0] <= -commitThreshold && !isAtRightEdge;
      const isPrevTrigger = movement[0] >= commitThreshold && !isAtLeftEdge;

      const ctx = {
        isNextTrigger,
        isPrevTrigger,
        isAtLeftEdge,
        isAtRightEdge,
        getStartData,
        onChange,
        ref,
        drag,
      };

      if (down) drag.setIsDrag(movement);
      if ((isNextTrigger || isPrevTrigger) && down) cancel(index);

      set((i) => {
        const action = R.find((fn) => fn(state, ctx, i), [
          onNext,
          onPrev,
          isNotTarget,
          isNotDown,
          onDefault,
        ]);
        if (action) return action(state, ctx, i);
      });
    },
  });

  const map = (component) =>
    props.map(
      (
        { x, y, display, sc, opacity, pointerEvents, boxShadow, ...rest },
        i
      ) => {
        const root = {
          key: i,
          style: {
            display,
            transform: interpolate(
              [x, y, sc],
              (xv, yv, s) => `translate3d(${xv}px, ${yv}px, 0) scale(${s})`
            ),
            opacity,
            pointerEvents,
            zIndex: data.length - i,
            ...rest,
          },
          ...bind(i),
        };

        const inner = {
          style: { boxShadow },
        };

        const onClickHandler = (...args) => {
          if (drag.state.isDrag) return;
          onClick(set, i, ...args);
        };

        return component({
          root,
          inner,
          ref,
          item: data[i],
          onClick: onClickHandler,
        });
      }
    );

  return { map, ref, set, getStartData };
};
