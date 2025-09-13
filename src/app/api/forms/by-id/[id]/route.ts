import { NextResponse } from "next/server";

import forms from "~/data/forms.json";
import { FormSchema } from "~/types/form";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const formId = (await params).id;
  const form = (forms as FormSchema[]).find((form) => form.id === formId);

  if (!form) {
    return NextResponse.json({ error: "Form not found" }, { status: 404 });
  }

  return NextResponse.json(form);
}
