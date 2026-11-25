import { useApp } from '../utils/context';

export default function IdentityStage() {
  const { c } = useApp();

  return (
    <figure className="portfolio-visual">
      <div className="portfolio-visual-stage" aria-hidden="true">
        <div className="portfolio-visual-grid" />
        <span className="portfolio-visual-orbit" />
        <span className="portfolio-smiley">
          <span className="portfolio-smiley-eyes" />
          <span className="portfolio-smiley-mouth" />
        </span>
      </div>
      <figcaption>
        <strong>{c.heroMeta}</strong>
        <span>{c.heroUniversity}</span>
      </figcaption>
    </figure>
  );
}
