//Drop Down List
const dropDowmModelOptions = [
    {
        key: 0,
        value: "Add a Medicine",
    },
    {
        key: 2,
        value: "List of Medicine's",
    },
];
export const convertTo12HourFormat = (time24) => {
    let [hours, minutes] = time24.split(':');
    hours = parseInt(hours, 10);
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert hour '0' to '12'
    return `${hours}:${minutes} ${period}`;
}
export function firebaseClearString(aString) {
    if (!aString) return null;
    let result = aString.replace(/[@.#$\[\]]/g, "");
    return result;
}
export default dropDowmModelOptions