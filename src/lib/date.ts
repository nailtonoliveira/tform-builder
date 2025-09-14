import dayjs from "dayjs";

export function formatDate(dateStr: string, formatStr: string = "DD/MM/YYYY") {
  const d = dayjs(dateStr);

  if (!d.isValid()) return "";

  return d.format(formatStr);
}
