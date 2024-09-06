import {useState} from "react"
import './Upload.css'
import {MdCloudUpload, MdDelete} from 'react-icons/md'
import PredictionsButton from '../../components/PredictionsButton.jsx'
function Uploader(){
    const [image, setImage]=useState(null);
    const [fileName, setFileName]=useState("No selected file");
    const [uploadData,setUploadData] = useState([]);

    const handleImageUpload=(filename, img)=>{
        uploadData.push({name:filename, image : img});
        console.log(uploadData.length);
    }

    const LoadPredictButton = ()=>{
        if(uploadData.length == 1){
            return <PredictionsButton/>;
        }
    }

    const handleDeletion=(data)=>{
        setUploadData(uploadData.filter((el)=>{
            return (el != data);
        }))
    }
    return(
        <main className="upload-body">
            <form className="upload-form" action=""
                onClick={()=> document.querySelector(".input-field").click()}
            >
                <input type="file" accept="image/*" className="input-field" hidden onChange={({target: {files}})=>{
                    files && setFileName(files[0].name);
                    if(files){
                        setImage(URL.createObjectURL(files[0]));
                    };
                    handleImageUpload(files[0].name, URL.createObjectURL(files[0]));
                }}/>
            <>
                <MdCloudUpload color="#1475cf" size={60}/>
                <p>Browse Files to Upload</p>
            </>
            </form>
            <section >
                {uploadData.map((data)=>(
                    <div className="uploaded-row" key={data.name}>
                        <div className="content">
                            <p>{data.name}</p>
                            <span>
                                <MdDelete onClick={()=>{
                                    handleDeletion(data);
                                }}/>
                            </span>
                        </div>
                        <img src={data.image} width={150} height={150} alt="fileName"/>
                    </div>
                ))}
                <div>{LoadPredictButton()}</div>
            </section>
        </main>
    )
}
export default Uploader;