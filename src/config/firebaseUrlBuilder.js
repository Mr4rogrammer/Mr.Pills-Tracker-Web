import { firebaseClearString } from "../screens/Utils"
export function getPillsUrl(email) {
    return 'data/' + firebaseClearString(email) +"/pillsData"   
}
export function getPillsUrlForId(email, id) {
    return 'data/' + firebaseClearString(email) +"/pillsData/"+id
}
export function getPillsPostUrl(email) {
    return 'data/' + firebaseClearString(email) +"/pillsData/"
}

export function getConfigsUrl(email) { 
    return 'data/' + firebaseClearString(email) +"/config/"
}