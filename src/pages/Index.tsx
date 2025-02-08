
import { useQuery } from "@tanstack/react-query";
import { oliveApi } from "../services/oliveApi";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Loader2 } from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  const { toast } = useToast();
  const { data: varieties, isLoading, error } = useQuery({
    queryKey: ["oliveVarieties"],
    queryFn: oliveApi.getAllVarieties,
  });

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load olive varieties. Please ensure the API server is running.",
      });
    }
  }, [error, toast]);

  return (
    <div className="min-h-screen bg-cream p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-sage text-sm font-medium px-3 py-1 bg-beige rounded-full">
              Catalog
            </span>
            <h1 className="text-4xl font-serif text-brown mt-2">Olive Varieties</h1>
          </div>
          <Button className="bg-sage hover:bg-olive-gray text-cream">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Variety
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
                    src={variety.imageUrl}
                    alt={variety.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h2 className="text-xl font-serif text-brown mb-2">{variety.name}</h2>
                <p className="text-olive-gray line-clamp-3">{variety.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <Button variant="outline" className="text-sage hover:text-olive-gray">
                    View Details
                  </Button>
                  <Button variant="ghost" className="text-sage hover:text-olive-gray">
                    Edit
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
