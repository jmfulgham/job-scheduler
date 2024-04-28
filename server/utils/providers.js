import csvToJson from "convert-csv-to-json";
import {ON_LOCATION_JOB_TYPE, REMOTE_JOB_TYPE} from "./jobs.js";

const getProvidersJson = (providersCsvFile) => csvToJson.fieldDelimiter(",").getJsonFromCsv(providersCsvFile);

const handleProviderDetails = (providers, distanceDetails, avgCostPerPage, ratings, turnInTimes) => {
    return providers.map((provider) => {
        const providerRatingDetails = {}
        providerRatingDetails["provider_id"] = provider.id;
        providerRatingDetails["provider_name"] = provider.full_name;
        //set distance details
        if( distanceDetails.distance_in_miles !== 0) {
            const dd = distanceDetails.find(({provider_id}) => provider_id === provider.id);
            providerRatingDetails["distance_in_miles"] = dd.distance_in_miles
        }
        //set avg cost by location
        const avgCostPP = avgCostPerPage.find(({provider_id}) => provider_id === provider.id)
        if (avgCostPP !== undefined) {
            providerRatingDetails["avg_remote_cost_p_page"] = avgCostPP.avg_remote_cost_p_page
            providerRatingDetails["avg_location_cost_p_page"] = avgCostPP.avg_location_cost_p_page
        }
        //set provider rating
        const pRatings = ratings.find(({id}) => id === provider.id)
        providerRatingDetails["avg_rating"] = !isNaN(pRatings.avg_rating)? pRatings.avg_rating : null

        //set turn in materials time
        const avgTurnInTime = turnInTimes.find(({provider_id}) => provider_id === provider.id)
        providerRatingDetails["avg_days_to_turn_in"] = avgTurnInTime.avg_days_to_turn_in
        return providerRatingDetails
    })
}

const handleSortByJobLocation = (jobType, providers)=>{
    if(jobType === REMOTE_JOB_TYPE){
        providers.sort((a,b)=>  a.avg_days_to_turn_in - b.avg_days_to_turn_in || a.avg_remote_cost_p_page - b.avg_remote_cost_p_page || a.rating - b.rating  )
    }
        if (jobType === ON_LOCATION_JOB_TYPE) {
            providers.sort((a,b)=> a.distance_in_miles - b.distance_in_miles || a.avg_days_to_turn_in - b.avg_days_to_turn_in ||  a.avg_location_cost_p_page - b.avg_location_cost_p_page || a.rating - b.rating )
        }
   return providers;
}

export {getProvidersJson, handleProviderDetails, handleSortByJobLocation}