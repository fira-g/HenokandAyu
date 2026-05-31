/**
 * Inline success confirmation banner.
 */
export default function AlertSuccess({ message }) {
  return (
    <div className="alert-success">
      <p className="font-sans text-green-700 text-sm">{message}</p>
    </div>
  )
}
