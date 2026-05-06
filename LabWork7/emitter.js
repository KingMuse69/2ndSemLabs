// Bilash Oleksii || IM-52
// emitter.js
class EventEmitter {
  constructor() {
    this.events = {};
  }

  //(subscribe)
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);

    //(unsubscribe)
    return () => {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    };
  }

  //(emit/notify)
  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => callback(data));
    }
  }
}

export default EventEmitter;