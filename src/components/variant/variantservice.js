
export const handleNameChange = (e,variant,setVariant) => {
    let newVariant = {...variant};
    newVariant.name = e.target.value;
    setVariant(newVariant);
}

export const handleYearChange = (e,variant,setVariant) => {
    let newVariant = {...variant};
    newVariant.year = e.target.value;
    setVariant(newVariant);
}

export const handleTypeChange = (e,variant,setVariant) => {
    let newVariant = {...variant};
    newVariant.type = e.target.value;
    setVariant(newVariant);
}

export const handleDescchange = (e,variant,setVariant) => {
    let newVariant = {...variant};
    newVariant.desc = e.target.value;
    setVariant(newVariant);
}

export const handleBodyTypeChanges = (e,variant,setVariant) => {
    let newVariant = {...variant};
    newVariant.bodyType = e.target.value;
    setVariant(newVariant);
}

export const handlePriceChange = (e,variant,setVariant) => {
    let newVariant = {...variant};
    newVariant.price = e.target.value;
    setVariant(newVariant);
}

export const handleTransmissionChange = (e,variant,setVariant) => {
    let newVariant = {...variant};
    newVariant.transmission = e.target.value;
    setVariant(newVariant);
}

const validate = (variant) => {
    debugger
    if(variant.name.length > 1 && variant.year >2000 && variant.year < 2021 && variant.price > 1000){
       return true
    }
    return false;
}

export const saveVariantAndForward = (variant,history) => {
    let valid = validate(variant)
    if(valid){
        //saveVariant
        history.push("/addVariantProps");

    }
    else{
        //show error message
    }
}

