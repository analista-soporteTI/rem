import { getTursoClient } from '@/lib/turso'
import { LibsqlError } from '@libsql/client'

interface CheckListResponse {
  success: boolean
  error?: string
  inspectionId?: number
}

const validateRequiredFields = (input: any): string[] => {
  const errors: string[] = []

  if (!input.nombre_conductor?.trim())
    errors.push('El campo nombre_conductor es obligatorio')
  if (!input.nombre_supervisor?.trim())
    errors.push('El campo nombre_supervisor es obligatorio')
  if (!input.patente_vehiculo?.trim())
    errors.push('El campo patente_vehiculo es obligatorio')
  if (!input.km_actual?.trim()) errors.push('El campo km_actual es obligatorio')

  return errors
}

export const insertInspections = async (
  input: any
): Promise<CheckListResponse> => {
  const validationErrors = validateRequiredFields(input)
  if (validationErrors.length > 0) {
    return {
      success: false,
      error: validationErrors.join(', ')
    }
  }

  const turso = await getTursoClient()

  try {
    const sql = `
      INSERT INTO inspections (
        id,
        nombre_conductor, nombre_supervisor, patente_vehiculo, km_actual, km_mantencion, fecha_creacion,
        licencia, permiso_circulacion, revision_tecnica, soap, mantencion,
        luces_intermitentes_derecha, luces_intermitentes_izquierda, luces_freno,
        luces_retroceso, luces_emergencia, luces_altas, luces_bajas, neblineros_bajos,
        luces_tablero, luz_interior,
        parabrisas_delantero, parabrisas_trasero, plumillas_limpia_brisas,
        alza_vidrio_delantero, alza_vidrio_trasero, retrovisor_interior,
        espejo_retrovisor_derecho, espejo_retrovisor_izquierdo, manillas_alza_vidrios,
        triangulos, botiquin, cinturones, baliza, cadena_de_seguridad,
        cierre_centralizado, cuñas, extintores, gata, llave_de_rueda,
        kit_extensiones, barra_antivuelco, chaleco_reflectante,
        traba_volante, sistema_bloqueo_de_rueda,
        nivel_agua_parabrisas, nivel_agua_refrigerante, nivel_aceite,
        nivel_liquido_de_frenos,
        sistema_calefaccion, aire_acondicionado, freno_mano, condiciones_asientos,
        apoyo_cabeza_ajustable, radio_estereo, bocina, alarma_sonora_retroceso,
        orden_limpieza, estado_patente,
        neumatico_delantero_izquierdo, neumatico_delantero_derecho,
        neumatico_trasero_izquierdo, neumatico_trasero_derecho, neumatico_repuesto,
        daño_lado_conductor, daño_lado_pasajero, daño_lado_frontal, daño_lado_posterior,
        cansado_fatigado, dormido_lo_suficiente, consumo_alcohol, consumo_drogas,
        consumo_medicamento, estresado_preocupado, problema_personal, condiciones_optimas,
        asiento_ajustado, espejos_posicionados, volante_altura_correcta,
        pedales_distancia_correcta, postura_conduccion_comoda, visibilidad_adecuada,
        controles_al_alcance
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?
      ) RETURNING id;
    `

    console.log('insert', input)

    const params = [
      input.inspection_code,
      input.nombre_conductor,
      input.nombre_supervisor,
      input.patente_vehiculo,
      input.km_actual,
      input.km_mantencion || null,
      input.fecha_creacion,
      // Documentos
      input.documentos.licencia || null,
      input.documentos.permiso_circulacion || null,
      input.documentos.revision_tecnica || null,
      input.documentos.soap || null,
      input.documentos.mantencion || null,
      // Luces
      input.estadoLuces.luces_intermitentes_derecha || null,
      input.estadoLuces.luces_intermitentes_izquierda || null,
      input.estadoLuces.luces_freno || null,
      input.estadoLuces.luces_retroceso || null,
      input.estadoLuces.luces_emergencia || null,
      input.estadoLuces.luces_altas || null,
      input.estadoLuces.luces_bajas || null,
      input.estadoLuces.neblineros_bajos || null,
      input.estadoLuces.luces_tablero || null,
      input.estadoLuces.luz_interior || null,
      // Vidrios y espejos
      input.estadoEspejos.parabrisas_delantero || null,
      input.estadoEspejos.parabrisas_trasero || null,
      input.estadoEspejos.plumillas_limpiaBrisas || null,
      input.estadoEspejos.alza_vidrio_delantero || null,
      input.estadoEspejos.alza_vidrio_trasero || null,
      input.estadoEspejos.retrovisor_interior || null,
      input.estadoEspejos.espejo_retrovisor_derecho || null,
      input.estadoEspejos.espejo_retrovisor_izquierdo || null,
      input.estadoEspejos.manillas_alza_vidrios || null,
      // Equipo de seguridad
      input.equipoSeguridad.triangulos || null,
      input.equipoSeguridad.botiquin || null,
      input.equipoSeguridad.cinturones || null,
      input.equipoSeguridad.baliza || null,
      input.equipoSeguridad.cadena_de_seguridad || null,
      input.equipoSeguridad.cierre_centralizado || null,
      input.equipoSeguridad.cuñas || null,
      input.equipoSeguridad.extintores || null,
      input.equipoSeguridad.gata || null,
      input.equipoSeguridad.llave_de_rueda || null,
      input.equipoSeguridad.kit_extensiones || null,
      input.equipoSeguridad.barra_antivuelco || null,
      input.equipoSeguridad.chaleco_reflectante || null,
      input.equipoSeguridad.traba_volante || null,
      input.equipoSeguridad.sistema_bloqueo_de_rueda || null,
      // Niveles
      input.niveles.nivel_agua_parabrisas || null,
      input.niveles.nivel_agua_refrigerante || null,
      input.niveles.nivel_aceite || null,
      input.niveles.nivel_liquido_de_frenos || null,
      // Otros
      input.otros.sistema_calefaccion || null,
      input.otros.aire_acondicionado || null,
      input.otros.freno_mano || null,
      input.otros.condiciones_asientos || null,
      input.otros.apoyo_cabeza_ajustable || null,
      input.otros.radio_estereo || null,
      input.otros.bocina || null,
      input.otros.alarma_sonora_retroceso || null,
      input.otros.orden_limpieza || null,
      input.otros.estado_patente || null,
      // Neumáticos
      input.neumaticos.neumatico_delantero_izquierdo || null,
      input.neumaticos.neumatico_delantero_derecho || null,
      input.neumaticos.neumatico_trasero_izquierdo || null,
      input.neumaticos.neumatico_trasero_derecho || null,
      input.neumaticos.neumatico_repuesto || null,
      // Daños carrocería
      input.dañosCarroceria.lado_conductor || null,
      input.dañosCarroceria.lado_pasajero || null,
      input.dañosCarroceria.lado_frontal || null,
      input.dañosCarroceria.lado_posterior || null,
      // Control fatiga
      input.cansado_fatigado || null,
      input.dormido_lo_suficiente || null,
      input.consumo_alcohol || null,
      input.consumo_drogas || null,
      input.consumo_medicamento || null,
      input.estresado_preocupado || null,
      input.problema_personal || null,
      input.condiciones_optimas || null,
      // Control ergonomía
      input.asiento_ajustado || null,
      input.espejos_posicionados || null,
      input.volante_altura_correcta || null,
      input.pedales_distancia_correcta || null,
      input.postura_conduccion_comoda || null,
      input.visibilidad_adecuada || null,
      input.controles_al_alcance || null
    ]

    console.log(params)

    const result = await turso.execute({
      sql,
      args: params
    })

    return {
      success: true,
      inspectionId: result.rows[0]?.id as number
    }
  } catch (error) {
    console.error('Error al insertar checklist:', error)

    if (error instanceof LibsqlError) {
      return {
        success: false,
        error: `Error de base de datos: ${error.message}`
      }
    }

    return {
      success: false,
      error: 'Error inesperado al insertar el checklist'
    }
  }
}
