import { NavLink, useLocation } from 'react-router-dom'
import { NAV_ROUTES } from '@/constants'

export default function BottomNav() {
  const { pathname } = useLocation()

  return (
    <nav className="sticky bottom-0 flex bg-cream/95 backdrop-blur-md border-t border-gold-200 z-50">
      {NAV_ROUTES.map((route) => {
        const active = pathname === route.path
        return (
          <NavLink
            key={route.id}
            to={route.path}
            className="nav-btn"
          >
            <span className="text-xl leading-none">{route.icon}</span>
            <span
              className={`font-sans text-[10px] tracking-widest uppercase transition-colors duration-200 ${
                active ? 'text-gold-500 font-medium' : 'text-gold-600'
              }`}
            >
              {route.label}
            </span>
            {active && (
              <span className="w-4 h-0.5 bg-gold-400 rounded-full mt-0.5" />
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}
