import React from "react";
import EventStack from "./EventStack";

const pages = [
  {
    id: 1,
    type: "card",
    title: "The Sun Comes Out - Shakira on World Tour 2026 | Mumbai",
    dateLabel: "10 Apr, 4 PM",
    venue: "Mahalaxmi Racecourse",
    price: "₹4,500",
    priceSuffix: "onwards",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    type: "card",
    title: "Coldplay: Music of the Spheres | Mumbai",
    dateLabel: "18 Jan, 7 PM",
    venue: "DY Patil Stadium",
    price: "₹3,500",
    priceSuffix: "onwards",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    type: "card",
    title: "Arijit Singh Live in Concert | Mumbai",
    dateLabel: "22 Feb, 8 PM",
    venue: "MMRDA Grounds, BKC",
    price: "₹2,999",
    priceSuffix: "onwards",
    image:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    type: "card",
    title: "Diljit Dosanjh: Dil-Luminati India Tour | Mumbai",
    dateLabel: "05 Mar, 7:30 PM",
    venue: "Jio World Garden",
    price: "₹2,499",
    priceSuffix: "onwards",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    type: "card",
    title: "Sunburn Arena ft. Martin Garrix | Mumbai",
    dateLabel: "29 Mar, 6 PM",
    venue: "Mahalaxmi Racecourse",
    price: "₹1,999",
    priceSuffix: "onwards",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    type: "list",
    items: [
      {
        id: "l1",
        variant: "poster",
        title: "Musicland Mumbai",
        dateLabel: "9 May, 4:30 PM",
        venue: "Jio World Garden",
        price: "₹1,999",
        priceSuffix: "onwards",
        image:
          "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "l2",
        variant: "date",
        tag: "District",
        title: "French Press Manual Brewing Workshop",
        dateDay: "17",
        dateMonth: "apr",
        price: "₹900",
        description:
          "Unlock the secrets to perfect French Press brewing at The Revolver Club",
      },
      {
        id: "l3",
        variant: "poster",
        title: "Besharam Tour 2026 | Mumbai",
        dateLabel: "10 - 11 Apr, 9 PM",
        venue: "Mirage | Santacruz",
        price: "₹1,499",
        priceSuffix: "onwards",
        image:
          "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
];

const App = () => (
  <div className="app-layout">
    <EventStack data={pages} />
  </div>
);

export default App;
