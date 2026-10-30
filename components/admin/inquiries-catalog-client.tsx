'use client'

import React, { useState } from 'react'
import { markInquiryRead, deleteInquiry } from '@/app/admin/actions/inquiries'
import { Mail, Calendar, Trash2, CheckCircle2, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Inquiry {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  read: boolean
  createdAt: string
}

interface Props {
  initialInquiries: Inquiry[]
}

export default function InquiriesCatalogClient({ initialInquiries }: Props) {
  const router = useRouter()
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const handleToggleRead = async (id: string, currentRead: boolean) => {
    try {
      setUpdatingId(id)
      const res = await markInquiryRead(id, !currentRead)
      if (res.success) {
        setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, read: !currentRead } : inq))
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
    if (!confirm('Are you sure you want to delete this message log?')) return
    try {
      setUpdatingId(id)
      const res = await deleteInquiry(id)
      if (res.success) {
        setInquiries(prev => prev.filter(inq => inq.id !== id))
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-white">
      {inquiries.length === 0 ? (
        <div className="md:col-span-2 py-20 text-center text-white/45 bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl">
          No inquiries logged in marketing logs.
        </div>
      ) : (
        inquiries.map((inq) => (
          <div
            key={inq.id}
            className={`bg-[#0c0c0c] border rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-accent/30 transition-all shadow-sm ${
              inq.read ? 'border-[#1a1a1a] opacity-80' : 'border-accent/40 shadow-accent/5'
            }`}
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-bold text-xs text-accent">
                    {inq.name[0]?.toUpperCase()}
                  </div>
                  <div>
                    <span className="block font-bold text-xs text-white leading-none">{inq.name}</span>
                    <span className="text-[10px] text-white/45 flex items-center gap-1 mt-1">
                      <Mail className="w-3 h-3 text-white/30" /> {inq.email}
                    </span>
                  </div>
                </div>
                <span className="text-[9px] text-white/35 flex items-center gap-1 bg-[#121212] border border-[#1a1a1a] px-2.5 py-1 rounded-md">
                  <Calendar className="w-3.5 h-3.5 text-white/20" />
                  {new Date(inq.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              {inq.subject && (
                <div className="text-[9px] text-accent/80 font-bold uppercase tracking-wider mt-2 bg-accent/5 border border-accent/15 px-2.5 py-0.5 rounded-md inline-block">
                  Subject: {inq.subject}
                </div>
              )}
            </div>

            <div className="pt-2.5 border-t border-[#1a1a1a]">
              <p className="text-[11px] text-white/70 leading-relaxed font-sans whitespace-pre-wrap">
                {inq.message}
              </p>
            </div>

            <div className="pt-2.5 border-t border-[#1a1a1a] flex justify-between items-center">
              <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded border ${
                inq.read 
                  ? 'bg-white/5 text-white/45 border-[#1a1a1a]'
                  : 'bg-accent/15 text-accent border-accent/20 shadow-sm'
              }`}>
                {inq.read ? 'Read Log' : 'New Inquire'}
              </span>

              <div className="flex gap-1.5">
                <button
                  onClick={() => handleToggleRead(inq.id, inq.read)}
                  disabled={updatingId === inq.id}
                  className="p-1.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-[#1a1a1a] rounded-xl transition-all"
                  title={inq.read ? 'Mark Unread' : 'Mark Read'}
                >
                  {inq.read ? <Clock className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5 text-accent" />}
                </button>
                <button
                  onClick={() => handleDelete(inq.id)}
                  disabled={updatingId === inq.id}
                  className="p-1.5 bg-white/5 hover:bg-rose-500/10 text-white/60 hover:text-rose-400 border border-[#1a1a1a] rounded-xl transition-all"
                  title="Delete Inquire"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
