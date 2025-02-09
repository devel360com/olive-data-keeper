
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { oliveApi } from "../services/oliveApi";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { OliveVariety, UpdateOliveVarietyDto } from "../types/olive";

const Index = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingVariety, setEditingVariety] = useState<OliveVariety | null>(null);

  const { data: varieties, isLoading, error } = useQuery({
    queryKey: ["oliveVarieties"],
    queryFn: oliveApi.getAllVarieties,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateOliveVarietyDto }) =>
      oliveApi.updateVariety(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["oliveVarieties"] });
      toast({
        title: "Éxito",
        description: "Variedad de oliva actualizada correctamente",
      });
      setEditingVariety(null);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error al actualizar la variedad de oliva",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingVariety) return;

    const formData = new FormData(e.currentTarget);
    const updatedData: UpdateOliveVarietyDto = {
      nombre: formData.get("nombre") as string,
      descripcion: formData.get("descripcion") as string,
      url: formData.get("url") as string,
    };

    updateMutation.mutate({
      id: editingVariety.id,
      data: updatedData,
    });
  };

  return (
    <div className="min-h-screen bg-cream p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-sage text-sm font-medium px-3 py-1 bg-beige rounded-full">
              Catálogo
            </span>
            <h1 className="text-4xl font-serif text-brown mt-2">Variedades de Olivo</h1>
          </div>
          <Button className="bg-sage hover:bg-olive-gray text-cream">
            <PlusCircle className="mr-2 h-4 w-4" />
            Añadir Nueva Variedad
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-sage" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {varieties?.map((variety) => (
              <Card
                key={variety.id}
                className="p-6 bg-white border-sage/20 hover:border-sage/40 transition-all duration-300 animate-fadeIn"
              >
                <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-beige">
                  <img
                    src={variety.url}
                    alt={variety.nombre}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h2 className="text-xl font-serif text-brown mb-2">{variety.nombre}</h2>
                <p className="text-olive-gray line-clamp-3">{variety.descripcion}</p>
                <div className="flex justify-between items-center mt-4">
                  <Button variant="outline" className="text-sage hover:text-olive-gray">
                    Ver Detalles
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="text-sage hover:text-olive-gray"
                    onClick={() => setEditingVariety(variety)}
                  >
                    Editar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={!!editingVariety} onOpenChange={() => setEditingVariety(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Variedad de Oliva</DialogTitle>
              <DialogDescription>
                Modifica los detalles de la variedad de oliva aquí.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  defaultValue={editingVariety?.nombre}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  name="descripcion"
                  defaultValue={editingVariety?.descripcion}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL de la imagen</Label>
                <Input
                  id="url"
                  name="url"
                  defaultValue={editingVariety?.url}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingVariety(null)}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit"
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Guardar Cambios"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;
