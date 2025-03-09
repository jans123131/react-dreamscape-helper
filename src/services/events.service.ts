import { Event } from '../types';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

class EventsService {
  private readonly STORAGE_KEY = 'events';

  async getEvents(): Promise<Event[]> {
    return getFromLocalStorage<Event[]>(this.STORAGE_KEY, []);
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const events = await this.getEvents();
    return events.find(event => event.id === id);
  }

  async createEvent(eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<Event> {
    const events = await this.getEvents();
    
    const newEvent: Event = {
      ...eventData,
      id: Math.max(0, ...events.map(e => e.id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    events.push(newEvent);
    saveToLocalStorage(this.STORAGE_KEY, events);
    
    return newEvent;
  }

  async updateEvent(id: number, eventData: Partial<Event>): Promise<Event | null> {
    const events = await this.getEvents();
    const index = events.findIndex(event => event.id === id);
    
    if (index === -1) return null;
    
    const updatedEvent: Event = {
      ...events[index],
      ...eventData,
      updated_at: new Date().toISOString()
    };

    events[index] = updatedEvent;
    saveToLocalStorage(this.STORAGE_KEY, events);
    
    return updatedEvent;
  }

  async deleteEvent(id: number): Promise<boolean> {
    const events = await this.getEvents();
    const filteredEvents = events.filter(event => event.id !== id);
    
    if (filteredEvents.length === events.length) return false;
    
    saveToLocalStorage(this.STORAGE_KEY, filteredEvents);
    return true;
  }
}

export const eventsService = new EventsService();