import { SERVICE_URL } from "../constants/constants";
import { postRequest } from "../constants/headers";

export const handleNameChange = (e,variant,setVariant) => {
    let newVariant = {...variant};
    newVariant.variantName = e.target.value;
    setVariant(newVariant);
}

export const handleYearChange = (e,variant,setVariant) => {
    let newVariant = {...variant};
    newVariant.fromYear = e.target.value;
    setVariant(newVariant);
}

export const handleTypeChange = (e,variant,setVariant) => {
    let newVariant = {...variant};
    newVariant.fuelType = e.target.value;
    setVariant(newVariant);
}

export const handleDescchange = (e,variant,setVariant) => {
    let newVariant = {...variant};
    newVariant.description = e.target.value;
    setVariant(newVariant);
}

export const handleBodyTypeChanges = (e,variant,setVariant) => {
    let newVariant = {...variant};
    newVariant.bodyType = e.target.value;
    setVariant(newVariant);
}

export const handlePriceChange = (e,variant,setVariant) => {
    let newVariant = {...variant};
    newVariant.exShowroomPrice = e.target.value;
    setVariant(newVariant);
}

const currency = (e) => {
    console.log(new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
        }).format(e.target.value))
}

export const handleTransmissionChange = (e,variant,setVariant) => {
    let newVariant = {...variant};
    newVariant.transmission = e.target.value;
    setVariant(newVariant);
}

const validate = (variant) => {
    debugger
    if(variant.variantName.length > 1 && variant.fromYear >2000 && variant.fromYear < 2021 && variant.exShowroomPrice > 1000){
       return true
    }
    return false;
}

export const saveVariant = async (variant)  => {
    debugger
    let url = SERVICE_URL.ADD_VARIANT;
    let response = await fetch(url,postRequest(variant));
    let body = await response.json();
    return body;
}

export const saveVariantAndForward = async (variant,history) => {
    let valid = validate(variant)
    if(valid){
        //saveVariant
        let res = await saveVariant(variant);
        history.push("/addVariantProps/"+res._id);

    }
    else{
        //show error message
    }
}

