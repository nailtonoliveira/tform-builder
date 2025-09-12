export const maskCurrency = (value: string) => {
  const numeric = value.replace(/\D/g, "");

  const number = Number(numeric) / 100;

  return number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
