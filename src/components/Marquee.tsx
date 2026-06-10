const items = [
  'Open-Endedness',
  'LLM Reasoning',
  'In-Context RL',
  'Llama 3',
  'Rainbow Teaming',
  'GFlowNets',
];

export default function Marquee() {
  const strip = items.map((t, i) => (
    <span key={i} className="marquee-item">
      {t} <span aria-hidden="true">✺</span>{' '}
    </span>
  ));

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {strip}
        {strip}
        {strip}
      </div>
    </div>
  );
}
