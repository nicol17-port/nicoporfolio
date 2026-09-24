const projectData = {
  name: "Waffle Haus",
  type: "Roblox Multiplayer Restaurant / Job-Roleplay",
  contributions: [
    "Scripting", "Ordering System", "Clock-In / Clock-Out System",
    "POS System", "Kitchen Systems", "Other gameplay systems"
  ],
  featured: { type: "image", src: "assets/images/waffle-haus/WaffleHaus_Banner.webp" },
  categories: [
    { name: "Scripting", media: [
      { type: "video", src: "assets/videos/waffle-haus/WaffleHaus_Scripting_01.mp4",
        caption: "Built interactive seating using ProximityPrompts, so players sit with a simple \"E\" press instead of walking into a seat. Includes smart prompt hiding while a seat is occupied. Clean, responsive interaction design throughout." }
    ] },
    { name: "Ordering System", media: [
      { type: "video", src: "assets/videos/waffle-haus/WaffleHaus_Ordering_01.mp4",
        caption: "Customers browse a live menu, customize items, and submit orders. The menu disappears immediately after ordering so customers can't spam staff with repeat orders. Server-validated to prevent exploits." }
    ] },
    { name: "Clock-In / Clock-Out", media: [
      { type: "video", src: "assets/videos/waffle-haus/WaffleHaus_ClockIn_01.mp4",
        caption: "Simple toggle lets players clock in and out as staff, syncing instantly across client and server. Powers role permissions and access throughout the game. Fully server-authoritative for security." }
    ] },
    { name: "POS System", media: [
      { type: "video", src: "assets/videos/waffle-haus/WaffleHaus_POS_01.mp4",
        caption: "Staff-only point-of-sale pulls in live customer orders in real time. Clicking an order shows full details — items and customizations — with one-click fulfillment. Access restricted to clocked-in staff only." }
    ] },
    { name: "Kitchen System", media: [
      { type: "video", src: "assets/videos/waffle-haus/WaffleHaus_Kitchen_01.mp4",
        caption: "Real cooking stations with timed preparation and independent, simultaneous use across multiple stations. Completed food routes to a pickup point for servers. Built to scale as more recipes are added." }
    ] }
  ]
};