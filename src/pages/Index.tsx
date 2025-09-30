import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { AuthForm } from "@/components/auth/AuthForm";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { MusicLibrary } from "@/components/music/MusicLibrary";
import { SetlistManager } from "@/components/setlist/SetlistManager";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

const Index = () => {
  const [currentView, setCurrentView] = useState<"login" | "dashboard" | "library" | "shows" | "stage" | "reports">("dashboard");
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSuccess = () => {
    setCurrentView("dashboard");
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view as any);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentView("dashboard");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <AuthForm onSuccess={handleAuthSuccess} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <Header onLogout={handleLogout} />
      
      {currentView === "dashboard" && <Dashboard />}
      
      {currentView === "library" && (
        <main className="container mx-auto max-w-6xl px-4 py-6">
          <MusicLibrary />
        </main>
      )}
      
      {currentView === "shows" && (
        <main className="container mx-auto max-w-6xl px-4 py-6">
          <SetlistManager />
        </main>
      )}
      
      {currentView === "stage" && (
        <main className="container mx-auto max-w-6xl px-4 py-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Modo Palco</h2>
            <p className="text-muted-foreground">Em desenvolvimento...</p>
          </div>
        </main>
      )}
      
      {currentView === "reports" && (
        <main className="container mx-auto max-w-6xl px-4 py-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Relatórios</h2>
            <p className="text-muted-foreground">Em desenvolvimento...</p>
          </div>
        </main>
      )}

      <BottomNav activeView={currentView} onNavigate={handleNavigate} />
    </div>
  );
};

export default Index;
