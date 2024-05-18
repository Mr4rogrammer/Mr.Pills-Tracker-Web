//Drop Down List

const dropDowmModelOptions = [
    {
        key: 0,
        value: "Add a pill",
    },
    
    {
        key: 2,
        value: "List of pill's",
    },
    
];


export function firebaseClearString(aString) {
    if (!aString) return null;
    let result = aString.replace(/[@.#$\[\]]/g, "");
    return result;
}

export default dropDowmModelOptions