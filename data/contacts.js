/**
 * Simple static contacts dataset.
 *
 * Each contact object uses this shape:
 * { id, name, type ("police"|"consultancy"), phone, description }
 *
 * Notes:
 * - `id` is a stable string key for lists.
 * - `phone` is stored as a string so short codes (e.g. "112") work.
 */

const contacts = [
  // Police / law-enforcement helplines
  {
    id: 'police-1',
    name: 'Emergency Response Support System (ERSS)',
    type: 'police',
    phone: '112',
    description: 'Pan-India emergency number (police/ambulance/fire); 24/7.',
  },
  {
    id: 'police-2',
    name: 'Police Control Room',
    type: 'police',
    phone: '100',
    description: 'Police emergency control room; 24/7 (where supported).',
  },
  {
    id: 'police-3',
    name: 'National Cyber Crime Helpline',
    type: 'police',
    phone: '1930',
    description: 'Report online financial fraud and cybercrime incidents.',
  },

  // Consultancy / support helplines (guidance, counseling, reporting)
  {
    id: 'consultancy-1',
    name: 'CHILDLINE (Children in distress)',
    type: 'consultancy',
    phone: '1098',
    description: '24/7 helpline for children needing assistance.',
  },
  {
    id: 'consultancy-2',
    name: 'Women Helpline',
    type: 'consultancy',
    phone: '181',
    description: 'Support and guidance for women in distress (availability varies by state).',
  },
  {
    id: 'consultancy-3',
    name: 'KIRAN Mental Health Helpline',
    type: 'consultancy',
    phone: '1800-599-0019',
    description: 'Mental health support and counseling helpline.',
  },
];

export default contacts;
