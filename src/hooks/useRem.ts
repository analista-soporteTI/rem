'use client'

import { Rem } from '@/types/rem'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type RemId = string

interface RemsState {
  rems: Record<RemId, Rem>
  pinnedRems: Set<RemId>
}

interface RemsActions {
  addRems: (rems: Rem[]) => void
  updateRem: (rem: Rem) => void
  removeRem: (remId: RemId) => void
  clearRems: () => void
  setRems: (rems: Rem[]) => void
  pinRem: (remId: RemId) => void
  unpinRem: (remId: RemId) => void
  isPinned: (remId: RemId) => boolean
  getAllRems: () => Rem[]
  getPinnedRems: () => Rem[]
}

const useRemsStore = create<RemsState & RemsActions>()(
  persist(
    (set, get) => ({
      rems: {},
      pinnedRems: new Set<RemId>(),

      addRems: newRems =>
        set(state => ({
          rems: {
            ...state.rems,
            ...newRems.reduce((acc, rem) => {
              if (!state.rems[rem.rem_code]) {
                acc[rem.rem_code] = rem
              }
              return acc
            }, {} as Record<RemId, Rem>)
          }
        })),

      updateRem: rem =>
        set(state => ({
          rems: {
            ...state.rems,
            [rem.rem_code]: {
              ...state.rems[rem.rem_code],
              ...rem
            }
          }
        })),

      removeRem: remId =>
        set(state => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [remId]: _, ...rest } = state.rems
          const newPinnedRems = new Set(state.pinnedRems)
          newPinnedRems.delete(remId)
          return { rems: rest, pinnedRems: newPinnedRems }
        }),

      clearRems: () => set({ rems: {}, pinnedRems: new Set<RemId>() }),

      setRems: rems =>
        set({
          rems: rems.reduce((acc, rem) => {
            acc[rem.rem_code] = rem
            return acc
          }, {} as Record<RemId, Rem>)
        }),

      pinRem: remId =>
        set(state => ({
          pinnedRems: new Set(state.pinnedRems).add(remId)
        })),

      unpinRem: remId =>
        set(state => {
          const newPinnedRems = new Set(state.pinnedRems)
          newPinnedRems.delete(remId)
          return { pinnedRems: newPinnedRems }
        }),

      isPinned: remId => get().pinnedRems.has(remId),

      getAllRems: () => Object.values(get().rems),

      getPinnedRems: () => {
        const { rems, pinnedRems } = get()
        return Array.from(pinnedRems)
          .map(id => rems[id])
          .filter(Boolean)
      }
    }),
    {
      name: 'rems-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        rems: state.rems,
        pinnedRems: Array.from(state.pinnedRems)
      }),
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        ...persistedState,
        pinnedRems: new Set(persistedState.pinnedRems || [])
      })
    }
  )
)

export const useRems = () => {
  const store = useRemsStore()
  return {
    rems: store.getAllRems(),
    pinnedRems: store.getPinnedRems(),
    addRems: store.addRems,
    updateRem: store.updateRem,
    removeRem: store.removeRem,
    clearRems: store.clearRems,
    setRems: store.setRems,
    pinRem: store.pinRem,
    unpinRem: store.unpinRem,
    isPinned: store.isPinned
  }
}
