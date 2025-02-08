
import { CreateOliveVarietyDto, OliveVariety, UpdateOliveVarietyDto } from "../types/olive";

const API_URL = "http://localhost:3000/api/olive-varieties";

export const oliveApi = {
  async getAllVarieties(): Promise<OliveVariety[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch olive varieties");
    return response.json();
  },

  async getVarietyById(id: number): Promise<OliveVariety> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch olive variety");
    return response.json();
  },

  async createVariety(data: CreateOliveVarietyDto): Promise<OliveVariety> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create olive variety");
    return response.json();
  },

  async updateVariety(id: number, data: UpdateOliveVarietyDto): Promise<OliveVariety> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update olive variety");
    return response.json();
  },

  async deleteVariety(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete olive variety");
  },
};
