// Utility functions for localStorage operations

// Get all subscriptions from localStorage
export function getAllSubscriptions() {
  try {
    const data = localStorage.getItem('subscriptions');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading subscriptions:', error);
    return [];
  }
}

// Save subscriptions to localStorage
export function saveSubscriptions(subscriptions) {
  try {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    return true;
  } catch (error) {
    console.error('Error saving subscriptions:', error);
    return false;
  }
}

// Add a new subscription
export function addSubscription(subscription) {
  const subscriptions = getAllSubscriptions();
  const newSubscription = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    ...subscription
  };
  subscriptions.push(newSubscription);
  saveSubscriptions(subscriptions);
  return newSubscription;
}

// Update an existing subscription
export function updateSubscription(id, updatedData) {
  const subscriptions = getAllSubscriptions();
  const index = subscriptions.findIndex(sub => sub.id === id);
  if (index !== -1) {
    subscriptions[index] = { ...subscriptions[index], ...updatedData };
    saveSubscriptions(subscriptions);
    return subscriptions[index];
  }
  return null;
}

// Delete a subscription
export function deleteSubscription(id) {
  const subscriptions = getAllSubscriptions();
  const filtered = subscriptions.filter(sub => sub.id !== id);
  saveSubscriptions(filtered);
  return true;
}

// Get activity/history - get all subscriptions sorted by date
export function getActivityHistory() {
  const subscriptions = getAllSubscriptions();
  return subscriptions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}
