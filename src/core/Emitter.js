export class Emitter {
  constructor() {
    this.listeners = {};
  }

  // Notify listeners if there are any
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }

    this.listeners[event].forEach(listener => listener(...args));
    return true;
  }

  // Subscribe to notifications
  // Add new listener
  subscribe(event, callback) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(callback);

    // For cleaning
    return () => {
      this.listeners[event] = this.listeners[event]
          .filter(listener => listener !== callback);
    };
  }
}
