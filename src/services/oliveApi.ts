
import { CreateOliveVarietyDto, OliveVariety, UpdateOliveVarietyDto } from "../types/olive";

const API_URL = "http://localhost:3002/olivos";

export const oliveApi = {
  async getAllVarieties(): Promise<OliveVariety[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Error al obtener las variedades de oliva');
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch olive varieties:", error);
      throw error;
    }
  },

  async getVarietyById(id: number): Promise<OliveVariety> {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`Variedad de oliva con id ${id} no encontrada`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch olive variety with id ${id}:`, error);
      throw error;
    }
  },

  async createVariety(data: CreateOliveVarietyDto): Promise<OliveVariety> {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Error al crear la variedad de oliva');
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to create olive variety:", error);
      throw error;
    }
  },

  async updateVariety(id: number, data: UpdateOliveVarietyDto): Promise<OliveVariety> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error al actualizar la variedad de oliva con id ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Failed to update olive variety with id ${id}:`, error);
      throw error;
    }
  },

  async deleteVariety(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar la variedad de oliva con id ${id}`);
      }
    } catch (error) {
      console.error(`Failed to delete olive variety with id ${id}:`, error);
      throw error;
    }
  },
};
