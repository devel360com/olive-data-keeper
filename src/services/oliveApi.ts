
import { CreateOliveVarietyDto, OliveVariety, UpdateOliveVarietyDto } from "../types/olive";

const API_URL = "http://localhost:3002/olivos";

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export const oliveApi = {
  async getAllVarieties(): Promise<OliveVariety[]> {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: defaultHeaders,
        mode: 'cors'
      });
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
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: defaultHeaders,
        mode: 'cors'
      });
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
        headers: defaultHeaders,
        mode: 'cors',
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
        headers: defaultHeaders,
        mode: 'cors',
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
        headers: defaultHeaders,
        mode: 'cors'
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
