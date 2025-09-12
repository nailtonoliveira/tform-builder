export const formatCurrencyInput = (value: string) => {
  const numeric = value.replace(/\D/g, "");

  const number = Number(numeric);

  return number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export function parseCurrencyToNumber(value: string): number {
  const clean = value.replace(/\./g, "").replace(",", ".");
  return Number(clean);
}
