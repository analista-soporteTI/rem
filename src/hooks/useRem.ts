'use client'

import { Rem } from '@/types/rem'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

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
    immer((set, get) => ({
      rems: {},
      pinnedRems: new Set<RemId>(),

      addRems: newRems =>
        set(state => {
          newRems.forEach(rem => {
            if (!state.rems[rem.rem_code]) {
              state.rems[rem.rem_code] = rem
            }
          })
        }),

      updateRem: rem =>
        set(state => {
          if (state.rems[rem.rem_code]) {
            state.rems[rem.rem_code] = { ...state.rems[rem.rem_code], ...rem }
          }
        }),

      removeRem: remId =>
        set(state => {
          delete state.rems[remId]
          state.pinnedRems.delete(remId)
        }),

      clearRems: () =>
        set(state => {
          state.rems = {}
          state.pinnedRems.clear()
        }),

      setRems: rems =>
        set(state => {
          state.rems = rems.reduce((acc, rem) => {
            acc[rem.rem_code] = rem
            return acc
          }, {} as Record<RemId, Rem>)
        }),

      pinRem: remId =>
        set(state => {
          state.pinnedRems.add(remId)
        }),

      unpinRem: remId =>
        set(state => {
          state.pinnedRems.delete(remId)
        }),

      isPinned: remId => get().pinnedRems.has(remId),

      getAllRems: () => Object.values(get().rems),

      getPinnedRems: () => {
        const { rems, pinnedRems } = get()
        return Array.from(pinnedRems)
          .map(id => rems[id])
          .filter(Boolean)
      }
    })),
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
        pinnedRems: new Set(persistedState.pinnedRems)
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
