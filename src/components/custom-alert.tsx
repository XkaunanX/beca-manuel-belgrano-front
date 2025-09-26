"use client";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import type { LucideIcon } from "lucide-react";

interface CustomAlertProps {
  variant?: "blue" | "green" | "red" | "yellow";
  title: string;
  description: string;
  icon?: LucideIcon;
}

const COLORS = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    title: "text-blue-800",
    desc: "text-blue-700",
    icon: "text-blue-600",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    title: "text-green-800",
    desc: "text-green-700",
    icon: "text-green-600",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    title: "text-red-800",
    desc: "text-red-700",
    icon: "text-red-600",
  },
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    title: "text-yellow-800",
    desc: "text-yellow-700",
    icon: "text-yellow-600",
  },
};

export function CustomAlert({
  variant = "blue",
  title,
  description,
  icon: Icon,
}: CustomAlertProps) {
  const colors = COLORS[variant];

  return (
    <Alert className={`${colors.bg} ${colors.border}`}>
      {Icon && <Icon className={`h-5 w-5 ${colors.icon}`} />}
      <AlertTitle className={colors.title}>{title}</AlertTitle>
      <AlertDescription className={colors.desc}>{description}</AlertDescription>
    </Alert>
  );
}
