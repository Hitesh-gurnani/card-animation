import React from "react";
import classNames from "classnames";

const cx = classNames;

export const PricePill = ({ price, suffix }) => (
  <span className="event-card__price">
    <strong>{price}</strong>
    {suffix ? <span className="event-card__price-suffix">{suffix}</span> : null}
  </span>
);

export const EventCard = ({ item }) => (
  <div className="event-card">
    <div
      className="event-card__image"
      style={{ backgroundImage: `url(${item.image})` }}
    />
    <div className="event-card__panel">
      <PricePill price={item.price} suffix={item.priceSuffix} />
      <h3 className="event-card__title">{item.title}</h3>
      <div className="event-card__meta">
        <div className="event-card__date">{item.dateLabel}</div>
        <div className="event-card__venue">{item.venue}</div>
      </div>
    </div>
  </div>
);

export const ListRow = ({ row }) => {
  const isDate = row.variant === "date";

  return (
    <div className="list-row">
      {row.tag ? <span className="list-row__tag">{row.tag}</span> : null}
      <div className="list-row__media">
        {isDate ? (
          <div className="list-row__date-block">
            <div className="list-row__date-day">{row.dateDay}</div>
            <div className="list-row__date-month">{row.dateMonth}</div>
          </div>
        ) : (
          <div
            className="list-row__poster"
            style={{ backgroundImage: `url(${row.image})` }}
          />
        )}
      </div>
      <div className="list-row__body">
        <h4 className="list-row__title">{row.title}</h4>
        <div className="list-row__meta">
          {row.dateLabel ? (
            <div className="list-row__date">{row.dateLabel}</div>
          ) : null}
          {row.venue ? (
            <div className="list-row__venue">{row.venue}</div>
          ) : null}
          {isDate && row.price ? (
            <div className="list-row__price-inline">{row.price}</div>
          ) : null}
        </div>
        {row.description ? (
          <div className="list-row__description">{row.description}</div>
        ) : null}
      </div>
      {!isDate && row.price ? (
        <div className="list-row__price-slot">
          <PricePill price={row.price} suffix={row.priceSuffix} />
        </div>
      ) : null}
    </div>
  );
};

export const EventList = ({ item }) => (
  <div className="event-list">
    {item.items.map((row, idx) => (
      <div
        key={row.id}
        className="event-list__row-wrapper"
        style={{ animationDelay: `${40 + idx * 15}ms` }}
      >
        <ListRow row={row} />
      </div>
    ))}
  </div>
);

export const PageDots = ({ total, current, data }) => (
  <div className="page-dots" aria-hidden="true">
    {Array.from({ length: total }).map((_, i) => {
      const isList = data[i]?.type === "list";
      return (
        <span
          key={i}
          className={cx(
            "page-dots__dot",
            isList && "page-dots__dot--diamond",
            i === current && "page-dots__dot--active"
          )}
        />
      );
    })}
  </div>
);
