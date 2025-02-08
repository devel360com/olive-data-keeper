
import { CreateOliveVarietyDto, OliveVariety, UpdateOliveVarietyDto } from "../types/olive";

const API_URL = "http://localhost:3000/api/olive-varieties";

// Datos de prueba temporales
const mockData: OliveVariety[] = [
  {
    id: 1,
    name: "Picual",
    description: "Variedad española muy común, especialmente en Jaén. Produce aceites frutados y estables.",
    imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=500",
    objectUrl: "/models/picual.obj"
  },
  {
    id: 2,
    name: "Arbequina",
    description: "Variedad catalana que produce aceites dulces y suaves, muy apreciados internacionalmente.",
    imageUrl: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937?w=500",
    objectUrl: "/models/arbequina.obj"
  },
  {
    id: 3,
    name: "Hojiblanca",
    description: "Variedad andaluza de doble aptitud, tanto para aceite como para aceituna de mesa.",
    imageUrl: "https://images.unsplash.com/photo-1601472123307-2af2c9b2a76f?w=500",
    objectUrl: "/models/hojiblanca.obj"
  },
  {
    id: 4,
    name: "Manzanilla",
    description: "Variedad típica de Sevilla, conocida por su excelente calidad como aceituna de mesa.",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500",
    objectUrl: "/models/manzanilla.obj"
  },
  {
    id: 5,
    name: "Cornicabra",
    description: "Variedad muy resistente al frío, produce aceites de gran estabilidad y sabor afrutado intenso.",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500",
    objectUrl: "/models/cornicabra.obj"
  },
  {
    id: 6,
    name: "Lechín",
    description: "Variedad rústica de gran adaptabilidad, produce aceites suaves y dulces.",
    imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=500",
    objectUrl: "/models/lechin.obj"
  },
  {
    id: 7,
    name: "Verdial",
    description: "Variedad tradicional que produce aceites de gran calidad y sabor afrutado medio.",
    imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=500",
    objectUrl: "/models/verdial.obj"
  },
  {
    id: 8,
    name: "Gordal",
    description: "Variedad sevillana de gran tamaño, principalmente usada como aceituna de mesa.",
    imageUrl: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=500",
    objectUrl: "/models/gordal.obj"
  },
  {
    id: 9,
    name: "Blanqueta",
    description: "Variedad valenciana que produce aceites frescos y afrutados con notas de almendra.",
    imageUrl: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=500",
    objectUrl: "/models/blanqueta.obj"
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
