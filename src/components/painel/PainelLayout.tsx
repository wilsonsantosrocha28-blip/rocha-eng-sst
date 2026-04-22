import { ReactNode } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Users, ShieldAlert, FileText, MessageSquare, LogOut, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/painel/funcionarios", label: "Funcionários", icon: Users },
  { to: "/painel/epis", label: "EPIs", icon: ShieldAlert, soon: true },
  { to: "/painel/documentos", label: "Documentos SST", icon: FileText, soon: true },
  { to: "/painel/chamados", label: "Chamados", icon: MessageSquare, soon: true },
];

const PainelLayout = ({ children }: { children: ReactNode }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-muted/30">
      <aside className="w-full md:w-64 bg-background border-r border-border md:min-h-screen flex flex-col">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <img src="/lovable-uploads/a4855879-46c8-489a-ac29-64bc54b8610d.png" alt="Logo" className="w-10 h-10 object-contain" />
          <div>
            <h2 className="font-bold text-sm text-brand-dark">ROCHA ENGENHARIA</h2>
            <p className="text-xs text-muted-foreground truncate max-w-[150px]">{user?.email}</p>
          </div>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-brand-gold text-brand-dark font-semibold"
                    : "text-foreground hover:bg-muted"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1">{item.label}</span>
              {item.soon && <span className="text-[10px] bg-muted-foreground/20 px-1.5 py-0.5 rounded">em breve</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-2 border-t border-border space-y-1">
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/")}>
            <Home className="h-4 w-4 mr-2" /> Voltar ao site
          </Button>
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Sair
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
    </div>
  );
};

export default PainelLayout;
