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
    url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "wide"
  },
  {
    id: "g-2",
    category: "villa",
    title: "Villa Exterior in Evening",
    url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "tall"
  },
  {
    id: "g-3",
    category: "rooms",
    title: "Deluxe Bedroom Setup",
    url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "square"
  },
  {
    id: "g-4",
    category: "nature",
    title: "Misty Hills Around the Villa",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", // Kandy hills vibe
    aspectRatio: "wide"
  },
  {
    id: "g-5",
    category: "day-outings",
    title: "Day Outing Seating Area",
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "square"
  },
  {
    id: "g-6",
    category: "events",
    title: "Birthday Celebration Setup",
    url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "wide"
  },
  {
    id: "g-7",
    category: "pool",
    title: "Refreshing Pool Waters",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "tall"
  },
  {
    id: "g-8",
    category: "nature",
    title: "Tropical Surrounding Greenery",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "wide"
  },
  {
    id: "g-9",
    category: "rooms",
    title: "Private Balcony Misty View",
    url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "square"
  },
  {
    id: "g-10",
    category: "villa",
    title: "Villa Cozy Living Space",
    url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "wide"
  },
  {
    id: "g-11",
    category: "events",
    title: "Garden Event Lighting",
    url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "tall"
  },
  {
    id: "g-12",
    category: "day-outings",
    title: "Poolside Lunch Outing",
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "square"
  }
];
