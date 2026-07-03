export interface Review {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
  source: "Google" | "Facebook" | "Direct";
}

export const googleRatingStats = {
  score: 5.0,
  count: 12,
  stars: [12, 0, 0, 0, 0] // 5, 4, 3, 2, 1 stars
};

export const reviews: Review[] = [
  {
    id: "rev-1",
    name: "Kasun Jayasundara",
    rating: 5,
    date: "1 week ago",
    text: "Absolutely stunning place! The infinity pool is incredible with panoramic forest views. Extremely clean rooms and the hospitality of the host is 10/10. Highly recommend the day outing package - very affordable and peaceful.",
    source: "Google"
  },
  {
    id: "rev-2",
    name: "Elena Rostova",
    rating: 5,
    date: "3 weeks ago",
    text: "A hidden gem in Kandy. We stayed here for two nights and it was pure bliss. Waking up to the mountain mist and listening to the birds while swimming in the pool was magical. Very romantic escape.",
    source: "Google"
  },
  {
    id: "rev-3",
    name: "Pradeep Perera",
    rating: 5,
    date: "1 month ago",
    text: "We booked the entire villa for a family gathering. The kids loved the pool, and the garden area is huge. The price for pool access (Rs. 500) is unbeatable for this level of luxury. We will definitely come back.",
    source: "Google"
  },
  {
    id: "rev-4",
    name: "Sarah Jenkins",
    rating: 5,
    date: "2 months ago",
    text: "Perfect nature retreat. The location is peaceful and away from the busy Kandy town, yet easily accessible. Everything was clean, the food was delicious, and the service was warm and welcoming.",
    source: "Google"
  },
  {
    id: "rev-5",
    name: "Mohamed Rizan",
    rating: 5,
    date: "2 months ago",
    text: "Great experience. Clean, quiet, and surrounded by beautiful hills. The pool is the highlight, clean water and awesome view. It's a 5-star experience at a very reasonable price. Highly recommended!",
    source: "Google"
  },
  {
    id: "rev-6",
    name: "Dilini Alwis",
    rating: 5,
    date: "3 months ago",
    text: "Celebrated my husband's birthday here with a small group of friends. The staff went out of their way to set up the poolside. Truly a memorable stay. The environment is so calm and relaxed.",
    source: "Google"
  }
];
