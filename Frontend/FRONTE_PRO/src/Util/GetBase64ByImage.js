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
        FileName: file.name,
        FileSize: file.size,
        FileType: file.type,
    };
}