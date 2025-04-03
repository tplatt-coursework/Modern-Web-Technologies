let mongoose = require("mongoose")

let animeSchema = new mongoose.Schema({
    Name: String,
    Studio: String, 
    Episodes: Number,
    Aired: Date
})

animeSchema.statics.listAllAnime = function() {
    
    return this.find({},'-_id -__v')
}

animeSchema.statics.listFilteredAnime = function(json_filters) {
    console.log(json_filters)
    let filters = {
        'Episodes':undefined,
        'Aired':undefined
    
    }
    for(key of Object.keys(json_filters)){
        switch(key){
            case 'lt-ep': 
                if(filters.Episodes === undefined)
                    filters.Episodes={}
                filters.Episodes.$lt = json_filters[key]
                break
            
            case 'gt-ep': 
                if(filters.Episodes === undefined)
                    filters.Episodes={}
                filters.Episodes.$gt = json_filters[key]
                break
            
            case 'lt-dt': 
                if(filters.Aired === undefined)
                    filters.Aired={}
                filters.Aired.$lt = json_filters[key]
                break
            
            case 'gt-dt': 
                if(filters.Aired === undefined)
                    filters.Aired={}
                filters.Aired.$gt = json_filters[key]
                break

            default:
                filters[key] = json_filters[key]
                break
        }
    }

    if(filters['Episodes'] === undefined) delete filters['Episodes']
    if(filters['Aired']    === undefined) delete filters['Aired']

    console.log(filters)
    return this.find(filters,'-_id -__v ')
}


let animeModel = mongoose.model('anime', animeSchema)

module.exports = animeModel