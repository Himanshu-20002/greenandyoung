'use client'

import React, { useState } from 'react'
import { toggleSubscriberActive, deleteSubscriber } from '@/app/admin/actions/newsletter'
import { Trash2, Mail, Calendar, Power } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Subscriber {
  id: string
  email: string
  active: boolean
  createdAt: string
}

interface Props {
  initialSubscribers: Subscriber[]
}

export default function NewsletterCatalogClient({ initialSubscribers }: Props) {
  const router = useRouter()
  const [subs, setSubs] = useState<Subscriber[]>(initialSubscribers)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const handleToggle = async (id: string, currentActive: boolean) => {
    try {
      setUpdatingId(id)
      const res = await toggleSubscriberActive(id, !currentActive)
      if (res.success) {
        setSubs(prev => prev.map(s => s.id === id ? { ...s, active: !currentActive } : s))
        router.refresh()
      } else {
        alert(res.error)
      }
    } catch (err: any) {
      alert(err.message)
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) return
    try {
      setUpdatingId(id)
      const res = await deleteSubscriber(id)
      if (res.success) {
        setSubs(prev => prev.filter(s => s.id !== id))
        router.refresh()
      } else {
        alert(res.error)
      }
    } catch (err: any) {
      alert(err.message)
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl overflow-hidden shadow text-xs text-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1a1a1a] text-[9px] uppercase tracking-widest text-white/45 bg-[#121212]/40">
              <th className="p-4 font-bold">Subscriber Address</th>
              <th className="p-4 font-bold">Subscribed Date</th>
              <th className="p-4 font-bold">Subscription Status</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a] text-[11px] text-white/80">
            {subs.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-white/45">No subscriber logs found.</td>
              </tr>
            ) : (
              subs.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.01] transition-all">
                  <td className="p-4 font-bold text-white flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-accent" />
                    {s.email}
                  </td>
                  <td className="p-4 text-white/60">
                    <Calendar className="w-3.5 h-3.5 inline mr-1 text-white/20" />
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-widest rounded border ${
                      s.active 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/15'
                    }`}>
                      {s.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {updatingId === s.id ? (
                      <span className="text-[10px] text-white/30 font-bold uppercase">Saving...</span>
                    ) : (
                      <div className="inline-flex gap-1.5">
                        <button
                          onClick={() => handleToggle(s.id, s.active)}
                          className="p-1.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-[#1a1a1a] rounded transition-all"
                          title={s.active ? 'Deactivate Subscription' : 'Activate Subscription'}
                        >
                          <Power className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="p-1.5 bg-white/5 hover:bg-rose-500/10 text-white/60 hover:text-rose-400 border border-[#1a1a1a] rounded transition-all"
                          title="Delete Subscriber"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
