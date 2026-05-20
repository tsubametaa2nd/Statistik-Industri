import { ReactNode } from "react";

interface SectionCardProps {
  children: ReactNode;
  className?: string;
}

export default function SectionCard({
  children,
  className = "",
}: SectionCardProps) {
  return (
    <div className={`glass-card rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
}

