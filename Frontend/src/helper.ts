/**
 * Takes a list of entities and returns a map with the entity id as the key
 */
export const normalizeData = <T>(listOfEntities: T[]): { [key: string]: T } => {
    const normalizedData : { [key : string] : T } = {} 
    listOfEntities.forEach((e: T) => normalizedData[3] = e);
    return normalizedData;
}