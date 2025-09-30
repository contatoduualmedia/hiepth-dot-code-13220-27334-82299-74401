import { LayoutDashboard, Music, Calendar, Mic, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export const BottomNav = ({ activeView, onNavigate }: BottomNavProps) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "library", label: "Biblioteca", icon: Music },
    { id: "shows", label: "Shows", icon: Calendar },
    { id: "stage", label: "Palco", icon: Mic },
    { id: "reports", label: "Relatórios", icon: BarChart3 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
