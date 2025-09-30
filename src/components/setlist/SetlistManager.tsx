import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, ListMusic, Music, Calendar, Clock, Trash2, GripVertical } from "lucide-react";

// Mock data for demonstration
const mockSetlists = [
  {
    id: 1,
    name: "Show no Bar do João",
    date: "2024-01-15",
    duration: "2h30min",
    songCount: 12,
    status: "scheduled",
  },
  {
    id: 2,
    name: "Apresentação Acústica",
    date: "2024-01-20",
    duration: "1h45min",
    songCount: 8,
    status: "draft",
  },
];

const mockSongs = [
  { id: 1, title: "Wonderwall", artist: "Oasis", key: "G", duration: "4:20" },
  { id: 2, title: "Hotel California", artist: "Eagles", key: "Bm", duration: "6:30" },
  { id: 3, title: "Yesterday", artist: "The Beatles", key: "F", duration: "2:05" },
];

export const SetlistManager = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSetlistName, setNewSetlistName] = useState("");
  const [newSetlistNotes, setNewSetlistNotes] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge variant="default">Agendado</Badge>;
      case "draft":
        return <Badge variant="secondary">Rascunho</Badge>;
      case "completed":
        return <Badge variant="outline">Concluído</Badge>;
      default:
        return <Badge variant="secondary">Rascunho</Badge>;
    }
  };

  const handleCreateSetlist = () => {
    // TODO: Implement setlist creation logic
    console.log("Creating setlist:", { name: newSetlistName, notes: newSetlistNotes });
    setShowCreateForm(false);
    setNewSetlistName("");
    setNewSetlistNotes("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Setlists</h2>
          <p className="text-muted-foreground">Organize suas apresentações e repertórios</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Setlist
        </Button>
      </div>

      {/* Create Setlist Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Criar Nova Setlist</CardTitle>
            <CardDescription>
              Monte uma nova lista de músicas para sua apresentação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="setlist-name">Nome da Setlist</Label>
              <Input
                id="setlist-name"
                placeholder="Ex: Show no Bar do João"
                value={newSetlistName}
                onChange={(e) => setNewSetlistName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="setlist-notes">Observações (opcional)</Label>
              <Textarea
                id="setlist-notes"
                placeholder="Notas sobre o show, repertório específico, etc."
                value={newSetlistNotes}
                onChange={(e) => setNewSetlistNotes(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateSetlist} disabled={!newSetlistName.trim()}>
                Criar Setlist
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Setlists Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockSetlists.map((setlist) => (
          <Card key={setlist.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <ListMusic className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{setlist.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(setlist.date).toLocaleDateString('pt-BR')}
                    </CardDescription>
                  </div>
                </div>
                {getStatusBadge(setlist.status)}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Músicas:</span>
                  <span className="font-medium">{setlist.songCount}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duração:</span>
                  <span className="font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {setlist.duration}
                  </span>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1">
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sample Setlist Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Exemplo: Construtor de Setlist</CardTitle>
          <CardDescription>
            Arraste e solte músicas para organizar sua setlist
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockSongs.map((song, index) => (
              <div
                key={song.id}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border"
              >
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                <span className="text-sm text-muted-foreground w-8">{index + 1}.</span>
                <Music className="h-4 w-4 text-primary" />
                <div className="flex-1">
                  <div className="font-medium">{song.title}</div>
                  <div className="text-sm text-muted-foreground">{song.artist}</div>
                </div>
                <Badge variant="outline">Tom: {song.key}</Badge>
                <span className="text-sm text-muted-foreground">{song.duration}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Música à Setlist
          </Button>
        </CardContent>
      </Card>

      {mockSetlists.length === 0 && !showCreateForm && (
        <div className="text-center py-12">
          <ListMusic className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Nenhuma setlist criada
          </h3>
          <p className="text-muted-foreground mb-4">
            Crie sua primeira setlist para organizar suas apresentações
          </p>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Criar Primeira Setlist
          </Button>
        </div>
      )}
    </div>
  );
};