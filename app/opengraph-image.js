import { ImageResponse } from 'next/og'

export const alt = 'RAMP — Revista Argentina de Medicina Prehospitalaria'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #0f2240 0%, #0c4a6e 60%, #0284c7 100%)',
          color: 'white',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              padding: '8px 18px',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 999,
              color: 'rgba(255,255,255,0.85)',
              textTransform: 'uppercase',
            }}
          >
            SAMPRE · Acceso Abierto
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 140, lineHeight: 1, fontWeight: 700, letterSpacing: -4 }}>RAMP</div>
          <div style={{ width: 140, height: 4, background: '#9a7a3a' }} />
          <div style={{ fontSize: 44, lineHeight: 1.2, maxWidth: 900, color: 'rgba(255,255,255,0.92)' }}>
            Revista Argentina de Medicina Prehospitalaria
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 22, color: 'rgba(255,255,255,0.7)' }}>
          <span>ramp.sampre.com.ar</span>
          <span>ISSN en trámite · CC BY-NC-SA 4.0</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
