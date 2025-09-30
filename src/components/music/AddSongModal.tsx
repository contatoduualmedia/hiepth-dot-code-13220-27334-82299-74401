import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const songSchema = z.object({
  title: z.string().min(1, "Nome da música é obrigatório"),
  artist: z.string().min(1, "Nome do cantor é obrigatório"),
  key: z.string().optional(),
  genre: z.string().optional(),
  lyrics: z.string().optional(),
  chords: z.string().optional(),
});

type SongFormData = z.infer<typeof songSchema>;

interface AddSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AddSongModal = ({ isOpen, onClose, onSuccess }: AddSongModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("manual");
  const { toast } = useToast();

  const form = useForm<SongFormData>({
    resolver: zodResolver(songSchema),
    defaultValues: {
      title: "",
      artist: "",
      key: "",
      genre: "",
      lyrics: "",
      chords: "",
    },
  });

  const handleSubmit = async (data: SongFormData) => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para adicionar músicas",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("songs").insert({
        title: data.title,
        artist: data.artist,
        key: data.key || null,
        genre: data.genre || null,
        lyrics: data.lyrics || null,
        chords: data.chords || null,
        user_id: user.id,
      });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Música adicionada com sucesso!",
      });

      form.reset();
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Error adding song:", error);
      toast({
        title: "Erro",
        description: "Erro ao adicionar música. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Música</DialogTitle>
          <DialogDescription>
            Preencha os campos ou pesquise uma música para adicionar à sua biblioteca
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Manual</TabsTrigger>
            <TabsTrigger value="search">Pesquisar</TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Música *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da música" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="artist"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Cantor *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do cantor" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="key"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tom</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Am, C, G" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gênero (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Rock, Pop, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lyrics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Letra da Música</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Digite a letra da música aqui..." 
                          className="min-h-[150px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="chords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cifras (opcional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Digite as cifras aqui..." 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={isLoading}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Adicionando..." : "Adicionar"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="search" className="space-y-4">
            <div className="text-center py-8 text-muted-foreground">
              <p>Funcionalidade de pesquisa em desenvolvimento</p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};