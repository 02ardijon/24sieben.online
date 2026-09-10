type Attachment = { id: string; filename: string };

export function AttachmentList({ attachments }: { attachments: Attachment[] }) {
  if (attachments.length === 0) return null;

  return (
    <ul className="flex flex-col gap-1">
      {attachments.map((attachment) => (
        <li key={attachment.id}>
          <a
            href={`/api/attachments/${attachment.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:text-accent-hover"
          >
            {attachment.filename}
          </a>
        </li>
      ))}
    </ul>
  );
}
