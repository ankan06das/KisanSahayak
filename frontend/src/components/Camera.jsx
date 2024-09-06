import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 540,
    facingMode: "environment",
};

const Camera = () => {
    const webcamRef = useRef(null);
    const [url, setUrl] = useState(null);

    const capturePhoto = useCallback(async () => {
        const imageSrc = await webcamRef.current.getScreenshot();
        setUrl(imageSrc);
        console.dir({ imageSrc });
        //capture();
    }, [webcamRef]);

    const onUserMedia = (e) => {
        console.log(e);
    };

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
            <button onClick={capturePhoto}>Capture</button>
            <button onClick={() => {
                setUrl(null);
            }}>Refresh</button>

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