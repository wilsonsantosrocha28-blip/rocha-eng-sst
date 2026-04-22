import { Routes, Route, Navigate } from "react-router-dom";
import PainelLayout from "@/components/painel/PainelLayout";
import Funcionarios from "./Funcionarios";
import EmBreve from "./EmBreve";

const Painel = () => {
  return (
    <PainelLayout>
      <Routes>
        <Route index element={<Navigate to="funcionarios" replace />} />
        <Route path="funcionarios" element={<Funcionarios />} />
        <Route path="epis" element={<EmBreve titulo="Gestão de EPIs" />} />
        <Route path="documentos" element={<EmBreve titulo="Documentos SST" />} />
        <Route path="chamados" element={<EmBreve titulo="Gestão de Chamados" />} />
      </Routes>
    </PainelLayout>
  );
};

export default Painel;
