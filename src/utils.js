import escapeRegExp from 'escape-string-regexp'

export const filterLocations = (query, locations) => {
    if(query === '' || (typeof query === 'undefined')) {
        return locations
    }

    let regexp = new RegExp(escapeRegExp(query), 'i')
    return locations.filter((location) => {
        return location.name.match(regexp)
    })
}