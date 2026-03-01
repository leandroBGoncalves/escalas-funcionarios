import React, { useState } from 'react'
import TimePickerModal from './TimePickerModal'

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

export default function EmployeeCard({ employee, index, onChange, onFolga, onRemoverFolga, onRemove, canRemove }) {
  const h1 = (employee.horario1 || '').trim().toUpperCase()
  const h2 = (employee.horario2 || '').trim().toUpperCase()
  const isFolga = h1 === FOLGA && h2 === FOLGA

  const handleFolga = () => {
    onFolga(index)
  }

  const handleRemoverFolga = () => {
    onRemoverFolga?.(index)
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

  const [timePickerSlot, setTimePickerSlot] = useState(null)

  const openTimePicker = (slot) => {
    if (isFolga) return
    setTimePickerSlot(slot)
  }

  const getTimePickerValue = () => {
    if (!timePickerSlot) return ''
    if (timePickerSlot === 'h1Start') return horario1Range.start
    if (timePickerSlot === 'h1End') return horario1Range.end
    if (timePickerSlot === 'h2Start') return horario2Range.start
    if (timePickerSlot === 'h2End') return horario2Range.end
    return ''
  }

  const handleTimePickerConfirm = (value) => {
    if (timePickerSlot === 'h1Start') handleHorario1Change(value, horario1Range.end)
    if (timePickerSlot === 'h1End') handleHorario1Change(horario1Range.start, value)
    if (timePickerSlot === 'h2Start') handleHorario2Change(value, horario2Range.end)
    if (timePickerSlot === 'h2End') handleHorario2Change(horario2Range.start, value)
    setTimePickerSlot(null)
  }

  const timeCellClass =
    'flex flex-col cursor-pointer rounded-flowshift border border-gray-300 focus-within:ring-2 focus-within:ring-flowshift-blue/20 focus-within:border-flowshift-blue min-h-[44px] justify-center px-2 py-2 bg-white'

  return (
    <div
      className={`rounded-flowshift border border-gray-200 p-3 shadow-flowshift-card transition-colors ${
        isFolga
          ? 'bg-gray-200 border-gray-300'
          : 'bg-flowshift-card border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
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
      <label className="block mb-3">
        <span className="text-sm text-gray-600 block mb-1">Nome do colaborador</span>
        <input
          type="text"
          placeholder="Nome"
          className="w-full rounded-flowshift border border-gray-300 px-4 py-3 text-flowshift-blue font-semibold text-lg focus:border-flowshift-blue focus:ring-2 focus:ring-flowshift-blue/20 focus:outline-none"
          value={employee.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </label>

      <div className="space-y-3">
        <div className="block">
          <span className="text-sm text-gray-600 block mb-1.5">Horário 1</span>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => openTimePicker('h1Start')}
              disabled={isFolga}
              className={`${timeCellClass} text-left ${isFolga ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <span className="text-xs text-gray-500">De</span>
              <span className="text-sm font-medium text-gray-900">{horario1Range.start || '--:--'}</span>
            </button>
            <button
              type="button"
              onClick={() => openTimePicker('h1End')}
              disabled={isFolga}
              className={`${timeCellClass} text-left ${isFolga ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <span className="text-xs text-gray-500">Até</span>
              <span className="text-sm font-medium text-gray-900">{horario1Range.end || '--:--'}</span>
            </button>
          </div>
        </div>
        <div className="block">
          <span className="text-sm text-gray-600 block mb-1.5">Horário 2</span>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => openTimePicker('h2Start')}
              disabled={isFolga}
              className={`${timeCellClass} text-left ${isFolga ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <span className="text-xs text-gray-500">De</span>
              <span className="text-sm font-medium text-gray-900">{horario2Range.start || '--:--'}</span>
            </button>
            <button
              type="button"
              onClick={() => openTimePicker('h2End')}
              disabled={isFolga}
              className={`${timeCellClass} text-left ${isFolga ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <span className="text-xs text-gray-500">Até</span>
              <span className="text-sm font-medium text-gray-900">{horario2Range.end || '--:--'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-1.5">
        {isFolga ? (
          <button
            type="button"
            onClick={handleRemoverFolga}
            className="flex-1 min-h-[44px] py-2.5 rounded-flowshift font-semibold text-white bg-flowshift-blue border border-flowshift-blue hover:opacity-90 active:opacity-90 transition-opacity"
          >
            Definir horários
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFolga}
            className="w-full min-h-[44px] py-2.5 rounded-flowshift font-semibold text-flowshift-blue bg-gray-100 border border-gray-300 hover:bg-gray-200 active:bg-gray-300 transition-colors"
          >
            Folga
          </button>
        )}
      </div>

      {timePickerSlot && (
        <TimePickerModal
          value={getTimePickerValue()}
          onConfirm={handleTimePickerConfirm}
          onClose={() => setTimePickerSlot(null)}
        />
      )}
    </div>
  )
}
