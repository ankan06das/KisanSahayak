function Predictions(data) {
  return (
      <>
        <div className="work-section-info">
            <p>Disease: {data.disease}</p>
            <p>Description: {data.disease_details.map((el, _idx) => (
                <span key={_idx}>{el}&nbsp;</span>
            ))}</p>
            <div>
              <p>Recommendation:</p>
              <ul>
                {data.recomm.map((el, _idx) => (
                  <li key={_idx}>{el}</li>
                ))}
              </ul>
            </div>
            <div>
              <p>Pesticides:</p>
              <ul>
                {data.pesticides.map((el, _idx) => (
                  <li key={_idx}>{el}</li>
                ))}
              </ul>
            </div>
        </div>
      </>
  );
}

export default Predictions;