import { z } from 'zod'

const yesNoEnum = z.enum(['si', 'no'], {
  required_error: 'Este campo es obligatorio'
})

const goodBadEnum = z.enum(['En buen estado', 'En mal estado'], {
  required_error: 'Este campo es obligatorio'
})

export const formSchema = z.object({
  nombre_conductor: z.string().min(1, 'El nombre del conductor es obligatorio'),
  nombre_supervisor: z
    .string()
    .min(1, 'El nombre del supervisor o APR es obligatorio'),
  patente_vehiculo: z.string().min(1, 'La patente es obligatoria'),
  km_actual: z
    .string()
    .min(1, 'La cantidad de kilómetros debe ser mayor que 0'),
  km_mantencion: z.string().optional(),

  // Documentos al día
  documentos: z.object({
    licencia: yesNoEnum,
    permiso_circulacion: yesNoEnum,
    revision_tecnica: yesNoEnum,
    soap: yesNoEnum,
    mantencion: yesNoEnum
  }),

  // Estado de las luces
  estadoLuces: z.object({
    luces_intermitentes_derecha: goodBadEnum,
    luces_intermitentes_izquierda: goodBadEnum,
    luces_freno: goodBadEnum,
    luces_retroceso: goodBadEnum,
    luces_emergencia: goodBadEnum,
    luces_altas: goodBadEnum,
    luces_bajas: goodBadEnum,
    neblineros_bajos: goodBadEnum,
    luces_tablero: goodBadEnum,
    luz_interior: goodBadEnum
  }),

  // Estado de vidrios y espejos
  estadoEspejos: z.object({
    parabrisas_delantero: yesNoEnum,
    parabrisas_trasero: yesNoEnum,
    plumillas_limpiaBrisas: yesNoEnum,
    alza_vidrio_delantero: yesNoEnum,
    alza_vidrio_trasero: yesNoEnum,
    retrovisor_interior: yesNoEnum,
    espejo_retrovisor_derecho: yesNoEnum,
    espejo_retrovisor_izquierdo: yesNoEnum,
    manillas_alza_vidrios: yesNoEnum
  }),

  // Estado de equipo de seguridad
  equipoSeguridad: z.object({
    triangulos: goodBadEnum,
    botiquin: goodBadEnum,
    cinturones: goodBadEnum,
    baliza: goodBadEnum,
    cadena_de_seguridad: goodBadEnum,
    cierre_centralizado: goodBadEnum,
    cuñas: goodBadEnum,
    extintores: goodBadEnum,
    gata: goodBadEnum,
    llave_de_rueda: goodBadEnum,
    kit_extensiones: goodBadEnum,
    barra_antivuelco: goodBadEnum,
    chaleco_reflectante: goodBadEnum,
    traba_volante: goodBadEnum,
    sistema_bloqueo_de_rueda: goodBadEnum
  }),

  // Niveles
  niveles: z.object({
    nivel_agua_parabrisas: goodBadEnum,
    nivel_agua_refrigerante: goodBadEnum,
    nivel_aceite: goodBadEnum,
    nivel_liquido_de_frenos: goodBadEnum
  }),

  // Otros
  otros: z.object({
    sistema_calefaccion: goodBadEnum,
    aire_acondicionado: goodBadEnum,
    freno_mano: goodBadEnum,
    condiciones_asientos: goodBadEnum,
    apoyo_cabeza_ajustable: goodBadEnum,
    radio_estereo: goodBadEnum,
    bocina: goodBadEnum,
    alarma_sonora_retroceso: goodBadEnum,
    orden_limpieza: goodBadEnum,
    estado_patente: goodBadEnum
  }),

  // Inspección visual de los neumáticos
  neumaticos: z.object({
    neumatico_delantero_izquierdo: goodBadEnum,
    neumatico_delantero_derecho: goodBadEnum,
    neumatico_trasero_izquierdo: goodBadEnum,
    neumatico_trasero_derecho: goodBadEnum,
    neumatico_repuesto: goodBadEnum
  }),

  // Daños en carrocería
  dañosCarroceria: z.object({
    lado_conductor: yesNoEnum,
    lado_pasajero: yesNoEnum,
    lado_frontal: yesNoEnum,
    lado_posterior: yesNoEnum
  }),

  // Control fatiga
  fatigueQuestions: z.object({
    cansado_fatigado: yesNoEnum,
    dormido_lo_suficiente: yesNoEnum,
    consumo_alcohol: yesNoEnum,
    consumo_drogas: yesNoEnum,
    consumo_medicamento: yesNoEnum,
    estresado_preocupado: yesNoEnum,
    problema_personal: yesNoEnum,
    condiciones_optimas: yesNoEnum
  }),

  // Control ergonomía
  ergonomicsQuestions: z.object({
    asiento_ajustado: yesNoEnum,
    espejos_posicionados: yesNoEnum,
    volante_altura_correcta: yesNoEnum,
    pedales_distancia_correcta: yesNoEnum,
    postura_conduccion_comoda: yesNoEnum,
    visibilidad_adecuada: yesNoEnum,
    controles_al_alcance: yesNoEnum
  })
})
