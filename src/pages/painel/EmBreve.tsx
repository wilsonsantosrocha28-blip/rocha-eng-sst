import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";

const EmBreve = ({ titulo }: { titulo: string }) => (
  <div>
    <h1 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">{titulo}</h1>
    <Card>
      <CardContent className="py-16 flex flex-col items-center text-center text-muted-foreground">
        <Construction className="h-12 w-12 mb-4 text-brand-gold" />
        <p className="text-lg font-medium">Em breve</p>
        <p className="text-sm mt-1">Esta seção será liberada na próxima etapa.</p>
      </CardContent>
    </Card>
  </div>
);

export default EmBreve;
