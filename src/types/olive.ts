
export interface OliveVariety {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  objectUrl: string;
}

export interface CreateOliveVarietyDto {
  name: string;
  description: string;
  imageUrl: string;
  objectUrl: string;
}

export interface UpdateOliveVarietyDto extends Partial<CreateOliveVarietyDto> {}
