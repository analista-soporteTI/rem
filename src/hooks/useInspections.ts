'use client'

import { create } from 'zustand'

type InspectionId = string

interface InspectionsState {
  inspections: Record<InspectionId, any>
  pinnedInspections: Set<InspectionId>
}

interface InspectionsActions {
  addInspections: (inspections: any[]) => void
  updateInspection: (inspection: any) => void
  removeInspection: (inspectionId: InspectionId) => void
  clearInspections: () => void
  setInspections: (inspections: any[]) => void
  pinInspection: (inspectionId: InspectionId) => void
  unpinInspection: (inspectionId: InspectionId) => void
  isPinned: (inspectionId: InspectionId) => boolean
  getAllInspections: () => any[]
  getPinnedInspections: () => any[]
}

const useInspectionsStore = create<InspectionsState & InspectionsActions>()(
  (set, get) => ({
    inspections: {},
    pinnedInspections: new Set<InspectionId>(),

    addInspections: newInspections =>
      set(state => ({
        inspections: {
          ...state.inspections,
          ...newInspections.reduce((acc, inspection) => {
            if (!state.inspections[inspection.id]) {
              acc[inspection.id] = inspection
            }
            return acc
          }, {} as Record<InspectionId, any>)
        }
      })),

    updateInspection: inspection =>
      set(state => ({
        inspections: {
          ...state.inspections,
          [inspection.id]: {
            ...state.inspections[inspection.id],
            ...inspection
          }
        }
      })),

    removeInspection: inspectionId =>
      set(state => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [inspectionId]: _, ...rest } = state.inspections
        const newPinnedInspections = new Set(state.pinnedInspections)
        newPinnedInspections.delete(inspectionId)
        return { inspections: rest, pinnedInspections: newPinnedInspections }
      }),

    clearInspections: () =>
      set({ inspections: {}, pinnedInspections: new Set<InspectionId>() }),

    setInspections: inspections =>
      set({
        inspections: inspections.reduce((acc, inspection) => {
          acc[inspection.id] = inspection
          return acc
        }, {} as Record<InspectionId, any>)
      }),

    pinInspection: inspectionId =>
      set(state => ({
        pinnedInspections: new Set(state.pinnedInspections).add(inspectionId)
      })),

    unpinInspection: inspectionId =>
      set(state => {
        const newPinnedInspections = new Set(state.pinnedInspections)
        newPinnedInspections.delete(inspectionId)
        return { pinnedInspections: newPinnedInspections }
      }),

    isPinned: inspectionId => get().pinnedInspections.has(inspectionId),

    getAllInspections: () => Object.values(get().inspections),

    getPinnedInspections: () => {
      const { inspections, pinnedInspections } = get()
      return Array.from(pinnedInspections)
        .map(id => inspections[id])
        .filter(Boolean)
    }
  })
)

export const useInspections = () => {
  const store = useInspectionsStore()
  return {
    inspections: store.getAllInspections(),
    pinnedInspections: store.getPinnedInspections(),
    addInspections: store.addInspections,
    updateInspection: store.updateInspection,
    removeInspection: store.removeInspection,
    clearInspections: store.clearInspections,
    setInspections: store.setInspections,
    pinInspection: store.pinInspection,
    unpinInspection: store.unpinInspection,
    isPinned: store.isPinned
  }
}
