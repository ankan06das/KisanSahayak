import React from "react";
import Predictions from "./Predictions.jsx"

function PredictionsPage() {
  let [isClicked, setIsClicked]=React.useState(false);
  const LoadPrediction=()=>{
    if(isClicked){
      return <Predictions/>;
    }
  }
  return (
      <>
        <button onClick={()=>setIsClicked(true)} className="primary-button-new">Predict</button>
        {LoadPrediction()}
      </>
  );
}

export default PredictionsPage;