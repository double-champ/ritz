/**
 * RITZ NATURE VILLA IMAGE MANAGEMENT DIRECTORY
 * 
 * To replace placeholder images with real Ritz Nature Villa hotel photos,
 * upload your images to public/images/ under the respective subfolders,
 * then update the URLs in this file.
 * 
 * Folder Categories Plan:
 * - Pool:            /images/pool/             (e.g., pool-infinity.jpg)
 * - Villa Exterior:  /images/exterior/         (e.g., villa-front.jpg)
 * - Rooms:           /images/rooms/            (e.g., room-deluxe.jpg)
 * - Bathrooms:       /images/bathrooms/        (e.g., bathroom-modern.jpg)
 * - Dining:          /images/dining/           (e.g., restaurant-buffet.jpg)
 * - Nature:          /images/nature/           (e.g., hills-mist.jpg)
 * - Events:          /images/events/           (e.g., party-setup.jpg)
 * - Day Outings:     /images/outings/          (e.g., group-outing.jpg)
 * - Birthday Setups: /images/birthdays/        (e.g., birthday-poolside.jpg)
 */

export interface Package {
  id: string;
  name: string;
  category: "stay" | "day-outing" | "pool" | "event";
  shortDescription: string;
  description: string;
  suitableFor: string;
  guestCount: string;
  facilities: string[]; // Keep for compatibility
  price: string;
  priceValue?: number;
  image: string; // Replace with real image path later (e.g. "/images/pool/pool-infinity.jpg")
  duration: string;
  included: string[];
  excluded: string[];
  extraGuestCharge: string;
  availability: string;
  bookingNote: string;
}

export const packages: Package[] = [
  {
    id: "pool-access",
    name: "Pool Access Package",
    category: "pool",
    shortDescription: "Enjoy a refreshing pool day surrounded by peaceful nature.",
    description: "Dive into our crystal-clear infinity pool nested in the hills of Kandy. Perfect for a quick recharge, couples, or friends looking for a peaceful day out. Access from Rs. 500 per person.",
    suitableFor: "Couples, Friends, Families",
    guestCount: "1 - 50 guests",
    facilities: [
      "Infinity pool access",
      "Changing rooms & showers",
      "Secure parking",
      "Beautiful garden access"
    ],
    price: "Rs. 500 / person",
    priceValue: 500,
    /* 
     * REPLACE WITH REAL PHOTO:
     * Category: Pool
     * Recommended File: /images/pool/pool-infinity.jpg
     */
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
    duration: "Day Pass (8:00 AM - 6:00 PM)",
    included: [
      "Infinity pool access",
      "Access to changing rooms & showers",
      "Secure vehicle parking",
      "Garden seating areas & lawns"
    ],
    excluded: [
      "Room stay / overnight access",
      "Meals, beverages & snacks",
      "Towel rental (available for extra fee)",
      "Dedicated room use"
    ],
    extraGuestCharge: "N/A (Pay per person)",
    availability: "Available Daily (Prior call recommended)",
    bookingNote: "Outside pool toys and sound systems are not permitted. Advance notice is appreciated for groups larger than 10."
  },
  {
    id: "day-outing",
    name: "Day Outing Package",
    category: "day-outing",
    shortDescription: "The perfect daytime escape with dining and pool access.",
    description: "Gather your group or family for a relaxing day outing. Enjoy full pool access, delicious meals, private changing areas, and gorgeous nature views of Dunuhappawa.",
    suitableFor: "Groups, Families, Corporates",
    guestCount: "5 - 30 guests",
    facilities: [
      "Welcome drink",
      "Locker room & private lounge area",
      "Infinity pool access",
      "Evening tea & snacks"
    ],
    price: "Contact for Rates",
    /* 
     * REPLACE WITH REAL PHOTO:
     * Category: Day outings
     * Recommended File: /images/outings/group-outing.jpg
     */
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    duration: "Full Day (9:00 AM - 5:00 PM)",
    included: [
      "Welcome drink on arrival",
      "Poolside infinity pool access",
      "Private changing room & lockers",
      "Authentic Sri Lankan rice & curry buffet lunch",
      "Evening tea or coffee with Sri Lankan snacks"
    ],
    excluded: [
      "Overnight bedroom stay",
      "Corkage charges for external beverages",
      "Extra meals or custom dessert setups"
    ],
    extraGuestCharge: "Rs. 2,000 per extra guest over package limit",
    availability: "Available Daily (Requires booking 24 hours prior)",
    bookingNote: "Minimum group size of 5 guests is required to book this package. Advance deposit required for lunch buffet confirmation."
  },
  {
    id: "couple-escape",
    name: "Couple Escape Package",
    category: "stay",
    shortDescription: "A romantic overnight retreat in the misty hills of Kandy.",
    description: "Unplug from the daily rush and retreat with your loved one. Watch the sunrise from your private balcony, enjoy a romantic dinner by the pool, and wake up to mountain breezes.",
    suitableFor: "Couples",
    guestCount: "2 guests",
    facilities: [
      "Luxury double bedroom",
      "Private balcony with mountain view",
      "Full pool access",
      "Complimentary breakfast"
    ],
    price: "Contact for Rates",
    /* 
     * REPLACE WITH REAL PHOTO:
     * Category: Rooms
     * Recommended File: /images/rooms/couple-deluxe.jpg
     */
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    duration: "Overnight Stay (Check-in 2:00 PM, Check-out 11:00 AM)",
    included: [
      "Luxury double bedroom with king bed",
      "Private attached bathroom with hot water",
      "Balcony with panoramic hill view",
      "Complimentary breakfast for two",
      "Unlimited pool access during stay",
      "Free high-speed Wi-Fi"
    ],
    excluded: [
      "Lunch and dinner (available to order)",
      "Alcoholic beverages",
      "Custom bedside decorations (can be requested extra)"
    ],
    extraGuestCharge: "Rs. 3,500 per night for an extra mattress",
    availability: "Available Daily (Highly subject to room booking status)",
    bookingNote: "Ideal romantic escape. Advise checking availability at least 3 days in advance."
  },
  {
    id: "family-villa",
    name: "Family Villa Package",
    category: "stay",
    shortDescription: "The ultimate getaway for the entire family in a private villa.",
    description: "Take over our spacious villa. With comfortable rooms, child-friendly settings, and wide garden spaces, it is the perfect spot for multi-generational families to create memories.",
    suitableFor: "Families",
    guestCount: "6 - 12 guests",
    facilities: [
      "Exclusive access to the full villa",
      "Multiple deluxe bedrooms",
      "Private infinity pool time",
      "Fully-equipped kitchen/dining area"
    ],
    price: "Contact for Rates",
    /* 
     * REPLACE WITH REAL PHOTO:
     * Category: Villa exterior
     * Recommended File: /images/exterior/full-villa.jpg
     */
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    duration: "Overnight Stay (Check-in 2:00 PM, Check-out 11:00 AM)",
    included: [
      "Exclusive full use of the Ritz Nature Villa",
      "3 deluxe bedrooms + 3 attached bathrooms",
      "Private use of the infinity pool",
      "Kitchen access & custom dining setup",
      "Private living lounge and lush garden lawns",
      "Villa host & helper support"
    ],
    excluded: [
      "All meals (private chef or buffet can be arranged for a fee)",
      "Laundry service (can be requested)"
    ],
    extraGuestCharge: "Rs. 2,500 per extra guest over 6",
    availability: "Prior reservation mandatory (Minimum 1 week notice)",
    bookingNote: "Excellent for private family meetups or mini reunions. Secure parking for up to 4 vehicles."
  },
  {
    id: "nature-stay",
    name: "Nature Stay Package",
    category: "stay",
    shortDescription: "Reconnect with the earth in our scenic accommodation.",
    description: "A package focused on mindfulness and clean mountain living. Wake up early for bird watching, practice yoga by the pool, and enjoy organic local dishes cooked to perfection.",
    suitableFor: "Nature Lovers, Solo Travelers",
    guestCount: "1 - 4 guests",
    facilities: [
      "Comfortable forest-facing rooms",
      "Infinity pool access",
      "Guided village/nature walks",
      "Fresh organic meals"
    ],
    price: "Contact for Rates",
    /* 
     * REPLACE WITH REAL PHOTO:
     * Category: Nature
     * Recommended File: /images/nature/forest-retreat.jpg
     */
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    duration: "Overnight Stay (Flexible check-in options)",
    included: [
      "Forest-facing bedroom with garden view",
      "Healthy traditional breakfast",
      "Yoga mat & deck space access",
      "Guided morning walk to the village valley",
      "Infinity pool access"
    ],
    excluded: [
      "Transport charges to Kandy town",
      "Non-traditional custom foods"
    ],
    extraGuestCharge: "Rs. 3,000 per night for an extra guest",
    availability: "Available Daily (Requires 2 days notice)",
    bookingNote: "Perfect for travelers seeking quiet writing retreats or peaceful relaxation. Birds watching guides can be requested."
  },
  {
    id: "birthday-celebration",
    name: "Birthday Celebration Package",
    category: "event",
    shortDescription: "Celebrate your special milestone by the infinity pool.",
    description: "Make your birthday unforgettable. Host a pool party or an intimate dinner under the stars, complete with custom decorations, music settings, and delicious party menus.",
    suitableFor: "Birthday hosts, Small groups",
    guestCount: "10 - 40 guests",
    facilities: [
      "Event decoration setup support",
      "Poolside party space",
      "Premium audio system setup",
      "Customized BBQ or dinner buffet"
    ],
    price: "Contact for Rates",
    /* 
     * REPLACE WITH REAL PHOTO:
     * Category: Birthday setups
     * Recommended File: /images/birthdays/birthday-pool.jpg
     */
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
    duration: "Event Booking (6 Hours limit, Day or Night)",
    included: [
      "Exclusive poolside event space access",
      "Basic balloon or thematic birthday backdrop decoration",
      "Outdoor music speakers & sound setup",
      "Dedicated server & hosting helper",
      "Cake cutting stand & table presentation"
    ],
    excluded: [
      "Overnight bedroom stay (available as add-on stay)",
      "Cake (can be ordered separately via our bakers)",
      "Professional photography / DJ hire"
    ],
    extraGuestCharge: "Rs. 1,500 per extra guest over 15",
    availability: "Requires advance booking (1-2 weeks notice)",
    bookingNote: "Cancellation must be done at least 5 days prior to release dates. Events can run until 10:00 PM."
  }
];
