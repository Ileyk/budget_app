export type Tip = {
  id: string
  text: {
    en: string
    es: string
  }
}

export const tips: Tip[] = [
  { id: 't1', text: { en: "Track one small recurring expense this week to see where money drains.", es: "Registra un pequeño gasto recurrente esta semana para ver por dónde se va el dinero." } },
  { id: 't2', text: { en: "Automate saving: move a fixed amount to savings right after payday.", es: "Automatiza el ahorro: pasa una cantidad fija a ahorros justo después de cobrar." } },
  { id: 't3', text: { en: "Round up transactions and save the change for goals.", es: "Redondea las transacciones y ahorra el cambio para tus metas." } },
  { id: 't4', text: { en: "Set a monthly spending limit per category and review weekly.", es: "Establece un límite mensual por categoría y revísalo semanalmente." } },
  { id: 't5', text: { en: "Compare subscriptions quarterly and cancel unused ones.", es: "Compara suscripciones cada trimestre y cancela las que no uses." } },
  { id: 't6', text: { en: "Use a dedicated account for bills to avoid overdrafts.", es: "Usa una cuenta dedicada para facturas y evita descubiertos." } },
  { id: 't7', text: { en: "Build an emergency buffer of 1–2 months' essential expenses.", es: "Construye un fondo de emergencia de 1–2 meses de gastos esenciales." } },
  { id: 't8', text: { en: "Prioritize high-interest debt repayments to reduce cost.", es: "Prioriza el pago de deudas con alto interés para reducir el coste." } },
  { id: 't9', text: { en: "Review prices on big purchases and wait 24 hours before buying.", es: "Revisa precios en compras grandes y espera 24 horas antes de comprar." } },
  { id: 't10', text: { en: "Use a simple monthly budget: income – needs – wants – savings.", es: "Usa un presupuesto mensual simple: ingresos – necesidades – deseos – ahorros." } }
]
