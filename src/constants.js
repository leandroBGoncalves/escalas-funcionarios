export const STORAGE_KEY = 'escala-padaria-nasser'

/** Nome padrão da filial exibido no título da escala */
export const DEFAULT_BRANCH_NAME = 'NASSER'

/** Setor ou nome da empresa exibido no título da escala */
export const DEFAULT_SECTOR_OR_COMPANY = 'PADARIA'

/** Dimensões do modelo (escala-nasser.svg viewBox 0 0 1080 1550) */
export const SCALE_WIDTH = 1080
export const SCALE_HEIGHT = 1550

/** Altura mínima da escala (quando poucos funcionários) */
const SCALE_BASE_HEIGHT = 1550

/** Altura ocupada pelo cabeçalho + cabeçalho da tabela + rodapé (logo) */
const SCALE_FIXED_HEIGHT = 720

/** Altura de cada linha de funcionário na tabela */
export const SCALE_ROW_HEIGHT = 110

/** Altura da escala em px conforme o número de funcionários (cresce com mais de ~8) */
export function getScaleHeight(employeeCount) {
  const bodyHeight = Math.max(0, employeeCount) * SCALE_ROW_HEIGHT
  return Math.max(SCALE_BASE_HEIGHT, SCALE_FIXED_HEIGHT + bodyHeight)
}

export const INITIAL_EMPLOYEES = [
  { name: '', horario1: '', horario2: '' },
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
