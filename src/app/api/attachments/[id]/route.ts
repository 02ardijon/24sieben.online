import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getUploadedFile } from "@/lib/uploads";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return new NextResponse(null, { status: 401 });
  }

  const { id } = await params;

  const attachment = await prisma.attachment.findUnique({
    where: { id },
    include: {
      order: true,
      ticket: true,
      ticketMessage: { include: { ticket: true } },
    },
  });

  if (!attachment) {
    return new NextResponse(null, { status: 404 });
  }

  const ownerCustomerId =
    attachment.order?.customerId ??
    attachment.ticket?.customerId ??
    attachment.ticketMessage?.ticket.customerId;

  const isStaff = session.user.role === "ADMIN" || session.user.role === "AGENT";
  const isOwner = ownerCustomerId === session.user.id;

  if (!isStaff && !isOwner) {
    return new NextResponse(null, { status: 404 });
  }

  try {
    const stream = await getUploadedFile(attachment.url);
    return new NextResponse(stream, {
      headers: {
        "Content-Type": attachment.mimeType,
        "Content-Disposition": `inline; filename="${encodeURIComponent(attachment.filename)}"`,
        "Cache-Control": "private, max-age=0, no-cache",
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
