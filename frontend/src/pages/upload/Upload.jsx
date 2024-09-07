import { useState } from "react";
import './Upload.css';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { uploadBlobToCloudinary } from "../../utils/uploadBlobToCloudinary.js";
import useGetPredictions from "../../hooks/useGetPredictions.js";

function Uploader() {
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("No selected file");
    const [blobData, setBlobData] = useState([]);
    const [uploadData, setUploadData] = useState([]);
    const [uploading, setUploading] = useState(false);
    const {loading, getPredictions} = useGetPredictions();

    const handleImageUpload = (filename, img) => {
        setUploadData(prevData => [
            ...prevData,
            { name: filename, image: img }
        ]);
        setBlobData(prevData => [
            ...prevData,
            { name: filename, image: img }
        ]);
        console.log(blobData);
    };

    const handleBatchUpload = async () => {
        setUploading(true);
        try {
            const uploadPromises = uploadData.map(async ({ name, image }) => {
                // Use the uploadToCloudinary function to upload each image
                const imageUrl = await uploadBlobToCloudinary(URL.createObjectURL(image));
                return { name, image: imageUrl }; // Return image data with the Cloudinary URL
            });
            const results = await Promise.all(uploadPromises);

            // Filter out null results in case of errors during upload
            const successfulUploads = results.filter(result => result !== null);
            console.log("Successful uploads: ", successfulUploads);

            // Optionally update state with successful uploads
            setUploadData(successfulUploads);
        } catch (error) {
            console.error("Error uploading batch: ", error);
        } finally {
            setUploading(false);
        }
    };

    const handleDeletion = (data) => {
        setUploadData(uploadData.filter(el => el !== data));
    };

    console.log(uploadData);

    return (
        <main className="upload-body">
            <form className="upload-form" action=""
                onClick={() => document.querySelector(".input-field").click()}
            >
                <input
                    type="file"
                    accept="image/*"
                    className="input-field"
                    hidden
                    onChange={({ target: { files } }) => {
                        if (files && files[0]) {
                            setFileName(files[0].name);
                            setImage(URL.createObjectURL(files[0]));

                            handleImageUpload(files[0].name, files[0]);
                        }
                    }}
                />
                <>
                    <MdCloudUpload color="#1475cf" size={60} />
                    <p>Browse Files to Upload</p>
                </>
            </form>
            <section>
                {uploadData.map((data) => (
                    <div className="uploaded-row" key={data.name}>
                        <div className="content">
                            <p>{data.name}</p>
                            <span>
                                <MdDelete onClick={() => handleDeletion(data)} />
                            </span>
                        </div>
                        <img src={data.image} width={150} height={150} alt={data.name} />
                    </div>
                ))}
                <button onClick={handleBatchUpload} disabled={uploading} className="primary-button-new">
                    {uploading ? "Uploading..." : "Upload"}
                </button>
                {uploadData.length === 3 &&
                    <button
                        className="button-primary-new"
                        onClick={getPredictions}
                        disabled={loading}
                    >
                        Predict
                    </button>
                }
            </section>
        </main>
    );
}

export default Uploader;