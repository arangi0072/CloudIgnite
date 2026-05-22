import { Check, X } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

const comparisonData = [
  {
    feature: "Setup Time",
    cloudIgnite: "Minutes",
    traditional: "Days to Weeks",
  },
  {
    feature: "Complexity",
    cloudIgnite: "Minimalist",
    traditional: "Overwhelming",
  },
  {
    feature: "Pricing Clarity",
    cloudIgnite: "Predictable",
    traditional: "Complex & Opaque",
  },
  {
    feature: "Developer Experience",
    cloudIgnite: "Engineered for flow",
    traditional: "Fragmented",
  },
];

export default function Comparison() {
  return (
    <section className="w-full py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            CloudIgnite vs Traditional Cloud
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We focus on the essentials, so you can focus on your product.
          </p>
        </div>

        <Card className="mt-12 overflow-hidden border-2 border-primary/20 bg-transparent shadow-[0_0_50px_-10px_hsl(var(--primary)/0.2)]">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-1/3 text-base">Feature</TableHead>
                <TableHead className="w-1/3 bg-primary/10 text-center text-base text-primary">
                  CloudIgnite
                </TableHead>
                <TableHead className="w-1/3 text-center text-base text-muted-foreground">
                  Traditional Cloud
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((item) => (
                <TableRow key={item.feature} className="text-lg hover:bg-transparent">
                  <TableCell className="font-medium">{item.feature}</TableCell>
                  <TableCell className="bg-primary/10 text-center font-semibold text-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <Check className="h-5 w-5 text-green-400" />
                      <span>{item.cloudIgnite}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                       <X className="h-5 w-5 text-red-400" />
                       <span>{item.traditional}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </section>
  );
}
