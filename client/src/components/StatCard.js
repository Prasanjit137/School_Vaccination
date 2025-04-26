const StatCard = ({ title, value }) => (
  <div className="col-md-4 mb-4">
    <div className="card shadow-sm border-0 rounded-4 text-center p-4 bg-white h-100">
      <h6 className="text-muted text-uppercase mb-2">{title}</h6>
      <h2 className="text-primary fw-bold">{value}</h2>
    </div>
  </div>
);

export default StatCard;