import { EmailSendRemProps } from '@/types/email-send-rem'

export const EmailSendRem: React.FC<Readonly<EmailSendRemProps>> = ({
  rem_code,
  name,
  email,
  dateRequest,
  ceco,
  message,
  products,
  customProducts,
  delivery,
  currency
}) => {
  const formattedDateRequest = dateRequest.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  return (
    <>
      <main>
        <section
          style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #e2e8f0',
            borderRadius: '5px',
            padding: '20px',
            marginTop: '20px'
          }}
        >
          <h2
            style={{
              color: '#2d3748',
              borderBottom: '2px solid #4a5568',
              paddingBottom: '10px'
            }}
          >
            Rem {rem_code}: Información del solicitante
          </h2>
          <table
            style={{
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: '0 10px'
            }}
          >
            <tr>
              <td style={{ fontWeight: 'bold', width: '40%' }}>Solicitante:</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>
                Fecha solicitada de entrega:
              </td>
              <td>{formattedDateRequest}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Correo:</td>
              <td>{email}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>CeCo:</td>
              <td>{ceco}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Costo total del envío:</td>
              <td>
                {delivery} {currency}
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', verticalAlign: 'top' }}>
                Link:
              </td>
              <td>https://rem-beta.diprofire.cl/seguimiento</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', verticalAlign: 'top' }}>
                Comentarios:
              </td>
              <td>{message}</td>
            </tr>
          </table>
        </section>

        <section style={{ marginTop: '30px' }}>
          <h2
            style={{
              color: '#2d3748',
              borderBottom: '2px solid #4a5568',
              paddingBottom: '10px'
            }}
          >
            Productos Solicitados
          </h2>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '10px'
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#edf2f7' }}>
                <th
                  style={{
                    border: '1px solid #e2e8f0',
                    padding: '10px',
                    textAlign: 'left'
                  }}
                >
                  Producto
                </th>
                <th
                  style={{
                    border: '1px solid #e2e8f0',
                    padding: '10px',
                    textAlign: 'left'
                  }}
                >
                  SKU
                </th>
                <th
                  style={{
                    border: '1px solid #e2e8f0',
                    padding: '10px',
                    textAlign: 'left'
                  }}
                >
                  Cantidad solicitada
                </th>
                <th
                  style={{
                    border: '1px solid #e2e8f0',
                    padding: '10px',
                    textAlign: 'left'
                  }}
                >
                  Stock disponible
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.SKU}>
                  <td style={{ border: '1px solid #e2e8f0', padding: '10px' }}>
                    {product.Product}
                  </td>
                  <td style={{ border: '1px solid #e2e8f0', padding: '10px' }}>
                    {product.SKU}
                  </td>
                  <td style={{ border: '1px solid #e2e8f0', padding: '10px' }}>
                    {product.quantity}
                  </td>
                  <td style={{ border: '1px solid #e2e8f0', padding: '10px' }}>
                    {product.Stock}
                  </td>
                </tr>
              ))}
              {customProducts.map((product: any) => (
                <tr key={product.id}>
                  <td style={{ border: '1px solid #e2e8f0', padding: '10px' }}>
                    {product.name}
                  </td>
                  <td style={{ border: '1px solid #e2e8f0', padding: '10px' }}>
                    -
                  </td>
                  <td style={{ border: '1px solid #e2e8f0', padding: '10px' }}>
                    {product.quantity}
                  </td>
                  <td style={{ border: '1px solid #e2e8f0', padding: '10px' }}>
                    -
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <footer
        style={{
          marginTop: '30px',
          textAlign: 'center',
          fontSize: '0.8em',
          color: '#718096'
        }}
      >
        <p>
          Este es un correo automático. Por favor, no responda directamente a
          este mensaje.
        </p>
      </footer>
    </>
  )
}
