export default function InterestMotion({kind}: {kind: string}) {
  return <svg className={'interest-vector vector-'+kind} viewBox="0 0 160 130" fill="none" aria-hidden="true" focusable="false">
    {kind === 'screen' ? <>
      <rect className="vector-paper" x="36" y="55" width="90" height="54" rx="5"/>
      <path className="vector-ink" d="M47 74h65M47 88h45M47 101h25"/>
      <g className="vector-clap-lid"><rect className="vector-dark" x="36" y="40" width="90" height="15" rx="2"/><path className="vector-cutouts" d="M48 40h14L49 55H36ZM76 40h14L77 55H63ZM104 40h14l-13 15H91Z"/></g>
      <rect className="vector-accent" x="33" y="52" width="7" height="7" rx="1"/>
    </> : kind === 'spark' ? <>
      <path className="vector-paper" d="M34 28h64a7 7 0 017 7v70H43a9 9 0 01-9-9Z"/>
      <path className="vector-ink" d="M43 28v77M55 48h34M55 62h27M55 76h32"/>
      <g className="vector-book-page"><path className="vector-paper" d="M80 23c14-4 30 0 43 8v74c-14-8-28-10-43-7Z"/><path className="vector-ink" d="m91 43 20 6M91 57l20 6M91 71l15 5"/></g>
    </> : kind === 'culture' ? <>
      <rect className="vector-paper" x="33" y="23" width="94" height="84" rx="3"/>
      <path className="vector-threads" d="M48 31v68M64 31v68M80 31v68M96 31v68M112 31v68M41 41h78M41 57h78M41 73h78M41 89h78"/>
      <path className="vector-weave" d="M41 41h22v16h18V41h22v16h16M41 73h22V57h18v16h22V57h16M41 89h22V73h18v16h22V73h16"/>
    </> : <>
      <path className="vector-connection" d="M44 92h72M44 92 80 42l36 50"/>
      <g className="vector-person"><circle className="vector-paper" cx="80" cy="33" r="11"/><path className="vector-paper" d="M60 66a20 20 0 0140 0Z"/></g>
      <g className="vector-person"><circle className="vector-paper" cx="40" cy="79" r="10"/><path className="vector-paper" d="M22 110a18 18 0 0136 0Z"/></g>
      <g className="vector-person"><circle className="vector-paper" cx="120" cy="79" r="10"/><path className="vector-paper" d="M102 110a18 18 0 0136 0Z"/></g>
    </>}
  </svg>;
}
