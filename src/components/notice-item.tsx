"use client";

interface NoticeItemProps {
  title: string;
  description: string;
  date: string; // Podés usar Date y formatearlo dentro
}

export function NoticeItem({ title, description, date }: NoticeItemProps) {
  return (
    <div className="border-b pb-4 last:border-b-0 last:pb-0">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-slate-900">{title}</h3>
        <span className="text-xs text-slate-500">{date}</span>
      </div>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}
