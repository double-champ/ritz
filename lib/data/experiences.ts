
export interface RitzExperience {
  id: string;
  title: string;
  description: string;
  recommendedPackage: string;
  iconName: string;
}

export const experiences = [
  {
    id: "pool-day",
    title: "Pool Day",
    description: "Escape the heat and refresh in our crystal-clear infinity pool, surrounded by high-country forest views.",
    recommendedPackage: "Pool Access Package (Rs. 500+)",
    iconName: "GlassWater",
  },
  {
    id: "family-escape",
    title: "Family Escape",
    description: "Reconnect with nature and each other in a private, spacious sanctuary designed for families.",
    recommendedPackage: "Family Villa Package",
    iconName: "Users",
  },
  {
    id: "romantic-stay",
    title: "Romantic Stay",
    description: "Watch the mist roll in over Kandy hills from your private balcony. Pure romance and absolute privacy.",
    recommendedPackage: "Couple Escape Package",
    iconName: "Heart",
  },
  {
    id: "nature-relaxation",
    title: "Nature Relaxation",
    description: "Listen to the birds, walk through tropical greenery, and let the quiet mountain breeze calm your soul.",
    recommendedPackage: "Nature Stay Package",
    iconName: "Leaf",
  },
  {
    id: "birthday-celebration",
    title: "Birthday Celebration",
    description: "Celebrate your special day with close friends and family, complete with pool access and tailor-made setups.",
    recommendedPackage: "Birthday Celebration Package",
    iconName: "Cake",
  },
  {
    id: "day-outing",
    title: "Day Outing",
    description: "The ultimate daytime getaway. Enjoy delicious food, pool dips, and lush garden fields with your group.",
    recommendedPackage: "Day Outing Package",
    iconName: "CalendarDays",
  },
];
