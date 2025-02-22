import { NextResponse } from 'next/server';
import { trpc } from '../../../utils/trpc';

const context = trpc.useContext();
const archiveMutation = trpc.item.autoArchive.useMutation({
  onSuccess: (res) => {
    context.item.unarchivedOlderThan.invalidate();
    context.item.search.invalidate();
  }
});

export async function GET() {
  archiveMutation.mutate();
  return NextResponse.json({ success: true });
}
