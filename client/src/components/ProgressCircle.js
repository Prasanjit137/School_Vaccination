import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressCircle = ({ percentage, vaccinatedCount, totalStudents }) => (
  <div className="card shadow-sm border-0 rounded-4 p-4 text-center">
    <h4 className="text-primary fw-semibold mb-4">
      <i className="bi bi-pie-chart-fill me-2"></i>Vaccination Progress
    </h4>
    <div style={{ width: 200, height: 200, margin: '0 auto' }}>
      <CircularProgressbar
        value={percentage}
        text={`${vaccinatedCount} / ${totalStudents}`}
        styles={buildStyles({
          pathColor: `url(#gradient)`,
          textColor: '#212529',
          trailColor: '#eee',
          strokeLinecap: 'round',
          textSize: '16px',
        })}
      />
      {/* Gradient Definition */}
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4caf50" />
            <stop offset="100%" stopColor="#81c784" />
          </linearGradient>
        </defs>
      </svg>
    </div>

  </div>
);

export default ProgressCircle;