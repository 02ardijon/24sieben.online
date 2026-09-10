type Event = {
  id: string;
  message: string;
  createdAt: Date;
  actor: { name: string | null } | null;
};

export function OrderTimeline({ events }: { events: Event[] }) {
  if (events.length === 0) {
    return <p className="text-sm text-muted">Noch keine Einträge im Verlauf.</p>;
  }

  return (
    <ol className="flex flex-col gap-4 border-l border-border pl-6">
      {events.map((event) => (
        <li key={event.id} className="relative">
          <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
          <p className="text-sm text-foreground">{event.message}</p>
          <p className="mt-1 text-xs text-muted">
            {event.createdAt.toLocaleString("de-DE")}
            {event.actor?.name ? ` · ${event.actor.name}` : ""}
          </p>
        </li>
      ))}
    </ol>
  );
}
