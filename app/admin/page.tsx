import React from 'react'
import { db } from '@/lib/mongodb'
import { normalizeDoc } from '@/lib/db-helpers'
import { Calendar, Package, Clock, AlertCircle, DollarSign, Users, ArrowUpRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const tomorrowStart = new Date(todayStart)
  tomorrowStart.setDate(tomorrowStart.getDate() + 1)

  const [
    totalBookingsCount,
    todaysBookingsCount,
    pendingBookingsCount,
    rawRecentBookings,
    paidBookings,
    distinctCustomers,
  ] = await Promise.all([
    db.collection('bookings').countDocuments(),
    db.collection('bookings').countDocuments({ createdAt: { $gte: todayStart, $lt: tomorrowStart } }),
    db.collection('bookings').countDocuments({ status: 'PENDING' }),
    db.collection('bookings').find({}).sort({ createdAt: -1 }).limit(5).toArray(),
    db.collection('bookings').find({ status: { $in: ['CONFIRMED', 'IN_PROGRESS', 'COMPLETED'] } }).toArray(),
    db.collection('bookings').distinct('email'),
  ])

  const totalRevenue = paidBookings.reduce((sum, b) => sum + (b.startingPrice || b.price || 0), 0)
  const newCustomersCount = distinctCustomers.length
  const popularPackageName = 'Master Suites & Joinery'

  const recentBookings = rawRecentBookings.map(b => {
    const norm = normalizeDoc(b)
    return {
      id: norm.id,
      customerName: norm.customerName,
      packageTitle: norm.packageTitle || norm.package?.title || 'Turnkey Consultation',
      preferredDate: norm.preferredDate,
      preferredTime: norm.preferredTime,
      status: norm.status || 'PENDING',
    }
  })

  const cardsData = [
    {
      title: 'Total Consultations',
      value: totalBookingsCount,
      desc: 'Accumulated client consultation requests',
      icon: Calendar,
      accentClass: 'text-accent border-accent/20 bg-accent/5',
      iconClass: 'text-accent',
    },
    {
      title: "Today's Inquiries",
      value: todaysBookingsCount,
      desc: 'New consultations scheduled today',
      icon: Clock,
      accentClass: 'text-accent border-accent/20 bg-accent/5',
      iconClass: 'text-accent',
    },
    {
      title: 'Pending Reviews',
      value: pendingBookingsCount,
      desc: 'Requires immediate architect follow-up',
      icon: AlertCircle,
      accentClass: 'text-amber-500 border-amber-500/20 bg-amber-500/5',
      valueClass: 'text-amber-500',
      iconClass: 'text-amber-500',
    },
    {
      title: 'Estimated Pipeline',
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
      desc: 'Confirmed & in-progress contracts',
      icon: DollarSign,
      accentClass: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5',
      valueClass: 'text-emerald-500',
      iconClass: 'text-emerald-500',
    },
    {
      title: 'Popular Package',
      value: popularPackageName,
      desc: 'Top booked turnkey package',
      icon: Package,
      accentClass: 'text-accent border-accent/20 bg-accent/5',
      valueClass: 'text-sm font-serif line-clamp-1',
      iconClass: 'text-accent',
    },
    {
      title: 'Unique Clients',
      value: newCustomersCount,
      desc: 'Registered client directories',
      icon: Users,
      accentClass: 'text-accent border-accent/20 bg-accent/5',
      iconClass: 'text-accent',
    },
  ]

  return (
    <div className="space-y-8 animate-fade-in text-foreground">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif tracking-widest uppercase text-foreground">
            Executive Dashboard
          </h2>
          <p className="text-xs text-muted-foreground mt-1 font-medium tracking-wide">
            Operational status metrics &amp; studio consultations.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest bg-accent/10 text-accent border border-accent/20 px-3.5 py-1.5 rounded-full w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          Live Portal Active
        </div>
      </div>

      {/* Analytics widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardsData.map((card, idx) => {
          const Icon = card.icon
          return (
            <div 
              key={idx} 
              className="group bg-card border border-border/80 hover:border-accent/40 rounded-2xl p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <div className="space-y-2 max-w-[70%]">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-muted-foreground block">
                  {card.title}
                </span>
                <span className={`text-2xl font-serif font-bold tracking-wide block ${card.valueClass || 'text-foreground'}`}>
                  {card.value}
                </span>
                <span className="text-[10px] text-muted-foreground/85 block leading-normal">
                  {card.desc}
                </span>
              </div>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${card.accentClass}`}>
                <Icon className={`w-5 h-5 ${card.iconClass}`} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-card border border-border/85 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-foreground">
              Recent Consultations
            </h3>
            <p className="text-[10px] text-muted-foreground mt-1">
              Last 5 design booking logs registered in real-time.
            </p>
          </div>
          <button className="text-[10px] font-extrabold uppercase tracking-widest text-accent hover:text-accent/80 flex items-center gap-1 transition-colors">
            View All <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border/40">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/40 border-b border-border/60 text-[9px] uppercase tracking-widest text-muted-foreground">
                <th className="p-4 font-bold">Client Name</th>
                <th className="p-4 font-bold">Curated Package</th>
                <th className="p-4 font-bold">Scheduled DateTime</th>
                <th className="p-4 font-bold text-right">Current Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-[11px]">
              {recentBookings.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground font-medium">
                    No consultation logs registered yet.
                  </td>
                </tr>
              ) : (
                recentBookings.map((b) => {
                  let statusColor = 'bg-accent/10 text-accent border-accent/20'
                  if (b.status === 'PENDING') statusColor = 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                  if (b.status === 'COMPLETED') statusColor = 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                  if (b.status === 'CANCELLED') statusColor = 'bg-rose-500/10 text-rose-500 border-rose-500/20'

                  return (
                    <tr key={b.id} className="hover:bg-muted/10 transition-colors">
                      <td className="p-4 font-bold text-foreground">{b.customerName}</td>
                      <td className="p-4 text-muted-foreground font-medium">{b.packageTitle}</td>
                      <td className="p-4 text-muted-foreground">
                        {new Date(b.preferredDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} at {b.preferredTime}
                      </td>
                      <td className="p-4 text-right">
                        <span className={`inline-block px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider border rounded-full ${statusColor}`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
