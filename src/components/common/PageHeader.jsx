import Ornament from './Ornament'

/**
 * Coloured hero banner used at the top of inner pages.
 * gradientClass: a Tailwind bg-*-gradient utility
 */
export default function PageHeader({ title, subtitle, gradientClass = 'bg-espresso-gradient', ornamentColor = 'text-gold-400', textColor = 'text-gold-100', subColor = 'text-gold-300' }) {
  return (
    <div className={`${gradientClass} page-header`}>
      <Ornament color={ornamentColor} />
      <h1 className={`${textColor} text-5xl font-light mt-2 italic font-serif`}>{title}</h1>
      {subtitle && (
        <p className={`font-sans ${subColor} text-xs tracking-[3px] mt-2 uppercase`}>{subtitle}</p>
      )}
    </div>
  )
}
