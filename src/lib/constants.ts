const image = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800`;

// "value" is what we save in MongoDB, "label" is what we show on the home page
export const categories = [
  { value: "Photo Studio", label: "Photo Studios", image: image(17094501) },
  { value: "Film Stage", label: "Sound Stages", image: image(8089249) },
  { value: "Podcast Lounge", label: "Podcast Rooms", image: image(7383469) },
  { value: "Music Suite", label: "Music Suites", image: image(8197361) },
  { value: "Workshop", label: "Art Workshops", image: image(4348298) },
];

export const amenities = [
  "Cyc wall",
  "Strobe lighting",
  "Natural light",
  "Blackout",
  "Green screen",
  "Lighting grid",
  "Drive-in access",
  "Makeup room",
  "Broadcast mics",
  "Acoustic treatment",
  "Live streaming",
  "Full backline",
  "Recording engineer",
  "Iso booth",
  "Props",
  "Wi-Fi",
  "Parking",
];

// 08:00, 09:00 ... 23:00
export const timeSlots = Array.from(
  { length: 16 },
  (_, index) => `${String(index + 8).padStart(2, "0")}:00`,
);
