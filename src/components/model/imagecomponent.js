import './modelformstyle.css'
import { ClearOutlined, Description, VisibilityOutlined } from '@material-ui/icons';
const { CardMedia, Divider, TextField } = require("@material-ui/core");
const { default: Carousel } = require("react-material-ui-carousel");

function ImageComponent(props){
    console.log(props.prop)
    const deleteImage  =() => {
        let newImages = [...props.prop.value];
        let index = props.index;
        newImages.splice(index,1);
        props.prop.onChange(newImages);
    }
    console.log(props)
    return(
        <Carousel className={props.delete?"model-image":"model-image-false"} navButtonsAlwaysInvisible={true}   autoPlay={false} indicators={false} >
                   <div>
                   <CardMedia style={{marginLeft:"10px"}} component="img" image={props.src.url === undefined || props.src.url == null
                    ? props.src.value :props.src.url} />  
                   {
                       props.delete && props.src!==null ? <div style={{position:"relative",display:"flex",justifyContent:"space-evenly"}}>
                       <Description style={{cursor:"pointer"}}/> <VisibilityOutlined style={{cursor:"pointer"}}/> <ClearOutlined style={{cursor:"pointer"}} onClick={deleteImage} />
                   </div>:""
                   }
                   <Divider/>
                   </div> 
                        
        </Carousel>
    )
}

export default ImageComponent