export class Emitter {
  constructor() {
    this.listeners = {};
  }

  // Уведомляем слушателей, если они есть
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }

    this.listeners[event].forEach(listener => listener(...args));
    return true;
  }

  // Подписываемся на уведомления
  // Добавляем нового слушателя
  subscribe(event, callback) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(callback);

    // Для очистки
    return () => {
      this.listeners[event] = this.listeners[event]
          .filter(listener => listener !== callback);
    };
  }
}
