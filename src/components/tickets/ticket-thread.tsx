type Attachment = { id: string; filename: string };
type Message = {
  id: string;
  body: string;
  createdAt: Date;
  author: { name: string | null; email: string; role: string };
  attachments: Attachment[];
};

export function TicketThread({ messages }: { messages: Message[] }) {
  if (messages.length === 0) {
    return <p className="text-sm text-muted">Noch keine Nachrichten.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message) => {
        const isStaff = message.author.role === "ADMIN" || message.author.role === "AGENT";
        return (
          <div
            key={message.id}
            className={`rounded-2xl border p-4 ${
              isStaff ? "border-accent/30 bg-accent/5" : "border-border bg-surface"
            }`}
          >
            <div className="flex items-center justify-between text-xs text-muted">
              <span className="font-medium text-foreground">
                {message.author.name ?? message.author.email}
                {isStaff && " · Team"}
              </span>
              <span>{message.createdAt.toLocaleString("de-DE")}</span>
            </div>
            <p className="mt-2 whitespace-pre-wrap text-sm text-foreground">{message.body}</p>
            {message.attachments.length > 0 && (
              <ul className="mt-3 flex flex-col gap-1">
                {message.attachments.map((attachment) => (
                  <li key={attachment.id}>
                    <a
                      href={`/api/attachments/${attachment.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:text-accent-hover"
                    >
                      {attachment.filename}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
