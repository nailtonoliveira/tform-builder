import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import forms from "~/data/forms.json";

export async function GET(_: Request) {
  return NextResponse.json(forms);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  await new Promise((resolve) => setTimeout(resolve, 1500));

  console.log("Recebi dados do formulário:", body);

  return NextResponse.json(
    { message: "Formulário recebido com sucesso!", data: body },
    { status: 200 }
  );
}
