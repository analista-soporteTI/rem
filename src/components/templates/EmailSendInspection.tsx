export const EmailSendInspection = ({
  inspection_code
}: {
  inspection_code: string
}) => {
  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#1a1a1a',
        backgroundColor: '#ffffff'
      }}
    >
      <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <h1>Nueva Inspección de Vehículo: Código {inspection_code}</h1>
        <p>
          Se ha enviado un checklist de vehículo para su revisión. Favor usar el
          siguiente link para descargar el documento:
        </p>
        <a
          href='https://rem-beta.diprofire.cl/inspecciones/inspeccion-historial'
          style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Ver documento
        </a>
      </main>

      <footer
        style={{
          marginTop: '3rem',
          padding: '1rem',
          borderTop: '1px solid #e2e8f0',
          textAlign: 'center',
          color: '#64748b',
          fontSize: '0.875rem'
        }}
      >
        <p style={{ margin: '0' }}>
          Este es un correo automático. Por favor, no responda directamente a
          este mensaje.
        </p>
      </footer>
    </div>
  )
}
