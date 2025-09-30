import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface EditSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  song: any;
}

export const EditSongModal = ({ isOpen, onClose, onSuccess, song }: EditSongModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "",
    key: "",
    lyrics: "",
    chords: "",
  });

  useEffect(() => {
    if (song) {
      setFormData({
        title: song.title || "",
        artist: song.artist || "",
        genre: song.genre || "",
        key: song.key || "",
        lyrics: song.lyrics || "",
        chords: song.chords || "",
      });
    }
  }, [song]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("songs")
        .update(formData)
        .eq("id", song.id);

      if (error) throw error;

      toast({
        title: "Música atualizada!",
        description: "As alterações foram salvas com sucesso.",
      });

      onSuccess();
      onClose();
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar música",
        description: error.message,
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
          <DialogTitle>Editar Música</DialogTitle>
          <DialogDescription>
            Atualize as informações da música
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="artist">Artista *</Label>
              <Input
                id="artist"
                value={formData.artist}
                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="genre">Gênero</Label>
              <Select value={formData.genre} onValueChange={(value) => setFormData({ ...formData, genre: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o gênero" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rock">Rock</SelectItem>
                  <SelectItem value="Pop">Pop</SelectItem>
                  <SelectItem value="MPB">MPB</SelectItem>
                  <SelectItem value="Sertanejo">Sertanejo</SelectItem>
                  <SelectItem value="Folk">Folk</SelectItem>
                  <SelectItem value="Blues">Blues</SelectItem>
                  <SelectItem value="Jazz">Jazz</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="key">Tom</Label>
              <Input
                id="key"
                placeholder="Ex: C, Am, G#"
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="chords">Cifras</Label>
            <Textarea
              id="chords"
              placeholder="Cole ou digite a cifra da música..."
              value={formData.chords}
              onChange={(e) => setFormData({ ...formData, chords: e.target.value })}
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lyrics">Letra</Label>
            <Textarea
              id="lyrics"
              placeholder="Cole ou digite a letra da música..."
              value={formData.lyrics}
              onChange={(e) => setFormData({ ...formData, lyrics: e.target.value })}
              rows={6}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};