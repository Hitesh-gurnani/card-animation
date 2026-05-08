import React from "react";
import { animated } from "react-spring";
import classNames from "classnames";
import { useSlider } from "./useSlider.js";
import { EventCard, EventList, PageDots } from "./parts.jsx";
import "../style.scss";

const cx = classNames;

const Slider = ({ slider }) => {
  const { map, ref } = slider;

  return (
    <div className="slider" ref={ref}>
      <div className="slider__container">
        {map(({ root, inner, onClick, item, itemRef }) => {
          const isList = item.type === "list";

          return (
            <animated.div
              ref={itemRef}
              className={cx("slider__item", isList && "slider__item--list")}
              onClick={onClick}
              {...root}
            >
              <animated.div
                className={cx(
                  "slider__inner",
                  isList && "slider__inner--list"
                )}
                style={inner.style}
              >
                {isList ? (
                  <EventList item={item} />
                ) : (
                  <EventCard item={item} />
                )}
              </animated.div>
            </animated.div>
          );
        })}
      </div>
    </div>
  );
};

const EventStack = ({ data, className }) => {
  const [current, setCurrent] = React.useState(0);
  const ref = React.useRef();

  const slider = useSlider({
    data,
    onChange: setCurrent,
    ref,
    onClick: () => {},
  });

  return (
    <section className={cx("events-screen", className)}>
      <main className="events-screen__slider">
        <Slider slider={slider} />
      </main>
      <PageDots total={data.length} current={current} data={data} />
    </section>
  );
};

export default EventStack;
