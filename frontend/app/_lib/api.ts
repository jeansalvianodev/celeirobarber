export async function fetchBarbeiros() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/barbeiros`);
  if (!res.ok) throw new Error("Erro ao buscar barbeiros");
  return res.json();
}

export async function fetchServicos() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/servicos`);
  if (!res.ok) throw new Error("Erro ao buscar serviços");
  return res.json();
}
