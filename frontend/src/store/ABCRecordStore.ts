import { create } from "zustand"
import type { AbcRecord } from "@Types/types"

type AbcRecordStore = {
  records: AbcRecord[]
  addRecord: (r: { name: string; description: string }) => void
  updateRecord: (id: string, patch: Partial<Omit<AbcRecord, "id">>) => void
  deleteRecord: (id: string) => void
}

export const useAbcRecordStore = create<AbcRecordStore>((set) => ({
  records: [],

  addRecord: (r) =>
    set((s) => ({
      records: [
        {
          ...r,
          id: `abc${Date.now()}`,
          createdAt: new Date().toISOString().slice(0, 10),
          updatedAt: new Date().toISOString().slice(0, 10),
        },
        ...s.records,
      ],
    })),

  updateRecord: (id, patch) =>
    set((s) => ({
      records: s.records.map((r) =>
        r.id === id
          ? { ...r, ...patch, updatedAt: new Date().toISOString().slice(0, 10) }
          : r
      ),
    })),

  deleteRecord: (id) =>
    set((s) => ({ records: s.records.filter((r) => r.id !== id) })),
}))