"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ActionCardProps {
  title: string;
  description: string;
  content: React.ReactNode;
  buttonText: string;
  buttonLink: string;
  icon?: LucideIcon;
}

export function ActionCard({
  title,
  description,
  content,
  buttonText,
  buttonLink,
  icon: Icon,
}: ActionCardProps) {
  return (
    <Card className="border border-slate-200 shadow-md rounded-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-900">{title}</CardTitle>
        <CardDescription className="text-slate-500">{description}</CardDescription>
      </CardHeader>

      <CardContent className="text-sm text-slate-600">{content}</CardContent>

      <CardFooter>
        <Button
          asChild
          className="w-full bg-blue-600 hover:bg-blue-600 text-white font-medium shadow rounded-lg"
        >
          <Link href={buttonLink} className="flex items-center justify-center">
            {Icon && <Icon className="mr-2 h-5 w-5" />}
            {buttonText}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
