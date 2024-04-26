import csvToJson from "convert-csv-to-json";

const getProvidersJson = (providersCsvFile) => csvToJson.fieldDelimiter(',').getJsonFromCsv(providersCsvFile);

const handleProviderDetails = (providers, distanceDetails, avgCostPerPage, ratings, turnInTimes) => {
    const allDetails = providers.map((provider) => {
        const providerRatingDetails = {}
        const dd = distanceDetails.find(({provider_id}) => provider_id === provider.id);
        providerRatingDetails['distance_in_miles'] = dd.distance_in_miles
        providerRatingDetails['provider_id'] = provider.id;

        const avgCostPP = avgCostPerPage.find(({provider_id}) => provider_id === provider.id)
        if (avgCostPP !== undefined || null) {
            providerRatingDetails['averageRemoteJobCost'] = avgCostPP.averageRemoteJobCost
            providerRatingDetails['averageOnLocationJobCost'] = avgCostPP.averageOnLocationJobCost
        }

        const pRatings = ratings.find(({id}) => id === provider.id)
        providerRatingDetails['avg_rating'] = pRatings.avg_rating

        const avgTurnInTime = turnInTimes.find(({provider_id}) => provider_id === provider.id)
        providerRatingDetails['avg_days_to_turn_in'] = avgTurnInTime.avg_days_to_turn_in
        return providerRatingDetails
    })
    return allDetails
}
export {getProvidersJson, handleProviderDetails}