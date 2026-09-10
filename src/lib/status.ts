import type { OrderStatus, TicketStatus, TicketPriority } from "@/generated/prisma/enums";

type BadgeStyle = { label: string; className: string };

export const orderStatusMap: Record<OrderStatus, BadgeStyle> = {
  ANGENOMMEN: { label: "Angenommen", className: "bg-accent/10 text-accent border-accent/30" },
  IN_BEARBEITUNG: {
    label: "In Bearbeitung",
    className: "bg-accent/20 text-accent border-accent/40",
  },
  WARTET_AUF_KUNDE: {
    label: "Wartet auf Kundenfeedback",
    className: "bg-warning/10 text-warning border-warning/30",
  },
  ABGESCHLOSSEN: {
    label: "Abgeschlossen",
    className: "bg-success/10 text-success border-success/30",
  },
  STORNIERT: { label: "Storniert", className: "bg-danger/10 text-danger border-danger/30" },
};

export const ticketStatusMap: Record<TicketStatus, BadgeStyle> = {
  OFFEN: { label: "Offen", className: "bg-accent/10 text-accent border-accent/30" },
  IN_BEARBEITUNG: {
    label: "In Bearbeitung",
    className: "bg-accent/20 text-accent border-accent/40",
  },
  WARTET_AUF_KUNDE: {
    label: "Wartet auf Kundenfeedback",
    className: "bg-warning/10 text-warning border-warning/30",
  },
  GESCHLOSSEN: { label: "Geschlossen", className: "bg-muted/10 text-muted border-border" },
};

export const ticketPriorityMap: Record<TicketPriority, BadgeStyle> = {
  NIEDRIG: { label: "Niedrig", className: "bg-muted/10 text-muted border-border" },
  NORMAL: { label: "Normal", className: "bg-accent/10 text-accent border-accent/30" },
  HOCH: { label: "Hoch", className: "bg-warning/10 text-warning border-warning/30" },
  DRINGEND: { label: "Dringend", className: "bg-danger/10 text-danger border-danger/30" },
};
