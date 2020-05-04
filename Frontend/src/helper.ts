interface BaseEntity {
    id: string
}
/**
 * Takes a list of entities and returns a map with the entity id as the key
 */
export const normalizeData = <T extends BaseEntity>(listOfEntities: T[]): { [key: string]: T } => {
    const normalizedData : { [key : string] : T } = {} 
    listOfEntities.forEach((e: T) => normalizedData[e.id] = e);
    return normalizedData;
}