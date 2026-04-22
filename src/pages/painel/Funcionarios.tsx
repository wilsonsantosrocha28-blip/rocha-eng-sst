import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Search } from "lucide-react";

interface Employee {
  id: string;
  full_name: string;
  cpf: string;
  position: string;
  cbo: string;
  department: string | null;
  admission_date: string;
  status: string;
  phone: string | null;
  email: string | null;
}

const employeeSchema = z.object({
  full_name: z.string().trim().min(2, "Nome obrigatório").max(150),
  cpf: z.string().trim().min(11, "CPF inválido").max(14),
  position: z.string().trim().min(2, "Cargo obrigatório").max(100),
  cbo: z.string().trim().min(4, "CBO obrigatório (ex: 7821-25)").max(20),
  admission_date: z.string().min(1, "Data de admissão obrigatória"),
});

const emptyForm = {
  full_name: "", cpf: "", rg: "", birth_date: "", gender: "", marital_status: "",
  nationality: "Brasileira", mother_name: "", father_name: "",
  address_street: "", address_number: "", address_complement: "", address_neighborhood: "",
  address_city: "", address_state: "", address_zip: "",
  phone: "", email: "",
  ctps_number: "", ctps_series: "", pis_pasep: "", voter_id: "", reservist: "",
  position: "", cbo: "", department: "", admission_date: "", salary: "",
  contract_type: "CLT", work_schedule: "",
  bank_name: "", bank_agency: "", bank_account: "", pix_key: "",
  dependents_count: "0", notes: "", status: "ativo",
};

const Funcionarios = () => {
  const { user, roles } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const canManage = roles.some((r) => ["admin", "sst", "rh"].includes(r));
  const canDelete = roles.includes("admin");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("employees")
      .select("id, full_name, cpf, position, cbo, department, admission_date, status, phone, email")
      .order("full_name");
    if (error) toast({ title: "Erro ao carregar", description: error.message, variant: "destructive" });
    else setEmployees(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = async (id: string) => {
    const { data, error } = await supabase.from("employees").select("*").eq("id", id).single();
    if (error || !data) { toast({ title: "Erro", description: error?.message, variant: "destructive" }); return; }
    setEditingId(id);
    setForm({
      ...emptyForm,
      ...Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v == null ? "" : String(v)])),
    } as typeof emptyForm);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este funcionário?")) return;
    const { error } = await supabase.from("employees").delete().eq("id", id);
    if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
    else { toast({ title: "Excluído" }); load(); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = employeeSchema.safeParse({
      full_name: form.full_name,
      cpf: form.cpf,
      position: form.position,
      cbo: form.cbo,
      admission_date: form.admission_date,
    });
    if (!parsed.success) {
      toast({ title: "Dados inválidos", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload: any = {
      ...form,
      salary: form.salary ? Number(form.salary) : null,
      dependents_count: form.dependents_count ? Number(form.dependents_count) : 0,
      birth_date: form.birth_date || null,
      created_by: user!.id,
    };
    // limpa strings vazias
    Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });
    payload.full_name = form.full_name;
    payload.cpf = form.cpf;
    payload.position = form.position;
    payload.cbo = form.cbo;
    payload.admission_date = form.admission_date;
    payload.status = form.status || "ativo";
    payload.contract_type = form.contract_type || "CLT";

    let error;
    if (editingId) {
      delete payload.created_by;
      ({ error } = await supabase.from("employees").update(payload).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("employees").insert(payload));
    }
    setSaving(false);
    if (error) { toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" }); return; }
    toast({ title: editingId ? "Funcionário atualizado" : "Funcionário cadastrado" });
    setOpen(false);
    load();
  };

  const filtered = employees.filter((e) =>
    e.full_name.toLowerCase().includes(search.toLowerCase()) ||
    e.cpf.includes(search) ||
    e.position.toLowerCase().includes(search.toLowerCase())
  );

  const setF = (k: keyof typeof emptyForm, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-brand-dark">Gestão de Funcionários</h1>
          <p className="text-muted-foreground text-sm">Cadastro completo de funcionários CLT</p>
        </div>
        {canManage && (
          <Button onClick={openNew} className="bg-brand-gold hover:bg-yellow-500 text-brand-dark font-semibold">
            <Plus className="h-4 w-4 mr-2" /> Novo Funcionário
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome, CPF ou cargo..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-md" />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin" /></div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              {employees.length === 0 ? "Nenhum funcionário cadastrado ainda." : "Nenhum resultado."}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>CBO</TableHead>
                    <TableHead>Admissão</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((emp) => (
                    <TableRow key={emp.id}>
                      <TableCell className="font-medium">{emp.full_name}</TableCell>
                      <TableCell>{emp.cpf}</TableCell>
                      <TableCell>{emp.position}</TableCell>
                      <TableCell>{emp.cbo}</TableCell>
                      <TableCell>{new Date(emp.admission_date).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-1 rounded ${emp.status === "ativo" ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"}`}>
                          {emp.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {canManage && (
                          <Button variant="ghost" size="icon" onClick={() => openEdit(emp.id)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                        {canDelete && (
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(emp.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Editar Funcionário" : "Novo Funcionário"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Section title="Dados Pessoais">
              <Field label="Nome completo *" value={form.full_name} onChange={(v) => setF("full_name", v)} />
              <Field label="CPF *" value={form.cpf} onChange={(v) => setF("cpf", v)} placeholder="000.000.000-00" />
              <Field label="RG" value={form.rg} onChange={(v) => setF("rg", v)} />
              <Field label="Data de nascimento" type="date" value={form.birth_date} onChange={(v) => setF("birth_date", v)} />
              <SelectField label="Gênero" value={form.gender} onChange={(v) => setF("gender", v)} options={["Masculino", "Feminino", "Outro"]} />
              <SelectField label="Estado civil" value={form.marital_status} onChange={(v) => setF("marital_status", v)} options={["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)", "União Estável"]} />
              <Field label="Nacionalidade" value={form.nationality} onChange={(v) => setF("nationality", v)} />
              <Field label="Nome da mãe" value={form.mother_name} onChange={(v) => setF("mother_name", v)} />
              <Field label="Nome do pai" value={form.father_name} onChange={(v) => setF("father_name", v)} />
            </Section>

            <Section title="Endereço">
              <Field label="Logradouro" value={form.address_street} onChange={(v) => setF("address_street", v)} className="md:col-span-2" />
              <Field label="Número" value={form.address_number} onChange={(v) => setF("address_number", v)} />
              <Field label="Complemento" value={form.address_complement} onChange={(v) => setF("address_complement", v)} />
              <Field label="Bairro" value={form.address_neighborhood} onChange={(v) => setF("address_neighborhood", v)} />
              <Field label="Cidade" value={form.address_city} onChange={(v) => setF("address_city", v)} />
              <Field label="UF" value={form.address_state} onChange={(v) => setF("address_state", v)} />
              <Field label="CEP" value={form.address_zip} onChange={(v) => setF("address_zip", v)} />
            </Section>

            <Section title="Contato">
              <Field label="Telefone" value={form.phone} onChange={(v) => setF("phone", v)} />
              <Field label="E-mail" type="email" value={form.email} onChange={(v) => setF("email", v)} />
            </Section>

            <Section title="Documentos CLT">
              <Field label="CTPS - Número" value={form.ctps_number} onChange={(v) => setF("ctps_number", v)} />
              <Field label="CTPS - Série" value={form.ctps_series} onChange={(v) => setF("ctps_series", v)} />
              <Field label="PIS/PASEP" value={form.pis_pasep} onChange={(v) => setF("pis_pasep", v)} />
              <Field label="Título de eleitor" value={form.voter_id} onChange={(v) => setF("voter_id", v)} />
              <Field label="Certificado de reservista" value={form.reservist} onChange={(v) => setF("reservist", v)} />
            </Section>

            <Section title="Vínculo Empregatício">
              <Field label="Cargo *" value={form.position} onChange={(v) => setF("position", v)} />
              <Field label="CBO *" value={form.cbo} onChange={(v) => setF("cbo", v)} placeholder="Ex: 7821-25" />
              <Field label="Departamento" value={form.department} onChange={(v) => setF("department", v)} />
              <Field label="Data de admissão *" type="date" value={form.admission_date} onChange={(v) => setF("admission_date", v)} />
              <Field label="Salário (R$)" type="number" value={form.salary} onChange={(v) => setF("salary", v)} />
              <SelectField label="Tipo de contrato" value={form.contract_type} onChange={(v) => setF("contract_type", v)} options={["CLT", "Estágio", "Aprendiz", "Temporário", "PJ"]} />
              <Field label="Jornada de trabalho" value={form.work_schedule} onChange={(v) => setF("work_schedule", v)} placeholder="Ex: 44h semanais" className="md:col-span-2" />
              <SelectField label="Status" value={form.status} onChange={(v) => setF("status", v)} options={["ativo", "afastado", "ferias", "desligado"]} />
            </Section>

            <Section title="Dados Bancários">
              <Field label="Banco" value={form.bank_name} onChange={(v) => setF("bank_name", v)} />
              <Field label="Agência" value={form.bank_agency} onChange={(v) => setF("bank_agency", v)} />
              <Field label="Conta" value={form.bank_account} onChange={(v) => setF("bank_account", v)} />
              <Field label="Chave PIX" value={form.pix_key} onChange={(v) => setF("pix_key", v)} />
            </Section>

            <Section title="Outros">
              <Field label="Nº de dependentes" type="number" value={form.dependents_count} onChange={(v) => setF("dependents_count", v)} />
              <div className="md:col-span-3 space-y-2">
                <Label>Observações</Label>
                <Textarea value={form.notes} onChange={(e) => setF("notes", e.target.value)} rows={3} />
              </div>
            </Section>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button type="submit" disabled={saving} className="bg-brand-gold hover:bg-yellow-500 text-brand-dark font-semibold">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="text-sm font-semibold text-brand-dark mb-3 pb-1 border-b">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">{children}</div>
  </div>
);

const Field = ({ label, value, onChange, type = "text", placeholder, className }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; className?: string }) => (
  <div className={`space-y-1 ${className || ""}`}>
    <Label className="text-xs">{label}</Label>
    <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
  </div>
);

const SelectField = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
  <div className="space-y-1">
    <Label className="text-xs">{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
      <SelectContent>
        {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
      </SelectContent>
    </Select>
  </div>
);

export default Funcionarios;
