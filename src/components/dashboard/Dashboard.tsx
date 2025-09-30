import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Calendar, TrendingUp, MessageSquare, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    { label: "Músicas", value: "0", icon: Music },
    { label: "Shows", value: "0", icon: Calendar },
    { label: "Este Mês", value: "0", icon: TrendingUp },
    { label: "Pedidos", value: "0", icon: MessageSquare },
  ]);
  const [recentSongs, setRecentSongs] = useState<any[]>([]);
  const [upcomingShows, setUpcomingShows] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch songs count
      const { count: songsCount } = await supabase
        .from("songs")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      // Fetch shows count
      const { count: showsCount } = await supabase
        .from("shows")
        .select("*", { count: "exact", head: true })
        .eq("artist_id", user.id);

      // Fetch recent songs
      const { data: recentSongsData } = await supabase
        .from("songs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      // Fetch upcoming shows
      const { data: upcomingShowsData } = await supabase
        .from("shows")
        .select("*")
        .eq("artist_id", user.id)
        .gte("date_time", new Date().toISOString())
        .order("date_time", { ascending: true })
        .limit(3);

      // Fetch song requests count for this month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { count: requestsCount } = await supabase
        .from("song_requests")
        .select("*", { count: "exact", head: true })
        .gte("created_at", startOfMonth.toISOString());

      setStats([
        { label: "Músicas", value: String(songsCount || 0), icon: Music },
        { label: "Shows", value: String(showsCount || 0), icon: Calendar },
        { label: "Este Mês", value: String(showsCount || 0), icon: TrendingUp },
        { label: "Pedidos", value: String(requestsCount || 0), icon: MessageSquare },
      ]);

      setRecentSongs(recentSongsData || []);
      setUpcomingShows(upcomingShowsData || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-accent py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            Bem-vindo ao Tocafy
          </h1>
          <p className="text-primary-foreground/80 mb-6">
            Gerencie sua música, organize seus shows
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="gap-2"
            onClick={() => navigate("/music")}
          >
            <Plus className="h-5 w-5" />
            Adicionar Música
          </Button>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Músicas Recentes */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Music className="h-5 w-5 text-primary" />
                Músicas Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentSongs.length > 0 ? (
                <div className="space-y-3">
                  {recentSongs.map((song) => (
                    <div key={song.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{song.title}</p>
                        <p className="text-xs text-muted-foreground">{song.artist}</p>
                      </div>
                      {song.key && (
                        <span className="text-xs text-muted-foreground">Tom: {song.key}</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Music className="h-12 w-12 text-muted-foreground/50 mb-3" />
                  <p className="text-muted-foreground">Nenhuma música na biblioteca</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Próximos Shows */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-primary" />
                Próximos Shows
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingShows.length > 0 ? (
                <div className="space-y-3">
                  {upcomingShows.map((show) => (
                    <div key={show.id} className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <p className="font-medium text-sm">{show.title || show.name}</p>
                      {show.venue && (
                        <p className="text-xs text-muted-foreground">{show.venue}</p>
                      )}
                      {show.date_time && (
                        <p className="text-xs text-muted-foreground">
                          {new Date(show.date_time).toLocaleDateString("pt-BR")}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground/50 mb-3" />
                  <p className="text-muted-foreground mb-4">Nenhum show agendado</p>
                  <Button variant="outline" size="sm">
                    Agendar Show
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
