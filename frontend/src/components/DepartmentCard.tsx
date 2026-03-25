import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import type { Department } from "@/types/api";

/**
 * Displays a department as a clickable card.
 * Links directly to subjects — semester is now a filter on the notes page.
 */
const DepartmentCard = ({
  department,
  course,
}: {
  department: Department;
  course: string;
}) => {
  return (
    <Link
      to={`/course/${course}/department/${department.key}/notes`}
      className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
        <Building2 className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-foreground">{department.key}</h3>
      <p className="text-sm text-muted-foreground opacity-60 text-center">
        {department.name}
      </p>
    </Link>
  );
};

export default DepartmentCard;
