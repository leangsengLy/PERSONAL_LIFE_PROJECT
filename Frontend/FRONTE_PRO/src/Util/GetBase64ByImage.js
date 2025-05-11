export const GetBase64ByImage=async(file)=>{
     const dataFile = await  new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                resolve(reader.result)
            }
            reader.onerror = reject
        })
    return {
        Base64:dataFile.split(",")[1],
        ImageType: dataFile.split(",")[0].split(";")[0].split(":")[1]
    };
}