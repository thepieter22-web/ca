import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const fileName = `logos/${Date.now()}-${file.name}`;

  const { data, error } = await supabaseAdmin.storage
    .from('carpetz')
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: publicUrl } = supabaseAdmin.storage
    .from('carpetz')
    .getPublicUrl(fileName);

  return NextResponse.json({ url: publicUrl.publicUrl });
}
