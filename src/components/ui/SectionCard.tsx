import { ReactNode } from "react";

interface SectionCardProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function SectionCard({
  children,
  className = "",
  id,
}: SectionCardProps) {
  return (
    <div id={id} className={`glass-card rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
}

