import { NextResponse } from "next/server";

import forms from "~/data/forms.json";

export async function GET(_: Request) {
  return NextResponse.json(forms);
}
