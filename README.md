# RUNTYPED - Another runtime type checker for typescript

```typescript
import { type, type ExtractType } from 'runtyped';

const User = {
    name: type.string,
    age: type.number,
    address: {
        street: type.string,
        city: type.string,
        zip: type.number,
    },
    friends: [type.string],
};

type User = ExtractType<typeof User>;
```
