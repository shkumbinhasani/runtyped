export const type = {
    number: 'number',
    string: 'string',
    boolean: 'boolean',
    optional: {
        number: 'optional-number',
        string: 'optional-string',
        boolean: 'optional-boolean',
    }
} as const;

export type ExtractType<T> = T extends 'number' ? number :
    T extends 'string' ? string :
        T extends 'boolean' ? boolean :
            T extends `optional-${infer N}` ? null | undefined | ExtractType<N> :
                T extends object ? {
                    [K in keyof T]: ExtractType<T[K]>
                } : never;

export function isValidType<T>(data: unknown, schema: T): data is ExtractType<T> {
    if (typeof data === 'object') {
        if (data === null) {
            return typeof schema === 'string' && schema.startsWith("optional-");
        } else if (Array.isArray(data)) {
            return Array.isArray(schema) && data.every(element => isValidType(element, schema[0]));
        } else {
            return Object.keys(schema).every(key => key in data && isValidType(data[key], schema[key]));
        }
    } else {
        return typeof data === schema;
    }
}
