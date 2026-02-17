import React, { forwardRef } from 'react'
import { SCALE_WIDTH, SCALE_HEIGHT } from '../constants'

const FOLGA = 'FOLGA'

const styles = {
  fontFamily: 'Arial, sans-serif',
  scale: {
    container: {
      width: SCALE_WIDTH,
      height: SCALE_HEIGHT,
      minWidth: SCALE_WIDTH,
      minHeight: SCALE_HEIGHT,
      backgroundColor: '#FFD700',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      paddingBottom: 310,
      alignItems: 'center',
    },
    header: {
      flexShrink: 0,
      paddingTop: 52,
      paddingBottom: 10,
      paddingLeft: 40,
      paddingRight: 40,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
    },
    title: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: 900,
      fontSize: 80,
      color: '#E30613',
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
      lineHeight: 1.1,
      margin: 0,
    },
    branchName: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: 900,
      fontSize: 75,
      color: '#1D2B5B',
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
      lineHeight: 1.2,
      margin: 0,
    },
    dashedLine: {
      width: '80%',
      maxWidth: 800,
      borderBottom: '3px dashed #1D2B5B',
      margin: '4px 0',
    },
    date: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: 900,
      fontSize: 70,
      color: '#1D2B5B',
      textTransform: 'uppercase',
      lineHeight: 1.2,
      margin: 0,
    },
    tableWrapper: {
      flex: 1,
      minHeight: 910,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100%',
      maxWidth: SCALE_WIDTH - 100,
      display: 'flex',
      flexDirection: 'column'
    },
    table: {
      flex: 1,
      width: '100%',
      minHeight: 910,
      backgroundColor: '#fff',
      borderRadius: 40,
      border: '8px solid #1D2B5B',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    tableHeader: {
      display: 'grid',
      gridTemplateColumns: '320px 350px 1fr',
      minHeight: 90,
      borderBottom: '4px solid #1D2B5B',
      flexShrink: 0,
    },
    tableHeaderCell: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      fontSize: 38,
      color: '#E30613',
      textTransform: 'uppercase',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 48,
      borderLeft: '4px solid #1D2B5B',
    },
    tableHeaderCellFirst: {
      paddingLeft: 48,
      borderLeft: 'none',
    },
    tableHeaderCellCenter: {
      justifyContent: 'center',
      paddingLeft: 0,
    },
    tableRow: {
      display: 'grid',
      gridTemplateColumns: '320px 350px 1fr',
      minHeight: 110,
      borderBottom: '2px solid #E30613',
      alignItems: 'center',
      flexShrink: 0,
    },
    tableCell: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      fontSize: 38,
      color: '#1D2B5B',
      paddingLeft: 48,
      borderLeft: '4px solid #1D2B5B',
    },
    tableCellFirst: {
      borderLeft: 'none',
    },
    tableCellCenter: {
      justifyContent: 'center',
      textAlign: 'center',
      paddingLeft: 0,
      fontSize: 36,
    },
    tableCellEmpty: {
      color: '#9ca3af',
      fontWeight: 'normal',
    },
    bottomSection: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 310,
      pointerEvents: 'none',
    },
    waveSvg: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    logoWrapper: {
      position: 'absolute',
      left: '50%',
      bottom: 16,
      transform: 'translateX(-50%)',
      width: 500,
      height: 280,
      borderRadius: '50%',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'auto',
    },
    logoImg: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      transform: 'scale(1.15)',
    },
  },
}

/**
 * Escala de trabalho em HTML puro (sem imagem de fundo).
 * Layout: 1080×1550px, cores e tipografia do modelo original.
 */
const ScalePreview = forwardRef(function ScalePreview({ date, employees, branchName = 'NASSER', className = '' }, ref) {
  return (
    <div
      ref={ref}
      className={className}
      style={styles.scale.container}
    >
      {/* Cabeçalho */}
      <header style={styles.scale.header}>
        <h1 style={styles.scale.title}>ESCALA DE TRABALHO</h1>
        <h2 style={styles.scale.branchName}>PADARIA - {branchName || 'NASSER'}</h2>
        <div style={styles.scale.dashedLine} aria-hidden />
        <p style={styles.scale.date}>{date || '--/--/----'}</p>
      </header>

      {/* Tabela */}
      <div style={styles.scale.tableWrapper}>
        <div style={styles.scale.table}>
          <div style={styles.scale.tableHeader}>
            <div style={{ ...styles.scale.tableHeaderCell, ...styles.scale.tableHeaderCellFirst }}>
              Funcionário
            </div>
            <div style={{ ...styles.scale.tableHeaderCell, ...styles.scale.tableHeaderCellCenter }}>
              Horário 1
            </div>
            <div style={{ ...styles.scale.tableHeaderCell, ...styles.scale.tableHeaderCellCenter }}>
              Horário 2
            </div>
          </div>
          <div style={{ flex: 1, minHeight: 0, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
            {employees.map((emp, i) => (
              <div key={i} style={styles.scale.tableRow}>
                <div style={{ ...styles.scale.tableCell, ...styles.scale.tableCellFirst }}>
                  {emp.name || '—'}
                </div>
                <div style={{ ...styles.scale.tableCell, ...styles.scale.tableCellCenter }}>
                  {emp.horario1 ? (
                    <span style={emp.horario1.toUpperCase() === FOLGA ? { fontWeight: 'bold' } : undefined}>
                      {emp.horario1}
                    </span>
                  ) : (
                    <span style={styles.scale.tableCellEmpty}>—</span>
                  )}
                </div>
                <div style={{ ...styles.scale.tableCell, ...styles.scale.tableCellCenter }}>
                  {emp.horario2 ? (
                    <span style={emp.horario2.toUpperCase() === FOLGA ? { fontWeight: 'bold' } : undefined}>
                      {emp.horario2}
                    </span>
                  ) : (
                    <span style={styles.scale.tableCellEmpty}>—</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Faixa vermelha inferior + logo */}
      <div style={styles.scale.bottomSection}>
        <svg
          style={styles.scale.waveSvg}
          viewBox="0 0 1080 340"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120 C 300 80, 700 160, 1080 120 L 1080 340 L 0 340 Z"
            fill="#E30613"
          />
          <path
            d="M0 150 C 300 110, 700 190, 1080 150 L 1080 340 L 0 340 Z"
            fill="#1D2B5B"
            opacity="0.3"
          />
        </svg>
        <div style={styles.scale.logoWrapper}>
          <img
            src="/logo-mister.png"
            alt="Mister Compras Júnior"
            style={styles.scale.logoImg}
          />
        </div>
      </div>
    </div>
  )
})

export default ScalePreview
