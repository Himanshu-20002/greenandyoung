'use client'

import React, { useState, useEffect } from 'react'
import { updateAppointmentStatusAction, deleteAppointmentAction } from '@/app/admin/actions/appointments'
import { Calendar, Phone, Mail, User, ShieldAlert, RefreshCw, Search, Trash2 } from 'lucide-react'

interface Appointment {
  id: string
  name: string
  phone: string
  email: string | null
  service: string
  date: string
  time: string
  message: string | null
  status: string
  createdAt: string
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  async function loadAppointments() {
    try {
      setLoading(true)
      const res = await fetch('/api/appointments')
      if (res.ok) {
        const data = await res.json()
        setAppointments(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAppointments()
  }, [])

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      setUpdatingId(id)
      const res = await updateAppointmentStatusAction(id, newStatus)
      if (res.success) {
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a))
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
    if (!confirm('Are you sure you want to delete this appointment log?')) return
    try {
      setUpdatingId(id)
      const res = await deleteAppointmentAction(id)
      if (res.success) {
        setAppointments(prev => prev.filter(a => a.id !== id))
      } else {
        alert(res.error)
      }
    } catch (err: any) {
      alert(err.message)
    } finally {
      setUpdatingId(null)
    }
  }

  const filtered = appointments.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || 
                          a.service.toLowerCase().includes(search.toLowerCase()) ||
                          a.phone.includes(search)
    const matchesStatus = statusFilter === 'ALL' || a.status.toUpperCase() === statusFilter.toUpperCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 text-foreground">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold font-serif tracking-widest uppercase">Appointment Leads</h2>
          <p className="text-[10px] opacity-60 mt-1">Manage and track customer appointment requests submitted via the home form.</p>
        </div>
        <button
          onClick={loadAppointments}
          className="p-2 border border-border rounded-xl hover:bg-foreground/5 transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="w-4 h-4 opacity-50 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by customer name, phone, or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-accent/40"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-card border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-accent/40 cursor-pointer"
        >
          <option value="ALL">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="py-20 text-center opacity-60 text-xs">Loading appointments...</div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center opacity-60 bg-card border border-border rounded-2xl text-xs">
          No appointments matches filters.
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-md transition-colors duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-[9px] uppercase tracking-widest opacity-60 bg-foreground/5">
                  <th className="p-4 font-bold">Customer</th>
                  <th className="p-4 font-bold">Phone</th>
                  <th className="p-4 font-bold">Email</th>
                  <th className="p-4 font-bold">Service</th>
                  <th className="p-4 font-bold">Date & Time</th>
                  <th className="p-4 font-bold">Message</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-[11px] opacity-90">
                {filtered.map((a) => (
                  <tr key={a.id} className="hover:bg-foreground/5 transition-all">
                    <td className="p-4 font-bold">
                      {a.name}
                    </td>
                    <td className="p-4 opacity-75">
                      {a.phone}
                    </td>
                    <td className="p-4 opacity-75">
                      {a.email || '-'}
                    </td>
                    <td className="p-4 font-medium text-accent">
                      {a.service}
                    </td>
                    <td className="p-4">
                      <span className="block font-medium">{new Date(a.date).toLocaleDateString()}</span>
                      <span className="block text-[9px] text-accent tracking-wider font-bold mt-0.5">{a.time}</span>
                    </td>
                    <td className="p-4 max-w-xs truncate" title={a.message || ''}>
                      {a.message || '-'}
                    </td>
                    <td className="p-4">
                      {updatingId === a.id ? (
                        <span className="text-[10px] opacity-50 font-bold uppercase">Updating...</span>
                      ) : (
                        <select
                          value={a.status}
                          onChange={(e) => handleStatusChange(a.id, e.target.value)}
                          className="bg-background border border-border rounded-lg px-2.5 py-1 text-xs text-foreground focus:outline-none focus:border-accent/40 cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(a.id)}
                        disabled={updatingId === a.id}
                        className="p-1.5 bg-foreground/5 hover:bg-rose-500/10 text-foreground/60 hover:text-rose-500 border border-border rounded-xl transition-all cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
