import { EmailSendRemProps } from "@/types/email-send-rem"

export const EmailSendRem: React.FC<Readonly<EmailSendRemProps>> = ({
  name,
  email,
  date,
  ceco,
  message,
  products
}) => (
  <div>
    <section>
      <h1>Solicitud REM</h1>
      <p>
        <strong>Solicitante:</strong> {name}
      </p>
      <p>
        <strong>Fecha solicitada de entrega:</strong> {date}
      </p>
      <p>
        <strong>Correo:</strong> {email}
      </p>
      <p>
        <strong>CeCo:</strong> {ceco}
      </p>
      {message && (
        <p>
          <strong>Comentarios:</strong> <br />
          {message}
        </p>
      )}
    </section>
    <ul className='border-t border-border mt-2'>
      {products.map(product => (
        <li key={product.SKU}>
          <strong>Producto:</strong> {product.Product} <br />
          <strong>SKU:</strong> {product.SKU} <br />
          <strong>Stock disponible:</strong> {product.Stock} <br />
          <strong>Cantidad solicitada:</strong> {product.quantity} <br />
        </li>
      ))}
    </ul>
  </div>
)
