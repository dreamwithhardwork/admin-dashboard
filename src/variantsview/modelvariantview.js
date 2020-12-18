import { AirlineSeatReclineExtra, ArrowBack, CheckCircleOutlineOutlined, CloseOutlined, DirectionsCar, ExpandMore, FlashOnOutlined, SpeedOutlined } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import Carousel from 'react-material-ui-carousel';
import { Link, useHistory, useParams } from 'react-router-dom';
import { SERVICE_URL } from '../components/constants/constants';
import SimpleBackdrop from '../components/messages/backdrop';
import '../variantsview/modelview.css'
const { Container, Paper, Card, CardActionArea, CardContent, CardMedia, Typography, ListItemText, TextField, Accordion, AccordionSummary, AccordionDetails, Divider, FormGroup, FormControlLabel } = require("@material-ui/core");
const { Fragment, useState, useRef, useEffect } = require("react");


function ModelVariantView(props) {
    const [expanded, setExpanded] = useState(false)
    const [backDrop,setBackDrop] = useState(false)
    const {name,variantName,fuelType} = useParams();
    const [model, setModel] = useState({});
    const [variant,setVariant] = useState({});
    const history = useHistory();
    const [bhp,setBHP] = useState("--");
    const [engine,setengine] = useState("--");
    const [mileage,setmileage] = useState("--");
    const [variantList, setVariantList] = useState([]);


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded?panel:false);
    }

    const handleChangeVariant = (e,value) => {
        let variant = value.split(" / ");
        model.variants.map(item => {
            if(item.variantName === variant[0] && variant[1] === item.fuelType){
                setVariant(item);
                if(Object.keys(item).length !== 0){
                    if(item.specifications!==undefined && item.specifications!==null && item.specifications.length!==0){
                        item.specifications.map(spec => {
                            if(spec.properties!==null && spec.properties!==undefined && spec.properties.length!==0){
                                spec.properties.map(property => {
                                    if(property.name === "Max Power"){
                                        try{
                                            let n = Number.parseFloat(property.value.substr(0,property.value.indexOf("bhp")));
                                            setBHP(n);
                                        }catch(ex){
                                            setBHP("--")
                                        }
                                        
                            
                                      }else if(property.name === "Displacement (cc)"){
                                        try{
                                            let n = Number.parseFloat(property.value);
                                            setengine(n);
                                        }catch(ex){
                                            setengine("--")
                                        }
                            
                                      } else if(property.name === "Mileage (ARAI)"){
                                        try{
                                            let n = Number.parseFloat(property.value);
                                            setmileage(n);
                                        }catch(ex){
                                            setmileage("--")
                                        }
                                      }
                                })
                            }
                            else{
                                setBHP("--");setengine("--");setmileage("--")
                            }
                        })
                    }else{
                        setBHP("--");setengine("--");setmileage("--");
                    }
                }
            }
        })
    }

    useEffect(async ()=>{
        setBackDrop(true)
        try{
            let res = await fetch(SERVICE_URL.GET_MODEL_BY_NAME+name);
            let body = await res.json();
            setModel(body);
            let variantToMap={};
            let variantsLists = [];
            body.variants.map(item => {
                variantsLists.push(item.variantName+" / "+item.fuelType);
                if(item.variantName === variantName && fuelType === item.fuelType){
                    setVariant(item);
                    variantToMap = item;
                    console.log(item)
                }
            })
            setVariantList(variantsLists);
            if(Object.keys(variantToMap).length===0){
                variantToMap = body.variants.length!==0?body.variants[0]:{};
                setVariant(variantToMap);
            }
            if(Object.keys(variantToMap).length !== 0){
                if(variantToMap.specifications!==undefined && variantToMap.specifications!==null){
                    variantToMap.specifications.map((spec,index) => {
                        if(index === 0){
                            setExpanded(spec.name)
                        }
                        if(spec.properties!==null && spec.properties!==undefined){
                            spec.properties.map(property => {
                                if(property.name === "Max Power"){
                                    try{
                                        let n = Number.parseFloat(property.value.substr(0,property.value.indexOf("bhp")));
                                        setBHP(n);
                                    }catch(ex){}
                                    
                        
                                  }else if(property.name === "Displacement (cc)"){
                                    try{
                                        let n = Number.parseFloat(property.value);
                                        setengine(n);
                                    }catch(ex){}
                        
                                  } else if(property.name === "Mileage (ARAI)"){
                                    try{
                                        let n = Number.parseFloat(property.value);
                                        setmileage(n);
                                    }catch(ex){}
                                  }
                            })
                        }else{
                            setBHP("--");setengine("--");setmileage("--")
                        }
                    })
                }
            }
        }
        catch(e){}
        setTimeout(()=>{
            setBackDrop(false)
            console.log("close")
        },1000)
    },[])

    const capitalize = (s) => {
        console.log(s)
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }

    return (
        <div style={{ display: "flex", flexDirection: "column", margin: "20px", width: "100%" }}>
            <Container>
            <FormGroup style={{marginBottom:"10px"}}>
                <FormControlLabel label="&nbsp;&nbsp;&nbsp;Back" control={<ArrowBack onClick={() => history.goBack()} />}></FormControlLabel>
            </FormGroup>
            </Container>
            <Paper className="keyfeatures">
                <Container>
                    <Card className="card-root">
                        <CardActionArea className="carosel-model">
                            <Carousel animation="slide" autoPlay={true} indicators={false} >
                                 {
                                     (model.imagesWithColors  === undefined || model.imagesWithColors  === null )? <CardMedia/>:
                                     model.imagesWithColors[Object.keys(model.imagesWithColors)[0]].map(item => <CardMedia component="img" image={item.url}/>)
                                     
                                 }
                            </Carousel>
                        </CardActionArea>
                        <CardContent>
                            <div style={{ display: "flex", flexDirection: "column", marginLeft: "40px" }}>
                                <Typography style={{ fontWeight: "bold" }} variant="h5">
                                    {capitalize(model.make)
                                     + " "+capitalize(model.name) + " "+ capitalize(variant.variantName)+" " +variant.fuelType}
                               </Typography>
                                <Autocomplete onChange={(e, value) => handleChangeVariant(e,value)} size="small"
                                    style={{ marginRight: "30px", width: 300, marginTop: "30px" }} id="combo-box-de9mo" options={variantList}
                                    getOptionLabel={option => { return option; }}
                                    disableClearable={true}
                                    renderOption={(option) => (
                                        <Fragment>
                                            <ListItemText style={{ color: "black" }}> {option}</ListItemText>
                                        </Fragment>
                                    )}
                                    renderInput={(params) => { return <TextField value={"select"} {...params} label="Change variant" variant="outlined" /> }} />

                                <div style={{ display: "flex", marginTop: "20px" }}>
                                    <Typography variant="body2" color="textSecondary" component="p"> Ex-showroom Price</Typography>
                                    <Link style={{ marginLeft: "5px", textDecoration: "none" }}>
                                        {
                                            new Intl.NumberFormat('en-IN', {
                                                style: 'currency',
                                                currency: 'INR',
                                                minimumFractionDigits: 0
                                            }).format(variant.exShowroomPrice)
                                        }
                                    </Link>
                                </div>

                                <Typography style={{ display: "flex", marginTop: "40px" }}>
                                    <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
                                        <Typography variant="body2" color="textSecondary" component="p"> <FlashOnOutlined style={{ fontSize: "40px" }} /></Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" className="spec-icon">BHP</Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" className="spec-icon-view">{bhp}</Typography>
                                    </div>

                                    <div style={{ position: "relative", display: "flex", flexDirection: "column", marginLeft: "60px" }}>
                                        <Typography variant="body2" color="textSecondary" component="p"> <DirectionsCar style={{ fontSize: "40px" }} /></Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" className="spec-icon">Engine(cc)</Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" className="spec-icon-view">{engine}</Typography>
                                    </div>

                                    <div style={{ position: "relative", display: "flex", flexDirection: "column", marginLeft: "60px" }}>
                                        <Typography variant="body2" color="textSecondary" component="p"> <SpeedOutlined style={{ fontSize: "40px" }} /></Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" className="spec-icon">Mileage</Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" className="spec-icon-view">{mileage}</Typography>
                                    </div>

                                    <div style={{ position: "relative", display: "flex", flexDirection: "column", marginLeft: "60px" }}>
                                        <Typography variant="body2" color="textSecondary" component="p"> <AirlineSeatReclineExtra style={{ fontSize: "40px" }} /></Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" className="spec-icon">Seats</Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" className="spec-icon-view">--</Typography>
                                    </div>
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                </Container>
            </Paper>


            <div className="variants">
                <Container>
                    <Typography style={{ fontWeight: "bold", marginBottom: "20px" }} variant="h6">
                    {capitalize(model.make)
                                     + " "+capitalize(model.name) + " "+ capitalize(variant.variantName)+" " +variant.fuelType} Specifications
                   </Typography>

              {
                  variant.specifications === undefined ? "":
                  variant.specifications.map((item, index) => {
                    return <Accordion square  expanded={expanded===item.name} onChange={handleChange(item.name)}>
                     <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1d-content" id="panel1d-header">
                     <Typography variant="h6">{item.name}</Typography>
                     </AccordionSummary>
                     <AccordionDetails style={{display:"flex",flexDirection:"column"}}>
                            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between"}}>
                                 {
                                     item.properties.map(property => {
                                                return <Row data={property}/>
                                     })
                                 }
                                 
                            </div>
                           
                     </AccordionDetails>
                    </Accordion>
                   })
              }
                   
                </Container>
            </div>
            <SimpleBackdrop open={backDrop} />
        </div>
    )
}

function Row(props){
    return(
        <div style={{width:"40%",marginTop:"20px"}}>
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <Typography variant="body2">{props.data.name}</Typography>
         <Typography variant="body2">
             {props.data.value==="YES"?<CheckCircleOutlineOutlined style={{color:"green"}}/>:props.data.value === "NO"? <CloseOutlined color="secondary" />
             :props.data.value===""||props.data.value===undefined?"NA":props.data.value}
         </Typography>
        </div>
        <Divider style={{margin:"10px 0px 10px 0px"}}/>
       </div>
    )
}


export default ModelVariantView;