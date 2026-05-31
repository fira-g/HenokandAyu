import Ornament from './Ornament'

/**
 * Reusable section heading with ornament and optional subtitle.
 */
export default function SectionTitle({ title, subtitle, center = true, light = false, ornament = true }) {
  return (
    <div className={center ? 'text-center' : ''}>
      {ornament && <Ornament color={light ? 'text-gold-300' : 'text-gold-400'} />}
      <h2 className={`section-title mt-4 mb-2 ${light ? 'text-gold-100' : 'text-espresso'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`font-sans italic text-base ${light ? 'text-gold-300' : 'text-gold-400'}`}>
          {subtitle}
        </p>
      )}
      <div className={`w-10 h-px mx-auto mt-4 ${light ? 'bg-gold-300' : 'bg-gold-400'}`} />
    </div>
  )
}
