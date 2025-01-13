import { InspectionData } from '@/types/inspection-data'
import { formatDate } from '@/utils/dateFormatter'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

type RGBColor = [number, number, number]

const STYLES = {
  colors: {
    text: [51 / 255, 51 / 255, 51 / 255] as RGBColor,
    heading: [0, 0, 0] as RGBColor,
    tableHeader: [245, 245, 245] as RGBColor,
    primary: [22 / 255, 163 / 255, 74 / 255] as RGBColor
  },
  margins: {
    left: 20,
    right: 20,
    top: 20
  },
  fontSize: {
    title: 24,
    sectionTitle: 16,
    body: 10
  }
}

const formatSection = (
  doc: any,
  title: string,
  bodyData: Array<[string, string | number]>,
  currentY: number
): number => {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(STYLES.fontSize.sectionTitle)
  doc.setTextColor(...STYLES.colors.heading)
  doc.text(title, STYLES.margins.left, currentY)

  ;(doc as any).autoTable({
    startY: currentY + 5,
    head: [['Campo', 'Valor', 'Observaciones']],
    body: bodyData,
    theme: 'plain',
    styles: {
      font: 'helvetica',
      fontSize: STYLES.fontSize.body,
      cellPadding: 2,
      lineWidth: 0.1
    },
    headStyles: {
      fillColor: STYLES.colors.tableHeader,
      textColor: [80, 80, 80],
      fontStyle: 'bold',
      fontSize: STYLES.fontSize.body
    },
    columnStyles: {
      0: { fontStyle: 'bold', width: 80 },
      1: { width: 80 },
      2: { width: 80 }
    },
    margin: { left: STYLES.margins.left, right: STYLES.margins.right },
    alternateRowStyles: {
      fillColor: [250, 250, 250]
    },
    didDrawCell: function (data: any) {
      const doc = data.doc
      doc.setDrawColor(230, 230, 230)
      doc.setLineWidth(0.1)

      if (data.section === 'head') {
        doc.rect(
          data.cell.x,
          data.cell.y,
          data.cell.width,
          data.cell.height,
          'S'
        )
      } else if (data.section === 'body') {
        doc.line(
          data.cell.x,
          data.cell.y + data.cell.height,
          data.cell.x + data.cell.width,
          data.cell.y + data.cell.height
        )
      }
    }
  })

  return (doc as any).lastAutoTable.finalY + 15
}

export const generatePdf = async (
  data: InspectionData
): Promise<Uint8Array> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(STYLES.fontSize.title)
  doc.setTextColor(...STYLES.colors.heading)
  const title = 'Inspección de vehículo'
  const titleWidth =
    (doc.getStringUnitWidth(title) * doc.getFontSize()) /
    doc.internal.scaleFactor
  const pageWidth = doc.internal.pageSize.getWidth()
  doc.text(title, (pageWidth - titleWidth) / 2, STYLES.margins.top + 10)

  let currentY = STYLES.margins.top + 35

  currentY = formatSection(
    doc,
    'Información General',
    [
      ['Código de inspección', data.id],
      ['Fecha de creación', formatDate(data.fecha_creacion)],
      ['Conductor', data.conductor.nombre],
      ['Supervisor', data.conductor.supervisor]
    ],
    currentY
  )

  currentY = formatSection(
    doc,
    'Información del Vehículo',
    [
      ['Patente', data.vehiculo.patente],
      ['Kilómetros actuales', data.vehiculo.km_actual.toString()],
      ['Kilómetros mantención', data.vehiculo.km_mantencion.toString()]
    ],
    currentY
  )

  currentY = formatSection(
    doc,
    'Documentación del conductor',
    [
      ['Licencia', data.documentos.licencia],
      ['Permiso circulación', data.documentos.permiso_circulacion],
      ['Revisión técnica', data.documentos.revision_tecnica],
      ['SOAP', data.documentos.soap],
      ['Mantención', data.documentos.mantencion]
    ],
    currentY
  )

  currentY = formatSection(
    doc,
    'Estado de luces',
    [
      ['Luces intermitentes de.', data.estadoLuces.luces_intermitentes_derecha],
      [
        'Luces intermitentes iz.',
        data.estadoLuces.luces_intermitentes_izquierda
      ],
      ['Luces freno', data.estadoLuces.luces_freno],
      ['Luces retroceso', data.estadoLuces.luces_retroceso],
      ['Luces emergencia', data.estadoLuces.luces_emergencia],
      ['Luces altas', data.estadoLuces.luces_altas],
      ['Luces bajas', data.estadoLuces.luces_bajas],
      ['Neblineros bajos', data.estadoLuces.neblineros_bajos],
      ['Luces tablero', data.estadoLuces.luces_tablero],
      ['Luz interior', data.estadoLuces.luz_interior]
    ],
    currentY
  )

  if (currentY > doc.internal.pageSize.getHeight() - 40) {
    doc.addPage()
    currentY = 40
  }

  currentY = formatSection(
    doc,
    'Estado de espejos',
    [
      ['Parabrisas delantero', data.estadoEspejos.parabrisas_delantero],
      ['Parabrisas trasero', data.estadoEspejos.parabrisas_trasero],
      [
        'Plumillas limpia parabrisas',
        data.estadoEspejos.plumillas_limpiaBrisas
      ],
      ['Alza vidrio delantero', data.estadoEspejos.alza_vidrio_delantero],
      ['Alza vidrio trasero', data.estadoEspejos.alza_vidrio_trasero],
      ['Retrovisor interior', data.estadoEspejos.retrovisor_interior],
      [
        'Espejo retrovisor derecho',
        data.estadoEspejos.espejo_retrovisor_derecho
      ],
      [
        'Espejo retrovisor izquierdo',
        data.estadoEspejos.espejo_retrovisor_izquierdo
      ],
      ['Manillas alza vidrios', data.estadoEspejos.manillas_alza_vidrios]
    ],
    currentY
  )

  currentY = formatSection(
    doc,
    'Equipos de seguridad',
    [
      ['Triangulos', data.equipoSeguridad.triangulos],
      ['Botiquin', data.equipoSeguridad.botiquin],
      ['Cinturones', data.equipoSeguridad.cinturones],
      ['Baliza', data.equipoSeguridad.baliza],
      ['Cadena de seguridad', data.equipoSeguridad.cadena_de_seguridad],
      ['Cierre de centro de costo', data.equipoSeguridad.cierre_centralizado],
      ['Cuñas', data.equipoSeguridad.cuñas],
      ['Extintores', data.equipoSeguridad.extintores],
      ['Gata', data.equipoSeguridad.gata],
      ['Llave de rueda', data.equipoSeguridad.llave_de_rueda],
      ['Kit extensiones', data.equipoSeguridad.kit_extensiones],
      ['Barra anárquica', data.equipoSeguridad.barra_antivuelco],
      ['Chaleco refletante', data.equipoSeguridad.chaleco_reflectante],
      ['Traba volante', data.equipoSeguridad.traba_volante],
      [
        'Sistema bloqueo de rueda',
        data.equipoSeguridad.sistema_bloqueo_de_rueda
      ]
    ],
    currentY
  )

  if (currentY > doc.internal.pageSize.getHeight() - 40) {
    doc.addPage()
    currentY = 40
  }

  currentY = formatSection(
    doc,
    'Niveles',
    [
      ['Niveles de agua parabrisas', data.niveles.nivel_agua_parabrisas],
      ['Niveles de agua refrigerante', data.niveles.nivel_agua_refrigerante],
      ['Niveles de aceite', data.niveles.nivel_aceite],
      ['Niveles de líquido de frenos', data.niveles.nivel_liquido_de_frenos]
    ],
    currentY
  )

  currentY = formatSection(
    doc,
    'Otros',
    [
      ['Sistema calefacción', data.otros.sistema_calefaccion],
      ['Aire acondicionado', data.otros.aire_acondicionado],
      ['Freno mano', data.otros.freno_mano],
      ['Condiciones asociadas', data.otros.condiciones_asientos],
      ['Apoyo de caja', data.otros.apoyo_cabeza_ajustable],
      ['Radio de esfuerzo', data.otros.radio_estereo],
      ['Bocina', data.otros.bocina],
      ['Alarma sonora retroceso', data.otros.alarma_sonora_retroceso],
      ['Orden de limpieza', data.otros.orden_limpieza],
      ['Estado de patente', data.otros.estado_patente]
    ],
    currentY
  )

  currentY = formatSection(
    doc,
    'Neumaticos',
    [
      ['Neumatico delantero izquierdo', data.neumaticos.delantero_izquierdo],
      ['Neumatico delantero derecho', data.neumaticos.delantero_derecho],
      ['Neumatico trasero izquierdo', data.neumaticos.trasero_izquierdo],
      ['Neumatico trasero derecho', data.neumaticos.trasero_derecho],
      ['Neumatico repuesto', data.neumaticos.repuesto]
    ],
    currentY
  )

  if (currentY > doc.internal.pageSize.getHeight() - 40) {
    doc.addPage()
    currentY = 40
  }

  currentY = formatSection(
    doc,
    'Daños Carrocería',
    [
      ['Lado del conductor', data.dañosCarroceria.lado_conductor],
      ['Lado del pasajero', data.dañosCarroceria.lado_pasajero],
      ['Lado frontal', data.dañosCarroceria.lado_frontal],
      ['Lado posterior', data.dañosCarroceria.lado_posterior]
    ],
    currentY
  )

  currentY = formatSection(
    doc,
    'Control de fatiga',
    [
      ['Cansado o fatigado', data.cansado_fatigado],
      ['Buen sueño', data.dormido_lo_suficiente],
      ['Consumo de alcohol (24 hrs)', data.consumo_alcohol],
      ['Consumo drogas (24 hrs)', data.consumo_drogas],
      ['Consumo de medicamento', data.consumo_medicamento],
      ['Estresado o preocupado', data.estresado_preocupado],
      ['Problema personal', data.problema_personal],
      ['En condición optima', data.condiciones_optimas]
    ],
    currentY
  )

  currentY = formatSection(
    doc,
    'Control de ergonomía',
    [
      ['Asiento ajustado', data.asiento_ajustado],
      ['Espejos posicionados', data.espejos_posicionados],
      ['Volante altura correcta', data.volante_altura_correcta],
      ['Pedales distancia correcta', data.pedales_distancia_correcta],
      ['Postura conducción comoda', data.postura_conduccion_comoda],
      ['Visibilidad adecuada', data.visibilidad_adecuada],
      ['Controles al alcance', data.controles_al_alcance]
    ],
    currentY
  )

  const pageHeight = doc.internal.pageSize.getHeight()
  doc.setFontSize(10)
  doc.setFont('helvetica', 'italic')
  doc.setTextColor(...STYLES.colors.text)

  const dateCreation = formatDate(data.fecha_creacion)

  const signatureMessage = `El conductor, ${data.conductor.nombre}, conforme a la responsabilidad notificada y aceptada, asume la total responsabilidad por la veracidad y precisión de los datos consignados en el documento de inspección, código ${data.id}, correspondiente al vehículo con patente ${data.vehiculo.patente}, realizado el ${dateCreation}.`

  const maxWidth = pageWidth - (STYLES.margins.left + STYLES.margins.right) * 2
  const lines = doc.splitTextToSize(signatureMessage, maxWidth)

  const lineHeight = doc.getFontSize() * 0.3527777778
  const startY = pageHeight - 35

  lines.forEach((line: string, index: number) => {
    const lineWidth =
      (doc.getStringUnitWidth(line) * doc.getFontSize()) /
      doc.internal.scaleFactor
    const xPosition = (pageWidth - lineWidth) / 2
    doc.text(line, xPosition, startY + index * lineHeight)
  })

  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...STYLES.colors.text)
  const messageFooter = 'Diprofire Chile Ltda.'
  doc.text(messageFooter, STYLES.margins.left, pageHeight - 15)

  const arrayBuffer = doc.output('arraybuffer')
  return new Uint8Array(arrayBuffer)
}
