import {type, isValidType, ExtractType} from './index';
import {test, expect} from 'vitest';

test('isValidType correctly validates nested object type', () => {
    const schema = {
        a: {
            b: {
                c: type.number
            }
        }
    };
    const data: ExtractType<typeof schema> = {
        a: {
            b: {
                c: 123
            }
        }
    };
    const result = isValidType(data, schema);
    expect(result).toBe(true);
});

test('isValidType correctly validates array of objects type', () => {
    const schema = [{a: type.number}];
    const data: ExtractType<typeof schema> = [
        {
            a: 123
        }, {
            a: 456
        }
    ];
    const result = isValidType(data, schema);
    expect(result).toBe(true);
});

test('isValidType returns false for invalid nested object type', () => {
    const schema = {
        a: {
            b: {
                c: type.number
            }
        }
    };

    const data = {
        a: {
            b: {
                c: '123'
            }
        }
    };
    const result = isValidType(data, schema);
    expect(result).toBe(false);
});

test('isValidType returns false for invalid array of objects type', () => {
    const data = [
        {
            a: '123'
        },
        {
            a: '456'
        }
    ];
    const schema = [{a: type.number}];
    const result = isValidType(data, schema);
    expect(result).toBe(false);
});

// Test for required fields
test('isValidType returns false for missing required field', () => {
    const data = {
        a: 123
    };
    const schema = {
        a: type.number,
        b: type.number
    };
    const result = isValidType(data, schema);
    expect(result).toBe(false);
});
