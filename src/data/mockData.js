export const demoUsers = [
  {
    id: 'user-student',
    name: 'Jordan Lee',
    studentId: 'STU202601',
    email: 'student@campus.edu',
    department: 'Computer Science',
    year: '3rd Year',
    phone: '+1 (555) 010-2026',
    password: 'campus123',
    role: 'student',
    avatar: '',
  },
  {
    id: 'user-admin',
    name: 'Campus Administrator',
    studentId: 'ADMIN001',
    email: 'admin@campus.edu',
    department: 'Student Affairs',
    year: 'Staff',
    phone: '+1 (555) 010-1000',
    password: 'admin123',
    role: 'admin',
    avatar: '',
  },
]

const image = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=82`

export const mockItems = [
  {
    id: 'item-1', name: 'Black Leather Wallet', category: 'Personal', description: 'Slim black leather wallet with a few cards inside. Lost near the quiet study area.',
    location: 'College Library', date: '2026-09-28', time: '14:30', type: 'lost', status: 'Pending',
    reportedBy: 'Jordan Lee', reporterId: 'user-student', image: image('photo-1627123424574-724758594e93'), additionalInfo: 'Has a small silver initials plate on the inside.',
  },
  {
    id: 'item-2', name: 'Blue Water Bottle', category: 'Accessories', description: 'Reusable insulated water bottle, blue with a white mountain sticker.',
    location: 'CSE Block', date: '2026-09-29', time: '11:15', type: 'found', status: 'Matching',
    reportedBy: 'Avery Morgan', reporterId: 'reporter-avery', image: image('photo-1602143407151-7111542de6e8'), additionalInfo: 'Found beside the second-floor lecture hall.',
  },
  {
    id: 'item-3', name: 'Student ID Card', category: 'Documents', description: 'Campus identification card found on a table near the food court.',
    location: 'College Canteen', date: '2026-09-30', time: '12:05', type: 'found', status: 'Pending',
    reportedBy: 'Sam Patel', reporterId: 'reporter-sam', image: image('photo-1586281380349-632531db7ed4'), additionalInfo: 'Name on card is partially covered for privacy.',
  },
  {
    id: 'item-4', name: 'Wireless Earbuds Case', category: 'Electronics', description: 'White wireless earbuds case, no earbuds inside.',
    location: 'Student Center', date: '2026-10-01', time: '16:40', type: 'found', status: 'Claimed',
    reportedBy: 'Taylor Brooks', reporterId: 'reporter-taylor', image: image('photo-1606220945770-b5b6c2c55bf1'), additionalInfo: 'Found beside the main reception desk.',
  },
  {
    id: 'item-5', name: 'Navy Blue Backpack', category: 'Bags', description: 'Navy backpack with a laptop sleeve and a small orange keychain.',
    location: 'North Lecture Hall', date: '2026-10-01', time: '09:20', type: 'lost', status: 'Matching',
    reportedBy: 'Jordan Lee', reporterId: 'user-student', image: image('photo-1553062407-98eeb64c6a62'), additionalInfo: 'Please contact me if found; contains study notes.',
  },
  {
    id: 'item-6', name: 'Silver Key Set', category: 'Personal', description: 'Three silver keys on a green fabric key ring.',
    location: 'Science Building', date: '2026-10-02', time: '13:00', type: 'found', status: 'Returned',
    reportedBy: 'Morgan Chen', reporterId: 'reporter-morgan', image: image('photo-1582139329536-e7284fece509'), additionalInfo: 'Handed in at the campus security office.',
  },
  {
    id: 'item-7', name: 'Sketchbook', category: 'Books & Stationery', description: 'A5 hardcover sketchbook with a charcoal drawing on the first page.',
    location: 'Arts Building', date: '2026-10-02', time: '15:10', type: 'lost', status: 'Pending',
    reportedBy: 'Riley James', reporterId: 'reporter-riley', image: image('photo-1513364776144-60967b0f800f'), additionalInfo: 'Dark green cover; sentimental value.',
  },
  {
    id: 'item-8', name: 'Prescription Glasses', category: 'Personal', description: 'Black rectangular-frame glasses in a hard case.',
    location: 'Campus Gym', date: '2026-10-03', time: '08:45', type: 'found', status: 'Pending',
    reportedBy: 'Casey Wilson', reporterId: 'reporter-casey', image: image('photo-1511499767150-a48a237f0083'), additionalInfo: 'Found in the locker room entrance.',
  },
  {
    id: 'item-9', name: 'Calculus Textbook', category: 'Books & Stationery', description: 'Calculus textbook with handwritten notes in the margins.',
    location: 'Engineering Building', date: '2026-10-03', time: '10:30', type: 'lost', status: 'Closed',
    reportedBy: 'Devon Ross', reporterId: 'reporter-devon', image: image('photo-1544947950-fa07a98d237f'), additionalInfo: 'Name written on the inside cover.',
  },
  {
    id: 'item-10', name: 'USB-C Charger', category: 'Electronics', description: '65W USB-C laptop charger with a braided cable.',
    location: 'Innovation Lab', date: '2026-10-03', time: '17:05', type: 'found', status: 'Pending',
    reportedBy: 'Jamie Park', reporterId: 'reporter-jamie', image: image('photo-1583863788434-e58a36330cf0'), additionalInfo: 'Left on a desk near the windows.',
  },
]

export const categories = ['Electronics', 'Personal', 'Accessories', 'Documents', 'Bags', 'Books & Stationery', 'Other']
export const campusLocations = ['College Library', 'CSE Block', 'College Canteen', 'Student Center', 'North Lecture Hall', 'Science Building', 'Arts Building', 'Campus Gym', 'Engineering Building', 'Innovation Lab', 'Other']
