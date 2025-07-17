import { Movie, Testimonial, Genre, IptvPlan, PlayerPlan } from './types';

export const GENRES: string[] = Object.values(Genre);
export const LANGUAGES: string[] = ["Urdu", "English", "Hindi", "Punjabi"];
export const SERVERS: string[] = ["Streameefy", "VBox", "Xtv Live"];

export const DEFAULT_MOVIES: Movie[] = [
  {
    id: 1,
    title: "Inception",
    posterUrl: "https://picsum.photos/seed/inception/400/600",
    genre: Genre.SciFi,
    languages: ["English", "Hindi"],
    server: "Alpha-S1",
    price: 29.99,
    priceType: 'monthly',
    rating: 5,
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster."
  },
  {
    id: 2,
    title: "The Dark Knight",
    posterUrl: "https://picsum.photos/seed/darkknight/400/600",
    genre: Genre.Action,
    languages: ["English", "Hindi"],
    server: "Bravo-S2",
    price: 49.99,
    priceType: 'one-time',
    rating: 5,
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
  },
  {
    id: 3,
    title: "Pulp Fiction",
    posterUrl: "https://picsum.photos/seed/pulpfiction/400/600",
    genre: Genre.Drama,
    languages: ["English", "Urdu"],
    server: "Alpha-S1",
    price: 19.99,
    priceType: 'monthly',
    rating: 4,
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
  },
  {
    id: 4,
    title: "The Matrix",
    posterUrl: "https://picsum.photos/seed/matrix/400/600",
    genre: Genre.SciFi,
    languages: ["English"],
    server: "Charlie-S3",
    price: 24.99,
    priceType: 'monthly',
    rating: 5,
    description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence."
  },
  {
    id: 5,
    title: "Forrest Gump",
    posterUrl: "https://picsum.photos/seed/forrestgump/400/600",
    genre: Genre.Drama,
    languages: ["English", "Punjabi"],
    server: "Delta-S4",
    price: 15.00,
    priceType: 'monthly',
    rating: 4,
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart."
  },
  {
    id: 6,
    title: "The Silence of the Lambs",
    posterUrl: "https://picsum.photos/seed/lambs/400/600",
    genre: Genre.Thriller,
    languages: ["English"],
    server: "Bravo-S2",
    price: 35.50,
    priceType: 'one-time',
    rating: 4,
    description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims."
  },
   {
    id: 7,
    title: "Parasite",
    posterUrl: "https://picsum.photos/seed/parasite/400/600",
    genre: Genre.Thriller,
    languages: ["Hindi"],
    server: "Charlie-S3",
    price: 29.99,
    priceType: 'one-time',
    rating: 5,
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan."
  },
   {
    id: 8,
    title: "Gladiator",
    posterUrl: "https://picsum.photos/seed/gladiator/400/600",
    genre: Genre.Action,
    languages: ["English", "Urdu"],
    server: "Delta-S4",
    price: 18.99,
    priceType: 'monthly',
    rating: 4,
    description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery."
  },
  {
    id: 9,
    title: "Interstellar",
    posterUrl: "https://picsum.photos/seed/interstellar/400/600",
    genre: Genre.SciFi,
    languages: ["English", "Hindi"],
    server: "Alpha-S1",
    price: 55.00,
    priceType: 'one-time',
    rating: 5,
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  {
    id: 10,
    title: "The Grand Budapest Hotel",
    posterUrl: "https://picsum.photos/seed/budapest/400/600",
    genre: Genre.Comedy,
    languages: ["English", "Punjabi"],
    server: "Delta-S4",
    price: 12.99,
    priceType: 'monthly',
    rating: 4,
    description: "The adventures of Gustave H, a legendary concierge at a famous hotel from the fictional Republic of Zubrowka between the first and second World Wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend."
  },
];

export const IPTV_PLANS: IptvPlan[] = [
  {
    name: "Standard",
    price: 15.99,
    duration: "1 Month",
    features: [
      "24,000+ Live Channels",
      "150,000+ VOD",
      "Full HD & 4K Quality",
      "1 Connection",
      "EPG Included",
      "Anti-Buffer Technology"
    ]
  },
  {
    name: "Premium",
    price: 39.99,
    duration: "3 Months",
    features: [
      "24,000+ Live Channels",
      "150,000+ VOD",
      "Full HD & 4K Quality",
      "1 Connection",
      "EPG Included",
      "Anti-Buffer Technology"
    ],
    bestValue: true,
  },
    {
    name: "Ultimate",
    price: 69.99,
    duration: "1 Year",
    features: [
      "24,000+ Live Channels",
      "150,000+ VOD",
      "Full HD & 4K Quality",
      "2 Connections",
      "EPG Included",
      "Anti-Buffer Technology",
      "24/7 Priority Support"
    ]
  }
];

export const PLAYER_PLANS: PlayerPlan[] = [
  {
    name: "IPTV Smarters Pro",
    price: 9.99,
    description: "A popular and reliable player with a user-friendly interface.",
    devices: ["Android TV", "Firestick", "iOS", "Windows"]
  },
  {
    name: "TiviMate Premium",
    price: 9.99,
    description: "Advanced features for serious streamers, including customization and powerful EPG.",
    devices: ["Android TV", "Firestick"]
  },
  {
    name: "IBO Player",
    price: 9.99,
    description: "A modern and feature-rich media player for Smart TVs, known for its performance and stability.",
    devices: ["Smart TV (LG/Samsung)", "Android TV", "Firestick"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Alex Johnson",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    review: "The streaming quality is top-notch, and the movie selection is fantastic. The 'How it Works' section made setup a breeze!",
    rating: 5,
  },
  {
    name: "Maria Garcia",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026703d",
    review: "I love the dark theme and the smooth interface. Finding movies by server is a feature I didn't know I needed. Highly recommend!",
    rating: 5,
  },
  {
    name: "Ken Watanabe",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026705d",
    review: "Affordable prices and a great library. The one-time purchase option is perfect for me. Customer support via WhatsApp was surprisingly fast.",
    rating: 5,
  },
  {
    name: "Samantha Lee",
    avatarUrl: "https://i.pravatar.cc/150?u=samantha-lee",
    review: "Absolutely seamless experience from start to finish. The 4K quality is unbelievable, and the channel lineup is extensive. Best IPTV service I've used.",
    rating: 5,
  },
  {
    name: "David Chen",
    avatarUrl: "https://i.pravatar.cc/150?u=david-chen",
    review: "I was skeptical at first, but Streameefy exceeded all my expectations. The variety of movies and shows is incredible. It's a game-changer!",
    rating: 5,
  }
];

export const CHANNELS: string[] = [
  "ABC", "NBC", "CBS", "FOX", "CNN", "MSNBC", "ESPN", "ESPN 2", "Fox Sports 1",
  "Fox Sports 2", "NBC Sports", "TNT", "TBS", "USA Network", "AMC", "FX", "HBO",
  "Showtime", "Starz", "Cinemax", "Discovery Channel", "National Geographic",
  "Animal Planet", "History Channel", "A&E", "Lifetime", "Bravo", "E! Entertainment",
  "HGTV", "Food Network", "Travel Channel", "Cartoon Network", "Disney Channel",
  "Nickelodeon", "Boomerang", "PBS", "Comedy Central", "MTV", "VH1", "BET",
  "Hallmark Channel", "Syfy", "Oxygen", "The CW", "NBA TV", "NFL Network",
  "MLB Network", "NHL Network", "CBS Sports Network", "Golf Channel", "Newsmax",
  "OAN (One America News)", "Bloomberg", "Weather Channel"
];

export const OTT_PLATFORMS = [
  { name: 'Netflix', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
  { name: 'Amazon Prime Video', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png' },
  { name: 'Disney+', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg' },
  { name: 'Hulu', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Hulu_Logo.svg' },
  { name: 'YouTube', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg' },
  { name: 'ZEE5', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/ZEE5_logo.svg' },
  { name: 'Hotstar', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Disney%2B_Hotstar_logo.svg' },
  { name: 'ALTBalaji', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/ALTBalaji_Logo.svg' },
  { name: 'Eros Now', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Eros_Now_logo.svg' },
  { name: 'Apple TV+', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Apple_TV_Plus_Logo.svg' },
  { name: 'MX Player', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/MX_Player_logo.svg' },
  { name: 'Hoichoi', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Hoichoi_logo.svg' },
  { name: 'JioCinema', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/JioCinema_logo.svg' },
  { name: 'Aha', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Aha_OTT_logo.svg' },
  { name: 'Sun NXT', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Sun_NXT_logo.svg' },
  { name: 'Voot', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Voot_logo.svg' },
  { name: 'Hungama', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Hungama_logo.svg' },
  { name: 'ManoramaMAX', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ManoramaMAX_logo.svg' },
  { name: 'Planet Marathi', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Planet_Marathi_logo.svg' },
  { name: 'Discovery+', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Discovery%2B_logo.svg' },
  { name: 'Airtel Xstream Play', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Airtel_Xstream_Play_logo.svg' },
  { name: 'Chaupal', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Chaupal_logo.svg' },
  { name: 'Lionsgate Play', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Lionsgate_Play_logo.svg' },
  { name: 'Mubi', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Mubi_logo.svg' }
];
