// Dummy/Sample subscription data for testing and demo purposes

export const dummySubscriptions = [
  {
    id: '1',
    name: 'Netflix',
    category: 'entertainment',
    price: 649,
    billingCycle: 'monthly',
    renewalDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'active',
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    name: 'Spotify',
    category: 'music',
    price: 429,
    billingCycle: 'monthly',
    renewalDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'active',
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    name: 'Microsoft 365',
    category: 'productivity',
    price: 6999,
    billingCycle: 'yearly',
    renewalDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'active',
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    name: 'Adobe Creative Cloud',
    category: 'productivity',
    price: 4599,
    billingCycle: 'monthly',
    renewalDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'active',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '5',
    name: 'Dropbox',
    category: 'cloud',
    price: 599,
    billingCycle: 'monthly',
    renewalDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'active',
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '6',
    name: 'Coursera Plus',
    category: 'education',
    price: 3499,
    billingCycle: 'monthly',
    renewalDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'active',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '7',
    name: 'Apple Fitness+',
    category: 'fitness',
    price: 1099,
    billingCycle: 'monthly',
    renewalDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'active',
    createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '8',
    name: 'The New York Times',
    category: 'news',
    price: 189,
    billingCycle: 'monthly',
    renewalDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'inactive',
    createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Function to load dummy data into localStorage
export function initializeDummyData() {
  const existingData = localStorage.getItem('subscriptions');
  
  // Only initialize if no data exists
  if (!existingData) {
    localStorage.setItem('subscriptions', JSON.stringify(dummySubscriptions));
    console.log('✓ Dummy data initialized');
    return true;
  }
  
  return false;
}
