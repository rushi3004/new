
const url = 'http://localhost:5000'

const uploadImage =  (request,response) => {
    if(!request.file){
        return response.status(404).json({msg:'file not found'})
    }
    const imageurl = `${url}/file/${request.file.filename}`

    return response.status(200).json(imageurl)
}

module.exports = uploadImage