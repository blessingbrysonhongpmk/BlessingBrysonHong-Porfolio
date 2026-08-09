import './NotFound.css';

export function NotFound({ onReturnHome }) {
  return (
    <div className="not-found">
      <div className="not-found__content">
        <span className="not-found__code">404</span>
        <h1 className="not-found__title">Coordinate Not Found</h1>
        <p className="not-found__desc">
          The requested system node does not exist in this network.
        </p>
        <button
          className="not-found__btn"
          onClick={() => {
            if (onReturnHome) {
              onReturnHome();
            } else {
              window.location.href = '/';
            }
          }}
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
