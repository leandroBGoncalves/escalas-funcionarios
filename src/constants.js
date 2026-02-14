export const STORAGE_KEY = 'escala-padaria-nasser'

/** Nome padrão da filial exibido no título da escala */
export const DEFAULT_BRANCH_NAME = 'NASSER'

/** Dimensões do modelo (escala-nasser.svg viewBox 0 0 1080 1550) */
export const SCALE_WIDTH = 1080
export const SCALE_HEIGHT = 1550

export const INITIAL_EMPLOYEES = [
  { name: 'Maria Aux', horario1: '', horario2: '' },
  { name: 'Aparecida', horario1: '', horario2: '' },
  { name: 'Geiza', horario1: '', horario2: '' },
  { name: 'Tivaide', horario1: '', horario2: '' },
  { name: 'Bethi', horario1: '', horario2: '' },
  { name: 'Micheli', horario1: '', horario2: '' },
  { name: 'Marcos', horario1: '', horario2: '' },
]

export function formatDate(date) {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

export function getDefaultDate() {
  return formatDate(new Date())
}

export const CANVA_DESIGN_URL = 'https://www.canva.com/design/DAG8iwyqrWc/qfUHei34JQh89t52Fk15zw/view?utm_content=DAG8iwyqrWc&utm_campaign=designshare&utm_medium=embeds&utm_source=link'
export const CANVA_EMBED_URL = 'https://www.canva.com/design/DAG8iwyqrWc/qfUHei34JQh89t52Fk15zw/view?embed'
