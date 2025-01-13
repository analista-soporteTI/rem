import { sendInspectionList } from '@/lib/sendInspectionList'
import { insertInspections } from '@/lib/db/insertInspections'
import { generateUniqueCodeInspection } from '@/utils/generateUniqueCode'

export async function POST (request: Request) {
  try {
    const {
      nombre_conductor,
      nombre_supervisor,
      patente_vehiculo,
      km_actual,
      km_mantencion,
      documentos,
      estadoLuces,
      estadoEspejos,
      equipoSeguridad,
      niveles,
      otros,
      neumaticos,
      dañosCarroceria,
      cansado_fatigado,
      dormido_lo_suficiente,
      consumo_alcohol,
      consumo_drogas,
      consumo_medicamento,
      estresado_preocupado,
      problema_personal,
      condiciones_optimas,
      asiento_ajustado,
      espejos_posicionados,
      volante_altura_correcta,
      pedales_distancia_correcta,
      postura_conduccion_comoda,
      visibilidad_adecuada,
      controles_al_alcance
    } = await request.json()

    const fecha_creacion = new Date().toISOString().split('T')[0]

    const generate_inspection_code = generateUniqueCodeInspection({
      id: patente_vehiculo
    })

    await insertInspections({
      inspection_code: generate_inspection_code,
      nombre_conductor: nombre_conductor,
      nombre_supervisor: nombre_supervisor,
      patente_vehiculo: patente_vehiculo,
      km_actual: km_actual,
      km_mantencion: km_mantencion,
      fecha_creacion: fecha_creacion,
      documentos: documentos,
      estadoLuces: estadoLuces,
      estadoEspejos: estadoEspejos,
      equipoSeguridad: equipoSeguridad,
      niveles: niveles,
      otros: otros,
      neumaticos: neumaticos,
      dañosCarroceria: dañosCarroceria,
      cansado_fatigado: cansado_fatigado,
      dormido_lo_suficiente: dormido_lo_suficiente,
      consumo_alcohol: consumo_alcohol,
      consumo_drogas: consumo_drogas,
      consumo_medicamento: consumo_medicamento,
      estresado_preocupado: estresado_preocupado,
      problema_personal: problema_personal,
      condiciones_optimas: condiciones_optimas,
      asiento_ajustado: asiento_ajustado,
      espejos_posicionados: espejos_posicionados,
      volante_altura_correcta: volante_altura_correcta,
      pedales_distancia_correcta: pedales_distancia_correcta,
      postura_conduccion_comoda: postura_conduccion_comoda,
      visibilidad_adecuada: visibilidad_adecuada,
      controles_al_alcance: controles_al_alcance
    })

    await sendInspectionList({ inspection_code: generate_inspection_code })

    return Response.json(
      { message: 'Solicitud procesada con éxito.' },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return Response.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
