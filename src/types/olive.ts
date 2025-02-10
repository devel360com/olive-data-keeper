
export interface OliveVariety {
  id: number;
  nombre: string;
  descripcion: string;
  urlImagen: string;
  objectUrl?: string;
}

export interface CreateOliveVarietyDto {
  nombre: string;
  descripcion: string;
  urlImagen: string;
  objectUrl?: string;
}

export interface UpdateOliveVarietyDto extends Partial<CreateOliveVarietyDto> {}
