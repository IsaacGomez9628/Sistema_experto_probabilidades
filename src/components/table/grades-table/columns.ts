import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import type { Grades } from "@/components/table/grades-table/grades.ts";
import EditButton from "@/components/buttons/EditButton.vue";
import DeleteButton from "@/components/buttons/DeleteButton.vue";

export const columns: ColumnDef<Grades>[] = [
  {
    accessorKey: "asignature_name",
    header: "Asignatura",
    cell: ({ row }: { row: any }) =>
      h("div", {}, row.getValue("asignature_name")),
  },
  {
    accessorKey: "first_partial",
    header: "Primer Parcial",
    cell: ({ row }: { row: any }) =>
      h("div", {}, row.getValue("first_partial")),
  },
  {
    accessorKey: "second_partial",
    header: "Segundo Parcial",
    cell: ({ row }: { row: any }) =>
      h("div", {}, row.getValue("second_partial")),
  },
  {
    accessorKey: "third_partial",
    header: "Tercer Parcial",
    cell: ({ row }: { row: any }) =>
      h("div", {}, row.getValue("third_partial")),
  },
  {
    accessorKey: "final_flag",
    header: "Examen final",
    cell: ({ row }: { row: any }) =>
      row.getValue("final_flag") ? "Autorizado" : "No autorizado",
  },
  {
    accessorKey: "probability",
    header: "Probabilidad de exito",
    cell: ({ row }: { row: any }) => {
      const probability = row.getValue("probability") as number;
      console.log("Probability value:", probability, typeof probability);
      return h("div", {}, `${(probability * 100).toFixed(2)}%`);
    },
  },
  {
    accessorKey: "average",
    header: () => h("div", { class: "text-right" }, "Promedio"),
    cell: ({ row }: { row: any }) => {
      const average = Number.parseFloat(row.getValue("average"));
      const formatted = average.toFixed(2);
      return h("div", { class: "text-right font-medium" }, formatted);
    },
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }: { row: any }) => {
      const id = row.original.id as string;
      return h("div", { class: "flex space-x-2" }, [
        h(EditButton, {
          initialGrades: {
            id: id as string,
            first_partial: row.getValue("first_partial") as number,
            second_partial: row.getValue("second_partial") as number,
            third_partial: row.getValue("third_partial") as number,
          },
        }),
        h(DeleteButton, {
          id: id as string,
        }),
      ]);
    },
  },
];
