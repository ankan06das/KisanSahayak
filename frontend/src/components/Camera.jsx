import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import useGetPredictions from "../hooks/useGetPredictions";

const videoConstraints = {
    width: 540,
    facingMode: "environment",
};

const Camera = () => {
    const webcamRef = useRef(null);
    const [url, setUrl] = useState(null);
    const [uploading, setUpLoading] = useState(false);
    const {loading, getPredictions} = useGetPredictions();

    const capturePhoto = useCallback(async () => {
        const imageSrc = await webcamRef.current.getScreenshot();

        setUpLoading(true);
        const publicUrl = await uploadToCloudinary(imageSrc);
        setUrl(publicUrl);
        setUpLoading(false);

        console.dir({ publicUrl });
        //capture();
    }, [webcamRef]);

    const onUserMedia = (e) => {
        console.log(e);
    };

    const handlePredictions = async () => {
        const data = await getPredictions(url);
        console.log(data);
    }

    return (
        <>
            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/png"
                videoConstraints={videoConstraints}
                onUserMedia={onUserMedia}
                mirrored={true}
            />
            <br />
            <button onClick={capturePhoto} disabled={uploading}>
                {loading ? "Uploading..." : "Capture"}
            </button>
            <button onClick={() => {
                setUrl(null);
            }}>Refresh</button>
            <button onClick={handlePredictions}>Predict</button>

            {url && (
                <div>
                    <p>{url}</p>
                    <img src={url} alt="Screenshot" />
                </div>
            )}
        </>
    )
}
export default Camera;