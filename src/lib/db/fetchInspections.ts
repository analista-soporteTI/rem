import { getTursoClient } from '@/lib/turso'

export async function fetchInspections () {
  const turso = await getTursoClient()
  const { rows: inspections } = await turso.execute('SELECT * FROM inspections')

  const formattedInspections = inspections.map(inspection => {
    return {
      id: inspection.id,
      inspection_code: inspection.inspection_code,
      fecha_creacion: inspection.fecha_creacion,
      conductor: {
        nombre: inspection.nombre_conductor,
        supervisor: inspection.nombre_supervisor
      },
      vehiculo: {
        patente: inspection.patente_vehiculo,
        km_actual: inspection.km_actual,
        km_mantencion: inspection.km_mantencion
      },
      documentos: {
        licencia: inspection.licencia,
        permiso_circulacion: inspection.permiso_circulacion,
        revision_tecnica: inspection.revision_tecnica,
        soap: inspection.soap,
        mantencion: inspection.mantencion
      },
      estadoLuces: {
        luces_intermitentes_derecha: inspection.luces_intermitentes_derecha,
        luces_intermitentes_izquierda: inspection.luces_intermitentes_izquierda,
        luces_freno: inspection.luces_freno,
        luces_retroceso: inspection.luces_retroceso,
        luces_emergencia: inspection.luces_emergencia,
        luces_altas: inspection.luces_altas,
        luces_bajas: inspection.luces_bajas,
        neblineros_bajos: inspection.neblineros_bajos,
        luces_tablero: inspection.luces_tablero,
        luz_interior: inspection.luz_interior
      },
      estadoEspejos: {
        parabrisas_delantero: inspection.parabrisas_delantero,
        parabrisas_trasero: inspection.parabrisas_trasero,
        plumillas_limpiaBrisas: inspection.plumillas_limpia_brisas,
        alza_vidrio_delantero: inspection.alza_vidrio_delantero,
        alza_vidrio_trasero: inspection.alza_vidrio_trasero,
        retrovisor_interior: inspection.retrovisor_interior,
        espejo_retrovisor_derecho: inspection.espejo_retrovisor_derecho,
        espejo_retrovisor_izquierdo: inspection.espejo_retrovisor_izquierdo,
        manillas_alza_vidrios: inspection.manillas_alza_vidrios
      },
      equipoSeguridad: {
        triangulos: inspection.triangulos,
        botiquin: inspection.botiquin,
        cinturones: inspection.cinturones,
        baliza: inspection.baliza,
        cadena_de_seguridad: inspection.cadena_de_seguridad,
        cierre_centralizado: inspection.cierre_centralizado,
        cuñas: inspection.cuñas,
        extintores: inspection.extintores,
        gata: inspection.gata,
        llave_de_rueda: inspection.llave_de_rueda,
        kit_extensiones: inspection.kit_extensiones,
        barra_antivuelco: inspection.barra_antivuelco,
        chaleco_reflectante: inspection.chaleco_reflectante,
        traba_volante: inspection.traba_volante,
        sistema_bloqueo_de_rueda: inspection.sistema_bloqueo_de_rueda
      },
      niveles: {
        nivel_agua_parabrisas: inspection.nivel_agua_parabrisas,
        nivel_agua_refrigerante: inspection.nivel_agua_refrigerante,
        nivel_aceite: inspection.nivel_aceite,
        nivel_liquido_de_frenos: inspection.nivel_liquido_de_frenos
      },
      otros: {
        sistema_calefaccion: inspection.sistema_calefaccion,
        aire_acondicionado: inspection.aire_acondicionado,
        freno_mano: inspection.freno_mano,
        condiciones_asientos: inspection.condiciones_asientos,
        apoyo_cabeza_ajustable: inspection.apoyo_cabeza_ajustable,
        radio_estereo: inspection.radio_estereo,
        bocina: inspection.bocina,
        alarma_sonora_retroceso: inspection.alarma_sonora_retroceso,
        orden_limpieza: inspection.orden_limpieza,
        estado_patente: inspection.estado_patente
      },
      neumaticos: {
        delantero_izquierdo: inspection.neumatico_delantero_izquierdo,
        delantero_derecho: inspection.neumatico_delantero_derecho,
        trasero_izquierdo: inspection.neumatico_trasero_izquierdo,
        trasero_derecho: inspection.neumatico_trasero_derecho,
        repuesto: inspection.neumatico_repuesto
      },
      dañosCarroceria: {
        lado_conductor: inspection.daño_lado_conductor,
        lado_pasajero: inspection.daño_lado_pasajero,
        lado_frontal: inspection.daño_lado_frontal,
        lado_posterior: inspection.daño_lado_posterior
      },
      
      cansado_fatigado: inspection.cansado_fatigado,
      dormido_lo_suficiente: inspection.dormido_lo_suficiente,
      consumo_alcohol: inspection.consumo_alcohol,
      consumo_drogas: inspection.consumo_drogas,
      consumo_medicamento: inspection.consumo_medicamento,
      estresado_preocupado: inspection.estresado_preocupado,
      problema_personal: inspection.problema_personal,
      condiciones_optimas: inspection.condiciones_optimas,

      asiento_ajustado: inspection.asiento_ajustado,
      espejos_posicionados: inspection.espejos_posicionados,
      volante_altura_correcta: inspection.volante_altura_correcta,
      pedales_distancia_correcta: inspection.pedales_distancia_correcta,
      postura_conduccion_comoda: inspection.postura_conduccion_comoda,
      visibilidad_adecuada: inspection.visibilidad_adecuada,
      controles_al_alcance: inspection.controles_al_alcance
    }
  })

  return formattedInspections
}
