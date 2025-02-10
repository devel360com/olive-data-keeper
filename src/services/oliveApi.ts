
import { CreateOliveVarietyDto, OliveVariety, UpdateOliveVarietyDto } from "../types/olive";

const API_URL = "https://vr360.es/olivos/";

// Simulación de delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const oliveApi = {
  async getAllVarieties(): Promise<OliveVariety[]> {
    try {
      await delay(500); // Simular latencia de red
      const response = await fetch(API_URL, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch olive varieties:", error);
      throw error;
    }
  },

  async getVarietyById(id: number): Promise<OliveVariety> {
    try {
      await delay(500);
      const response = await fetch(`${API_URL}${id}`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch olive variety with id ${id}:`, error);
      throw error;
    }
  },

  async createVariety(data: CreateOliveVarietyDto): Promise<OliveVariety> {
    try {
      await delay(500);
      const response = await fetch(API_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to create olive variety:", error);
      throw error;
    }
  },

  async updateVariety(id: number, data: UpdateOliveVarietyDto): Promise<OliveVariety> {
    try {
      await delay(500);
      const response = await fetch(`${API_URL}${id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error(`Failed to update olive variety with id ${id}:`, error);
      throw error;
    }
  },

  async deleteVariety(id: number): Promise<void> {
    try {
      await delay(500);
      const response = await fetch(`${API_URL}${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error(`Failed to delete olive variety with id ${id}:`, error);
      throw error;
    }
  },
};
