import React from 'react'

const FOLGA = 'FOLGA'

export default function EmployeeCard({ employee, index, onChange, onFolga }) {
  const h1 = (employee.horario1 || '').trim().toUpperCase()
  const h2 = (employee.horario2 || '').trim().toUpperCase()
  const isFolga = h1 === FOLGA && h2 === FOLGA

  const handleFolga = () => {
    onFolga(index)
  }

  const handleChange = (field, value) => {
    onChange(index, field, value)
  }

  return (
    <div
      className={`rounded-2xl border-2 p-4 shadow-sm transition-colors ${
        isFolga
          ? 'bg-gray-200 border-gray-400'
          : 'bg-white border-escala-navy/20'
      }`}
    >
      <label className="block mb-4">
        <span className="text-sm text-gray-600 block mb-1">Nome do colaborador</span>
        <input
          type="text"
          placeholder="Nome"
          className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-escala-navy font-bold text-lg focus:border-escala-navy focus:ring-2 focus:ring-escala-navy/20 focus:outline-none"
          value={employee.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </label>

      <div className="space-y-3">
        <label className="block">
          <span className="text-sm text-gray-600 block mb-1">Horário 1</span>
          <input
            type="text"
            inputMode="text"
            placeholder="Ex: 05:00 - 11:00"
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-gray-900 focus:border-escala-navy focus:ring-2 focus:ring-escala-navy/20 focus:outline-none"
            value={employee.horario1}
            onChange={(e) => handleChange('horario1', e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-sm text-gray-600 block mb-1">Horário 2</span>
          <input
            type="text"
            inputMode="text"
            placeholder="Ex: 13:00 - 16:00"
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-gray-900 focus:border-escala-navy focus:ring-2 focus:ring-escala-navy/20 focus:outline-none"
            value={employee.horario2}
            onChange={(e) => handleChange('horario2', e.target.value)}
          />
        </label>
      </div>

      <button
        type="button"
        onClick={handleFolga}
        className="mt-4 w-full py-3 rounded-xl font-semibold text-escala-navy bg-gray-100 border-2 border-gray-300 hover:bg-gray-200 active:bg-gray-300 transition-colors"
      >
        Folga
      </button>
    </div>
  )
}
