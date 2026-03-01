import React, { useState, useEffect } from 'react'

/** Modal de seleção de horário com botões compactos para mobile */
export default function TimePickerModal({ value = '', onConfirm, onClose }) {
  const [h, setH] = useState('')
  const [m, setM] = useState('')

  useEffect(() => {
    if (value && /^\d{1,2}:\d{2}$/.test(value)) {
      const [hour, min] = value.split(':')
      setH(hour.padStart(2, '0'))
      setM(min.padStart(2, '0'))
    } else {
      setH('08')
      setM('00')
    }
  }, [value])

  const handleConfirm = () => {
    const hour = h.padStart(2, '0')
    const minute = m.padStart(2, '0')
    onConfirm(`${hour}:${minute}`)
    onClose()
  }

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full bg-white rounded-t-2xl sm:rounded-2xl shadow-xl max-h-[85vh] flex flex-col safe-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-center font-semibold text-flowshift-blue">Definir horário</h3>
        </div>
        <div className="p-4 flex gap-3 justify-center flex-wrap">
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">Hora</span>
            <select
              value={h}
              onChange={(e) => setH(e.target.value)}
              className="rounded-flowshift border border-gray-300 px-3 py-2 text-base min-h-[44px]"
            >
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">Minuto</span>
            <select
              value={m}
              onChange={(e) => setM(e.target.value)}
              className="rounded-flowshift border border-gray-300 px-3 py-2 text-base min-h-[44px]"
            >
              {minutes.map((min) => (
                <option key={min} value={min}>
                  {min}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="p-3 pt-0 flex gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-flowshift font-semibold text-gray-700 bg-gray-100 border border-gray-300 min-h-[44px]"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-2.5 rounded-flowshift font-semibold text-white bg-flowshift-orange min-h-[44px]"
          >
            Definir
          </button>
        </div>
      </div>
    </div>
  )
}
