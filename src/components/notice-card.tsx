"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { NoticeItem } from "@/components/notice-item";

interface Notice {
  title: string;
  description: string;
  date: string;
}

interface NoticesCardProps {
  title?: string;
  subtitle?: string;
  notices?: Notice[];
}

export function NoticesCard({
  title = "Avisos y novedades",
  subtitle = "Información importante sobre la beca",
  notices = [
    { title: "Prueba 1", description: "Descripción de prueba 1", date: "2025-09-26" },
    { title: "Prueba 2", description: "Descripción de prueba 2", date: "2025-09-27" },
    { title: "Prueba 3", description: "Descripción de prueba 3", date: "2025-09-28" },
  ],
}: NoticesCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {notices.map((notice, idx) => (
          <NoticeItem
            key={idx}
            title={notice.title}
            description={notice.description}
            date={notice.date}
          />
        ))}
      </CardContent>
    </Card>
  );
}
