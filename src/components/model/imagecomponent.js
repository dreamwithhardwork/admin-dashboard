import './modelformstyle.css'
import { Delete, ClearSharp, ClearRounded, ClearAll, ClearAllRounded, ClearOutlined } from '@material-ui/icons';
const { CardMedia, Divider } = require("@material-ui/core");
const { default: Carousel } = require("react-material-ui-carousel");

function ImageComponent(props){
    const deleteImage  =() => {
        console.log(props.index)
        console.log(props.prop)
        let newImages = [...props.prop.value];
        let index = props.index;

        newImages.splice(index,1);
        props.prop.onChange(newImages);
    }
    return(
        <Carousel className={props.delete?"model-image":"model-image-false"} navButtonsAlwaysInvisible={true}   autoPlay={false} indicators={false} >
                   <div>
                   <CardMedia style={{marginLeft:"10px"}} component="img" image={typeof props.src ==="object"?props.src.value:props.src} />  
                   {
                       props.delete && props.src!==null ? <div style={{position:"relative",display:"flex",justifyContent:"center"}}>
                       <ClearOutlined onClick={deleteImage} />
                   </div>:""
                   }
                   <Divider/>
                   </div> 
                        
        </Carousel>
    )
}

export default ImageComponent