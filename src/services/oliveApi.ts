
import { CreateOliveVarietyDto, OliveVariety, UpdateOliveVarietyDto } from "../types/olive";

const API_URL = "http://localhost:3000/api/olive-varieties";

// Datos de prueba temporales
const mockData: OliveVariety[] = [
  {
    id: 1,
    name: "Picual",
    description: "Variedad española muy común, especialmente en Jaén. Produce aceites frutados y estables.",
    imageUrl: "https://images.unsplash.com/photo-1601472123307-2af2c9b2a76f?w=500",
    objectUrl: "/models/picual.obj"
  },
  {
    id: 2,
    name: "Arbequina",
    description: "Variedad catalana que produce aceites dulces y suaves, muy apreciados internacionalmente.",
    imageUrl: "https://images.unsplash.com/photo-1578344174061-49eb12fbbbdf?w=500",
    objectUrl: "/models/arbequina.obj"
  },
  {
    id: 3,
    name: "Hojiblanca",
    description: "Variedad andaluza de doble aptitud, tanto para aceite como para aceituna de mesa.",
    imageUrl: "https://images.unsplash.com/photo-1632506823014-3f6f4a3c28bb?w=500",
    objectUrl: "/models/hojiblanca.obj"
  }
];

// Simulación de delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const oliveApi = {
  async getAllVarieties(): Promise<OliveVariety[]> {
    try {
      await delay(500); // Simular latencia de red
      return [...mockData];
    } catch (error) {
      console.error("Failed to fetch olive varieties:", error);
      throw error;
    }
  },

  async getVarietyById(id: number): Promise<OliveVariety> {
    try {
      await delay(500);
      const variety = mockData.find(v => v.id === id);
      if (!variety) {
        throw new Error(`Olive variety with id ${id} not found`);
      }
      return { ...variety };
    } catch (error) {
      console.error(`Failed to fetch olive variety with id ${id}:`, error);
      throw error;
    }
  },

  async createVariety(data: CreateOliveVarietyDto): Promise<OliveVariety> {
    try {
      await delay(500);
      const newVariety: OliveVariety = {
        ...data,
        id: mockData.length + 1,
      };
      mockData.push(newVariety);
      return { ...newVariety };
    } catch (error) {
      console.error("Failed to create olive variety:", error);
      throw error;
    }
  },

  async updateVariety(id: number, data: UpdateOliveVarietyDto): Promise<OliveVariety> {
    try {
      await delay(500);
      const index = mockData.findIndex(v => v.id === id);
      if (index === -1) {
        throw new Error(`Olive variety with id ${id} not found`);
      }
      const updatedVariety = {
        ...mockData[index],
        ...data,
      };
      mockData[index] = updatedVariety;
      return { ...updatedVariety };
    } catch (error) {
      console.error(`Failed to update olive variety with id ${id}:`, error);
      throw error;
    }
  },

  async deleteVariety(id: number): Promise<void> {
    try {
      await delay(500);
      const index = mockData.findIndex(v => v.id === id);
      if (index === -1) {
        throw new Error(`Olive variety with id ${id} not found`);
      }
      mockData.splice(index, 1);
    } catch (error) {
      console.error(`Failed to delete olive variety with id ${id}:`, error);
      throw error;
    }
  },
};
