export class ObjectValidator {

    public static hasSameKeys(obj1: any, obj2: any): Boolean {
        return Object.keys(obj1).length === Object.keys(obj2).length && Object.keys(obj1).every((key) => { return key in obj2 });
    };


    public static hasUndefinedValues(obj: any) {
        for (var property in obj) {
            if (obj[property] === undefined) {
                return { valid: false, cause: `Property "${property}" has an undefined value` }
            } else {
                return { valid: true, cause: `All values are defined` }
            }
        }
    };

    public static filterUnusedKeys(raw: any) {
        const entries = Object.entries(raw);
        const filteredEntries = entries.filter(([key, value]) => value !== undefined);
        const filteredObject = Object.fromEntries(filteredEntries);
        return filteredObject;
    };

};
