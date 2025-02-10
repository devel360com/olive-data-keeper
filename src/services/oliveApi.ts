
import { CreateOliveVarietyDto, OliveVariety, UpdateOliveVarietyDto } from "../types/olive";

// Datos de prueba mientras se resuelve el CORS
const mockData: OliveVariety[] = [
  {
    id: 1,
    nombre: "Picual",
    descripcion: "Variedad de olivo más importante en España, especialmente en Jaén.",
    urlImagen: "https://images.unsplash.com/photo-1601666881567-2c8a55e23ad6?w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    nombre: "Arbequina",
    descripcion: "Variedad catalana de gran importancia internacional.",
    urlImagen: "https://images.unsplash.com/photo-1595407753234-0882f1e77954?w=800&auto=format&fit=crop"
  }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const oliveApi = {
  async getAllVarieties(): Promise<OliveVariety[]> {
    await delay(500);
    return mockData;
  },

  async getVarietyById(id: number): Promise<OliveVariety> {
    await delay(500);
    const variety = mockData.find(v => v.id === id);
    if (!variety) {
      throw new Error('Variety not found');
    }
    return variety;
  },

  async createVariety(data: CreateOliveVarietyDto): Promise<OliveVariety> {
    await delay(500);
    const newVariety: OliveVariety = {
      id: mockData.length + 1,
      ...data
    };
    mockData.push(newVariety);
    return newVariety;
  },

  async updateVariety(id: number, data: UpdateOliveVarietyDto): Promise<OliveVariety> {
    await delay(500);
    const index = mockData.findIndex(v => v.id === id);
    if (index === -1) {
      throw new Error('Variety not found');
    }
    const updatedVariety = {
      ...mockData[index],
      ...data
    };
    mockData[index] = updatedVariety;
    return updatedVariety;
  },

  async deleteVariety(id: number): Promise<void> {
    await delay(500);
    const index = mockData.findIndex(v => v.id === id);
    if (index !== -1) {
      mockData.splice(index, 1);
    }
  }
};
