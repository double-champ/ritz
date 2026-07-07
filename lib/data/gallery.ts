export interface GalleryItem {
  id: string;
  category: "pool" | "villa" | "rooms" | "nature" | "events" | "day-outings";
  title: string;
  url: string;
  aspectRatio: "square" | "video" | "tall" | "wide";
}

export const galleryCategories = [
  { id: "all", label: "All Photos" },
  { id: "pool", label: "Pool" },
  { id: "villa", label: "Villa" },
  { id: "rooms", label: "Rooms" },
  { id: "nature", label: "Nature" },
  { id: "events", label: "Events" },
  { id: "day-outings", label: "Day Outings" },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "g-1",
    category: "pool",
    title: "Infinity Pool View",
    url: "/images/pool-forest.png",
    aspectRatio: "wide"
  },
  {
    id: "g-2",
    category: "villa",
    title: "Villa Exterior in Evening",
    url: "/images/exterior.png",
    aspectRatio: "tall"
  },
  {
    id: "g-3",
    category: "rooms",
    title: "Deluxe Bedroom Setup",
    url: "/images/bedroom.png",
    aspectRatio: "square"
  },
  {
    id: "g-4",
    category: "nature",
    title: "Misty Hills Around the Villa",
    url: "/images/pool-hills.png",
    aspectRatio: "wide"
  },
  {
    id: "g-5",
    category: "day-outings",
    title: "Day Outing Seating Area",
    url: "/images/dining.png",
    aspectRatio: "square"
  },
  {
    id: "g-6",
    category: "events",
    title: "Birthday Celebration Setup",
    url: "/images/pool-ladder.png",
    aspectRatio: "wide"
  },
  {
    id: "g-7",
    category: "pool",
    title: "Refreshing Pool Waters",
    url: "/images/pool-ladder.png",
    aspectRatio: "tall"
  },
  {
    id: "g-8",
    category: "nature",
    title: "Tropical Surrounding Greenery",
    url: "/images/pool-hills.png",
    aspectRatio: "wide"
  },
  {
    id: "g-9",
    category: "rooms",
    title: "Private Balcony Misty View",
    url: "/images/bedroom.png",
    aspectRatio: "square"
  },
  {
    id: "g-10",
    category: "villa",
    title: "Villa Cozy Living Space",
    url: "/images/lobby.png",
    aspectRatio: "wide"
  },
  {
    id: "g-11",
    category: "events",
    title: "Garden Event Lighting",
    url: "/images/lobby.png",
    aspectRatio: "tall"
  },
  {
    id: "g-12",
    category: "day-outings",
    title: "Poolside Lunch Outing",
    url: "/images/dining.png",
    aspectRatio: "square"
  }
];
