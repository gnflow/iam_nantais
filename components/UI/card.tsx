import { ReactNode } from "react";

interface CardProps {
  className?: string;
  children: ReactNode;
}

export function Card({ className = "", children }: CardProps) {
  return <div className={`bg-white p-4 rounded-2xl shadow-lg ${className}`}>{children}</div>;
}


interface CardContentProps {
    className?: string;
    children: ReactNode;
  }
  
  export function CardContent({ className = "", children }: CardContentProps) {
    return <div className={`mt-4 text-center ${className}`}>{children}</div>;
  }
  