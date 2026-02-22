import React, { useRef } from 'react'

const FOLGA = 'FOLGA'

/** Extrai "De" e "Até" de um valor como "05:00 - 11:00" ou "05:00" */
function parseTimeRange(value) {
  if (!value || (value || '').trim().toUpperCase() === FOLGA) return { start: '', end: '' }
  const s = (value || '').trim()
  const parts = s.split(/\s*-\s*/).map((p) => p.trim())
  if (parts.length >= 2) return { start: parts[0] || '', end: parts[1] || '' }
  if (parts.length === 1 && /^\d{1,2}:\d{2}$/.test(parts[0])) return { start: parts[0], end: '' }
  return { start: '', end: '' }
}

/** Monta o valor a salvar a partir de start/end */
function formatTimeRange(start, end) {
  if (!start && !end) return ''
  if (start && end) return `${start} - ${end}`
  return start || end
}

export default function EmployeeCard({ employee, index, onChange, onFolga, onRemove, canRemove }) {
  const h1 = (employee.horario1 || '').trim().toUpperCase()
  const h2 = (employee.horario2 || '').trim().toUpperCase()
  const isFolga = h1 === FOLGA && h2 === FOLGA

  const handleFolga = () => {
    onFolga(index)
  }

  const handleChange = (field, value) => {
    onChange(index, field, value)
  }

  const horario1Range = parseTimeRange(isFolga ? '' : employee.horario1)
  const horario2Range = parseTimeRange(isFolga ? '' : employee.horario2)

  const handleHorario1Change = (start, end) => {
    handleChange('horario1', formatTimeRange(start, end))
  }
  const handleHorario2Change = (start, end) => {
    handleChange('horario2', formatTimeRange(start, end))
  }

  const timeRef1Start = useRef(null)
  const timeRef1End = useRef(null)
  const timeRef2Start = useRef(null)
  const timeRef2End = useRef(null)

  const openTimePicker = (ref) => {
    if (!ref?.current || isFolga) return
    ref.current.focus()
    if (typeof ref.current.showPicker === 'function') {
      ref.current.showPicker()
    }
  }

  const inputTimeClass =
    'w-full rounded-flowshift border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-flowshift-blue focus:ring-2 focus:ring-flowshift-blue/20 focus:outline-none'

  return (
    <div
      className={`rounded-flowshift border border-gray-200 p-4 shadow-flowshift-card transition-colors ${
        isFolga
          ? 'bg-gray-200 border-gray-300'
          : 'bg-flowshift-card border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
        {canRemove && onRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-sm font-medium text-red-600 hover:text-red-700 active:opacity-80"
            aria-label="Remover funcionário"
          >
            Remover
          </button>
        )}
      </div>
      <label className="block mb-4">
        <span className="text-sm text-gray-600 block mb-1">Nome do colaborador</span>
        <input
          type="text"
          placeholder="Nome"
          className="w-full rounded-flowshift border border-gray-300 px-4 py-3 text-flowshift-blue font-semibold text-lg focus:border-flowshift-blue focus:ring-2 focus:ring-flowshift-blue/20 focus:outline-none"
          value={employee.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </label>

      <div className="space-y-4">
        <div className="block">
          <span className="text-sm text-gray-600 block mb-2">Horário 1</span>
          <div className="grid grid-cols-2 gap-2">
            <label
              className="flex flex-col cursor-pointer rounded-flowshift border border-gray-300 focus-within:ring-2 focus-within:ring-flowshift-blue/20 focus-within:border-flowshift-blue"
              onClick={(e) => { e.preventDefault(); openTimePicker(timeRef1Start) }}
            >
              <span className="text-xs text-gray-500 block mb-1 px-1 pt-2">De</span>
              <input
                ref={timeRef1Start}
                type="time"
                className={`${inputTimeClass} border-0 focus:ring-0 rounded-t-none`}
                value={horario1Range.start}
                onChange={(e) => handleHorario1Change(e.target.value, horario1Range.end)}
                disabled={isFolga}
              />
            </label>
            <label
              className="flex flex-col cursor-pointer rounded-flowshift border border-gray-300 focus-within:ring-2 focus-within:ring-flowshift-blue/20 focus-within:border-flowshift-blue"
              onClick={(e) => { e.preventDefault(); openTimePicker(timeRef1End) }}
            >
              <span className="text-xs text-gray-500 block mb-1 px-1 pt-2">Até</span>
              <input
                ref={timeRef1End}
                type="time"
                className={`${inputTimeClass} border-0 focus:ring-0 rounded-t-none`}
                value={horario1Range.end}
                onChange={(e) => handleHorario1Change(horario1Range.start, e.target.value)}
                disabled={isFolga}
              />
            </label>
          </div>
        </div>
        <div className="block">
          <span className="text-sm text-gray-600 block mb-2">Horário 2</span>
          <div className="grid grid-cols-2 gap-2">
            <label
              className="flex flex-col cursor-pointer rounded-flowshift border border-gray-300 focus-within:ring-2 focus-within:ring-flowshift-blue/20 focus-within:border-flowshift-blue"
              onClick={(e) => { e.preventDefault(); openTimePicker(timeRef2Start) }}
            >
              <span className="text-xs text-gray-500 block mb-1 px-1 pt-2">De</span>
              <input
                ref={timeRef2Start}
                type="time"
                className={`${inputTimeClass} border-0 focus:ring-0 rounded-t-none`}
                value={horario2Range.start}
                onChange={(e) => handleHorario2Change(e.target.value, horario2Range.end)}
                disabled={isFolga}
              />
            </label>
            <label
              className="flex flex-col cursor-pointer rounded-flowshift border border-gray-300 focus-within:ring-2 focus-within:ring-flowshift-blue/20 focus-within:border-flowshift-blue"
              onClick={(e) => { e.preventDefault(); openTimePicker(timeRef2End) }}
            >
              <span className="text-xs text-gray-500 block mb-1 px-1 pt-2">Até</span>
              <input
                ref={timeRef2End}
                type="time"
                className={`${inputTimeClass} border-0 focus:ring-0 rounded-t-none`}
                value={horario2Range.end}
                onChange={(e) => handleHorario2Change(horario2Range.start, e.target.value)}
                disabled={isFolga}
              />
            </label>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleFolga}
        className="mt-4 w-full py-3 rounded-flowshift font-semibold text-flowshift-blue bg-gray-100 border border-gray-300 hover:bg-gray-200 active:bg-gray-300 transition-colors"
      >
        Folga
      </button>
    </div>
  )
}
