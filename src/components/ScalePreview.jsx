import React, { forwardRef } from 'react'
import { SCALE_WIDTH, SCALE_HEIGHT, getScaleHeight } from '../constants'

const FOLGA = 'FOLGA'

const FLOWSHIFT_BLUE = '#1A73B8'
const FLOWSHIFT_ORANGE = '#F28C33'
const FLOWSHIFT_BG = '#F4F7F6'

const styles = {
  fontFamily: 'Inter, system-ui, sans-serif',
  scale: {
    container: (scaleHeight) => ({
      width: SCALE_WIDTH,
      height: scaleHeight,
      minWidth: SCALE_WIDTH,
      minHeight: scaleHeight,
      backgroundColor: FLOWSHIFT_BG,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      paddingBottom: 310,
      alignItems: 'center',
    }),
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
      fontFamily: 'Inter, system-ui, sans-serif',
      fontWeight: 800,
      fontSize: 80,
      color: FLOWSHIFT_ORANGE,
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
      lineHeight: 1.1,
      margin: 0,
    },
    branchName: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontWeight: 800,
      fontSize: 75,
      color: FLOWSHIFT_BLUE,
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
      lineHeight: 1.2,
      margin: 0,
    },
    dashedLine: {
      width: '80%',
      maxWidth: 800,
      borderBottom: `3px dashed ${FLOWSHIFT_BLUE}`,
      margin: '4px 0',
    },
    date: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontWeight: 800,
      fontSize: 70,
      color: FLOWSHIFT_BLUE,
      textTransform: 'uppercase',
      lineHeight: 1.2,
      margin: 0,
    },
    tableWrapper: {
      flex: 1,
      minHeight: 0,
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
      minHeight: 0,
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      border: `8px solid ${FLOWSHIFT_BLUE}`,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    },
    tableHeader: {
      display: 'grid',
      gridTemplateColumns: '320px 350px 1fr',
      minHeight: 90,
      borderBottom: `4px solid ${FLOWSHIFT_BLUE}`,
      flexShrink: 0,
      backgroundColor: 'rgba(26, 115, 184, 0.08)',
    },
    tableHeaderCell: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontWeight: 'bold',
      fontSize: 38,
      color: FLOWSHIFT_ORANGE,
      textTransform: 'uppercase',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 48,
      borderLeft: `4px solid ${FLOWSHIFT_BLUE}`,
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
      borderBottom: '2px solid rgba(26, 115, 184, 0.2)',
      alignItems: 'center',
      flexShrink: 0,
    },
    tableCell: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontWeight: 'bold',
      fontSize: 38,
      color: FLOWSHIFT_BLUE,
      paddingLeft: 48,
      borderLeft: `4px solid ${FLOWSHIFT_BLUE}`,
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
      overflow: 'hidden',
      borderTopLeftRadius: 48,
      borderTopRightRadius: 48,
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
      bottom: 32,
      transform: 'translateX(-50%)',
      width: 560,
      height: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'auto',
      backgroundColor: 'transparent',
    },
    logoCard: {
      width: '100%',
      height: '100%',
      backgroundColor: '#FFFFFF',
      borderRadius: 24,
      boxShadow: '0 8px 24px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      boxSizing: 'border-box',
    },
    logoClip: {
      width: '100%',
      height: '100%',
      borderRadius: 16,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoImg: {
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
  },
}

/**
 * Escala de trabalho em HTML (identidade FlowShift).
 * Layout: 1080×1550px, azul #1A73B8 e laranja #F28C33.
 */
const ScalePreview = forwardRef(function ScalePreview({ date, employees, branchName = 'NASSER', sectorOrCompany = 'PADARIA', className = '', scaleHeight: scaleHeightProp }, ref) {
  const scaleHeight = scaleHeightProp ?? getScaleHeight(employees?.length ?? 0)
  const titleLine = [sectorOrCompany?.trim(), branchName?.trim()].filter(Boolean).join(' - ') || 'PADARIA - NASSER'
  return (
    <div
      ref={ref}
      className={className}
      style={styles.scale.container(scaleHeight)}
    >
      {/* Cabeçalho */}
      <header style={styles.scale.header}>
        <h1 style={styles.scale.title}>ESCALA DE TRABALHO</h1>
        <h2 style={styles.scale.branchName}>{titleLine}</h2>
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
            fill={FLOWSHIFT_BLUE}
          />
          <path
            d="M0 150 C 300 110, 700 190, 1080 150 L 1080 340 L 0 340 Z"
            fill={FLOWSHIFT_ORANGE}
            opacity="0.25"
          />
        </svg>
        <div style={styles.scale.logoWrapper}>
          <div style={styles.scale.logoCard}>
            <div style={styles.scale.logoClip}>
              <img
                src="/FLOWSHIFT_Escalas_Inteligientes.png"
                alt="FlowShift - Escalas Inteligentes"
                style={styles.scale.logoImg}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default ScalePreview
