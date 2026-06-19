import { LEGAL } from '../../config/legal'

function parseSectionTitle(title) {
  const match = title.match(/^(\d+(?:\.\d+)?)\s+(.+)$/)
  if (match) return { number: match[1], label: match[2] }
  return { number: null, label: title }
}

export function LegalPageShell({ title, intro, children }) {
  return (
    <main className="pt-28 pb-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
            {title}
          </h1>
          <div className="text-slate-600 mt-5 max-w-3xl text-base leading-relaxed">{intro}</div>
          <p className="text-slate-500 text-sm mt-5">Son güncelleme: {LEGAL.lastUpdated}</p>
        </header>
        <div className="space-y-8">{children}</div>
      </div>
    </main>
  )
}

export function LegalSection({ title, children }) {
  const { number, label } = parseSectionTitle(title)

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="font-display text-xl font-semibold text-slate-900 leading-snug">
        {number ? (
          <span className="inline-flex flex-wrap items-baseline gap-x-3">
            <span className="tabular-nums text-slate-500 shrink-0">{number}</span>
            <span>{label}</span>
          </span>
        ) : (
          label
        )}
      </h2>
      <div className="mt-6 text-slate-600 text-base leading-relaxed [&_p+p]:mt-4 [&_ul]:mt-4 [&_ul]:space-y-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:space-y-3 [&_ol]:list-decimal [&_ol]:pl-6">
        {children}
      </div>
    </section>
  )
}

export function LegalTable({ columns, rows, rowKey }) {
  return (
    <div className="mt-2 overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200">
            {columns.map((col) => (
              <th key={col} className="py-4 pr-5 font-semibold text-slate-900">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[rowKey]} className="border-b border-slate-100 align-top">
              {Object.values(row).map((cell, i) => (
                <td
                  key={i}
                  className={`py-4 pr-5 leading-relaxed ${i === 0 ? 'text-slate-900 font-medium' : 'text-slate-600'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function LegalDefinitionList({ items }) {
  return (
    <dl className="space-y-5">
      {items.map(({ label, value }) => (
        <div key={label}>
          <dt className="font-semibold text-slate-900 mb-1">{label}</dt>
          <dd className="leading-relaxed">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
