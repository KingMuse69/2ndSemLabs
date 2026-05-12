// Bilash Oleksii || IM-52
// main.js
import EventEmitter from './emitter.js';

const messenger = new EventEmitter();

// Logger
messenger.on('message', (data) => {
  console.log(`[Logger]: New message: "${data.text}" from ${data.user}`);
});

// Notification
const unsubscribeNotifications = messenger.on('message', (data) => {
  if (data.priority === 'high') {
    console.log(`[UI Notification]: Attention! Message from ${data.user}!`);
  }
});

// Analytics
messenger.on('message', () => {
  console.log(`[Analytics]: Message counter updated.`);
});

// Demonstration
console.log("--- first (working) ---");
messenger.emit('message', { user: 'Oleksii', text: 'Lab Work Almost Done', priority: 'low' });

console.log("\n--- second (high priority) ---");
messenger.emit('message', { user: 'System', text: 'Critical error in code!', priority: 'high' });

// Demonstration of the unsubscribe option
console.log("\n--- Unsubscribing UI notifications and sending a third message ---");
unsubscribeNotifications();

messenger.emit('message', { user: 'Admin', text: 'Test message', priority: 'high' });