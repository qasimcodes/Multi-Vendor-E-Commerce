import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useAuth } from '../context/auth';

const ProfileUpload = ({image, setImage, uploading, setUploading, loading, setLoading}) => {

  /* context */
  const [auth, setAuth] = useAuth();

  const handleImageUpload = async (e) => {
        try {
            let file = e.target.files[0];
            if(file){
                setUploading(true);
                new Promise(()=>{
                    Resizer.imageFileResizer(
                        file,  1080, 720, "JPEG",  100, 0,
                        async (uri) =>{
                            try {
                                console.log("UPLOAD Image:", uri);
                                const {data} = await axios.post("/upload-image",{
                                    image: uri,
                                });
                                setImage(data);
                                setUploading(false);
                                alert(100)
                                setAuth({ ...auth, user: data });
                                let dataFromLS = JSON.parse(localStorage.getItem("auth"));
                                dataFromLS.user = data;
                                localStorage.setItem("auth", JSON.stringify(dataFromLS));
                                setLoading(false);
                                successToast(data.message);
                            } catch (error) {
                                console.log(error)
                                setUploading(false);
                            }
                        },
                        "base64"
                    );
                });
            }
        } catch (err){
            console.log(err);
            setUploading(false);
        }
  }

  const deleteImageUpload = async (file) => {
    const ask = window.confirm("Delete Image?");
    if(!ask) return;
    setUploading(true);
    try {
        const {data} = await axios.post("/delete-image", photo);
        if(data?.ok){
            setImage(null);
            setUploading(false) 
        }        
    } catch (err){
        console.log(err)
        setUploading(false) 
    }
 }
  
  return (
    <>
        <label className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
           {uploading ? "Processing..." : "Upload Photo"}
           <input hidden type="file" accept="image/*" onChange={handleImageUpload} />        
        </label>
        <div className="mb-3">
            
            {image?.Location ? (
                   <img 
                   src={image?.Location} 
                   shape="square"
                   className="w-16 h-16 rounded-full"
                   alt="User Avatar"
                   onClick={()=> deleteImageUpload()}
                    />
               ) : ( 
                  ""
               )   
            }
        </div>
    
    </>
  )
}

export default ProfileUpload
