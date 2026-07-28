// Mock initial user for demo mode when Firebase authentication is bypassed or offline
export const MOCK_USER = {
  uid: 'demo-user-123',
  email: 'alex.botanist@plantpal.io',
  displayName: 'Alex Rivers',
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  role: 'admin',
  emailVerified: true
};

export const MOCK_PLANTS = [
  {
    id: 'plant-1',
    userId: 'demo-user-123',
    plantName: 'Monstera Deliciosa',
    species: 'Monstera deliciosa',
    category: 'Indoor',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    waterFrequency: 7,
    fertilizerFrequency: 30,
    sunlight: 'Bright Indirect Light',
    temperature: '18°C - 27°C',
    humidity: '60%+',
    notes: 'Loves misting. Keep away from direct hot sunlight to avoid leaf scorching.',
    lastWatered: new Date(Date.now() - 4 * 86400000).toISOString(),
    nextWaterDate: new Date(Date.now() + 3 * 86400000).toISOString(),
    favorite: true,
    createdAt: new Date(Date.now() - 60 * 86400000).toISOString(),
    growthHistory: [
      { id: 'g1', date: '2026-06-01', height: 28, health: 'Excellent', notes: 'New fenestrated leaf opening!' },
      { id: 'g2', date: '2026-06-20', height: 32, health: 'Excellent', notes: 'Fed liquid organic fertilizer.' },
      { id: 'g3', date: '2026-07-15', height: 36, health: 'Good', notes: 'Repotted into 10-inch ceramic pot.' }
    ]
  },
  {
    id: 'plant-2',
    userId: 'demo-user-123',
    plantName: 'Fiddle Leaf Fig',
    species: 'Ficus lyrata',
    category: 'Indoor Tree',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
    waterFrequency: 10,
    fertilizerFrequency: 45,
    sunlight: 'Direct & Bright Light',
    temperature: '20°C - 30°C',
    humidity: '50%+',
    notes: 'Sensitive to drafts and frequent relocation. Wipe leaves with clean damp cloth.',
    lastWatered: new Date(Date.now() - 10 * 86400000).toISOString(),
    nextWaterDate: new Date(Date.now()).toISOString(), // Needs water today
    favorite: true,
    createdAt: new Date(Date.now() - 90 * 86400000).toISOString(),
    growthHistory: [
      { id: 'g10', date: '2026-05-10', height: 60, health: 'Good', notes: 'Purchased from nursery.' },
      { id: 'g11', date: '2026-07-01', height: 68, health: 'Excellent', notes: 'Two top leaves fully expanded.' }
    ]
  },
  {
    id: 'plant-3',
    userId: 'demo-user-123',
    plantName: 'Snake Plant Laurentii',
    species: 'Sansevieria trifasciata',
    category: 'Succulent',
    image: 'https://images.unsplash.com/photo-1599598425947-020645557002?auto=format&fit=crop&w=800&q=80',
    waterFrequency: 21,
    fertilizerFrequency: 60,
    sunlight: 'Low to Bright Light',
    temperature: '15°C - 29°C',
    humidity: 'Any',
    notes: 'Extremely resilient air purifier. Allow soil to completely dry out.',
    lastWatered: new Date(Date.now() - 5 * 86400000).toISOString(),
    nextWaterDate: new Date(Date.now() + 16 * 86400000).toISOString(),
    favorite: false,
    createdAt: new Date(Date.now() - 120 * 86400000).toISOString(),
    growthHistory: [
      { id: 'g20', date: '2026-04-15', height: 40, health: 'Excellent', notes: 'Growing steady.' }
    ]
  },
  {
    id: 'plant-4',
    userId: 'demo-user-123',
    plantName: 'Peace Lily',
    species: 'Spathiphyllum wallisii',
    category: 'Flowering',
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=800&q=80',
    waterFrequency: 5,
    fertilizerFrequency: 30,
    sunlight: 'Medium Shaded Light',
    temperature: '18°C - 25°C',
    humidity: '70%+',
    notes: 'Dramatically droops when thirsty. Prefers filtered or distilled water.',
    lastWatered: new Date(Date.now() - 5 * 86400000).toISOString(),
    nextWaterDate: new Date(Date.now()).toISOString(), // Needs water today
    favorite: false,
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    growthHistory: [
      { id: 'g30', date: '2026-07-10', height: 25, health: 'Good', notes: 'Bloomed white spathe flower.' }
    ]
  }
];

export const MOCK_JOURNAL = [
  {
    id: 'j-1',
    userId: 'demo-user-123',
    plantId: 'plant-1',
    plantName: 'Monstera Deliciosa',
    date: new Date(Date.now() - 2 * 86400000).toISOString(),
    mood: '😊 Thriving',
    healthStatus: 'Excellent',
    content: 'Sprayed leaves with neem oil solution for preventive pest care. Soil dampness check passed.',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'j-2',
    userId: 'demo-user-123',
    plantId: 'plant-2',
    plantName: 'Fiddle Leaf Fig',
    date: new Date(Date.now() - 7 * 86400000).toISOString(),
    mood: '🤔 Needs Attention',
    healthStatus: 'Moderate',
    content: 'Noticed slight yellowing on lower leaves. Lowering watering frequency slightly.',
    image: null
  }
];

export const MOCK_DISEASES_DB = [
  {
    id: 'd1',
    name: 'Powdery Mildew',
    confidence: '94%',
    symptoms: 'White powdery fungus spots on leaves, stems, and leaf buds.',
    causes: 'High humidity combined with low light and poor air circulation.',
    treatment: [
      'Isolate infected plant to prevent spreading.',
      'Wipe down leaves with a baking soda and mild soap mixture (1 tsp baking soda per 1L water).',
      'Improve room ventilation and place plant in brighter indirect spot.'
    ],
    severity: 'Medium'
  },
  {
    id: 'd2',
    name: 'Root Rot (Pythium / Phytophthora)',
    confidence: '88%',
    symptoms: 'Wilting despite damp soil, yellowing lower leaves, mushy brown roots with foul smell.',
    causes: 'Overwatering and poorly draining soil mix.',
    treatment: [
      'Unpot plant immediately and trim off all mushy, black roots using disinfected shears.',
      'Repot into fresh, well-draining soil mixed with perlite.',
      'Reduce watering frequency by half.'
    ],
    severity: 'High'
  },
  {
    id: 'd3',
    name: 'Spider Mite Infestation',
    confidence: '91%',
    symptoms: 'Fine silk webbing underneath leaves, speckled yellow or stippled spots on leaf surfaces.',
    causes: 'Dry indoor air and low humidity levels.',
    treatment: [
      'Shower leaves thoroughly with lukewarm water to remove webbing.',
      'Apply organic Neem oil spray evenly over stems and both sides of leaves.',
      'Increase room ambient humidity with a humidifier or water pebble tray.'
    ],
    severity: 'Medium'
  }
];

export const MOCK_USERS_ADMIN = [
  { uid: 'demo-user-123', name: 'Alex Rivers', email: 'alex.botanist@plantpal.io', role: 'admin', plantsCount: 4, joinedDate: '2026-01-15' },
  { uid: 'user-2', name: 'Sarah Jenkins', email: 'sarah.j@gmail.com', role: 'user', plantsCount: 12, joinedDate: '2026-03-22' },
  { uid: 'user-3', name: 'Michael Chen', email: 'mchen.plants@yahoo.com', role: 'user', plantsCount: 7, joinedDate: '2026-05-10' },
  { uid: 'user-4', name: 'Elena Rostova', email: 'elena.r@design.co', role: 'user', plantsCount: 18, joinedDate: '2026-06-04' }
];
