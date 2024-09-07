import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import useGetPredictions from "../hooks/useGetPredictions";
import Predictions from "../components/Predictions";

const videoConstraints = {
    width: 540,
    facingMode: "environment",
};

const Camera = () => {
    const webcamRef = useRef(null);
    const [url, setUrl] = useState(null);
    const [uploading, setUpLoading] = useState(false);
    const { loading, getPredictions } = useGetPredictions();
    const [data, setData] = useState(null);

    const [imgUrl, setImgUrl] = useState(null);
    const [captureData,setCaptureData] = useState([]);

    const handleImageUpload=(imgUrl)=>{
        captureData.push({url:imgUrl});
        console.log(captureData);
    }

    const LoadPredictButton = ()=>{
        if(captureData.length == 3){
            return <PredictionsButton/>;
        }
    }

    const capturePhoto = useCallback(async () => {
        const imageSrc = await webcamRef.current.getScreenshot();

        setUpLoading(true);
        const publicUrl = await uploadToCloudinary(imageSrc);
        setUrl(publicUrl);
        setUpLoading(false);

        console.dir({ publicUrl });
        //capture();

        handleImageUpload(publicUrl);        
    }, [webcamRef]);

    const onUserMedia = (e) => {
        console.log(e);
    };

    const handlePredictions = async () => {
        const predData = await getPredictions(url);
        setData(predData);
    }

    return (
        <>
            <div className="upload-body" style={{ display: "flex", flexDirection: "column"}}>
                <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/png"
                    videoConstraints={videoConstraints}
                    onUserMedia={onUserMedia}
                    mirrored={true}
                />
                <br />
                <div>
                    <button onClick={capturePhoto} disabled={uploading} className="primary-button-new">
                        {uploading ? "Uploading..." : "Capture"}
                    </button>
                    <button onClick={() => {
                        setUrl(null);
                    }} className="primary-button-new">Refresh</button>
                </div>

                {/*<div>
                    {url && (
                        <div>
                            <img src={url} alt="Screenshot" />
                            <button onClick={handlePredictions} disabled={loading} className="primary-button-new">Predict</button>
                            {data && <Predictions data={data} />}
                        </div>
                    )}
                </div>*/}
                    <section >
                        {captureData.map((data, _idx)=>(
                            <div className="uploaded-row" key={_idx}>
                                <div className="content">
                                        {url && (
                                            <div>
                                                <p>{data.url}</p>
                                                <img src={data.url} alt="Screenshot" />
                                            </div>
                                        )}
                                </div>
                            </div>
                        ))}
                        {captureData.length === 3 && <button className="primary-button-new">Predict</button>}
                        
                    </section>
            </div>
        </>
    )
}
export default Camera;