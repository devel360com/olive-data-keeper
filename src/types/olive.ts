
export interface OliveVariety {
  id: number;
  nombre: string;
  descripcion: string;
  url: string;
}

export interface CreateOliveVarietyDto {
  nombre: string;
  descripcion: string;
  url: string;
}

export interface UpdateOliveVarietyDto extends Partial<CreateOliveVarietyDto> {}
