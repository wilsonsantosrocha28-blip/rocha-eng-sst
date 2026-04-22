import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const emailSchema = z.string().trim().email({ message: "E-mail inválido" }).max(255);
const passwordSchema = z.string().min(6, { message: "Senha deve ter ao menos 6 caracteres" }).max(72);
const nameSchema = z.string().trim().min(2, { message: "Informe seu nome" }).max(100);

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  useEffect(() => {
    if (!loading && user) navigate("/painel", { replace: true });
  }, [user, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailParse = emailSchema.safeParse(loginEmail);
    const passParse = passwordSchema.safeParse(loginPassword);
    if (!emailParse.success || !passParse.success) {
      toast({ title: "Dados inválidos", description: emailParse.error?.issues[0]?.message || passParse.error?.issues[0]?.message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: emailParse.data,
      password: passParse.data,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Erro ao entrar", description: error.message === "Invalid login credentials" ? "E-mail ou senha incorretos" : error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Bem-vindo!" });
    navigate("/painel", { replace: true });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameParse = nameSchema.safeParse(signupName);
    const emailParse = emailSchema.safeParse(signupEmail);
    const passParse = passwordSchema.safeParse(signupPassword);
    if (!nameParse.success || !emailParse.success || !passParse.success) {
      toast({ title: "Dados inválidos", description: nameParse.error?.issues[0]?.message || emailParse.error?.issues[0]?.message || passParse.error?.issues[0]?.message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email: emailParse.data,
      password: passParse.data,
      options: {
        emailRedirectTo: `${window.location.origin}/painel`,
        data: { full_name: nameParse.data },
      },
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Erro ao cadastrar", description: error.message.includes("already registered") ? "Este e-mail já está cadastrado" : error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Conta criada!", description: "Você já pode entrar." });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Voltar ao site</Link>
        </div>
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <img src="/lovable-uploads/a4855879-46c8-489a-ac29-64bc54b8610d.png" alt="Rocha Engenharia" className="w-14 h-14 object-contain" />
            </div>
            <CardTitle>Área Restrita</CardTitle>
            <CardDescription>Acesse sua conta ou cadastre-se</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="signup">Cadastrar</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">E-mail</Label>
                    <Input id="login-email" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Senha</Label>
                    <Input id="login-password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full bg-brand-gold hover:bg-yellow-500 text-brand-dark font-semibold" disabled={submitting}>
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Nome completo</Label>
                    <Input id="signup-name" value={signupName} onChange={(e) => setSignupName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">E-mail</Label>
                    <Input id="signup-email" type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Senha</Label>
                    <Input id="signup-password" type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required minLength={6} />
                  </div>
                  <Button type="submit" className="w-full bg-brand-gold hover:bg-yellow-500 text-brand-dark font-semibold" disabled={submitting}>
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Criar conta"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
