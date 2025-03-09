import api from './api';
import { Task } from '../types';

class TasksService {
  async getTasks(): Promise<Task[]> {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await api.get(`/tasks/read.php?user_id=${user.id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  }

  async createTask(taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task | null> {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await api.post('/tasks/create.php', {
        ...taskData,
        user_id: user.id
      });
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      return null;
    }
  }

  async updateTask(id: string, taskData: Partial<Task>): Promise<Task | null> {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await api.put('/tasks/update.php', {
        id,
        ...taskData,
        user_id: user.id
      });
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      return null;
    }
  }

  async deleteTask(id: string): Promise<boolean> {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      await api.delete('/tasks/delete.php', {
        data: { id, user_id: user.id }
      });
      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      return false;
    }
  }
}

export const tasksService = new TasksService();