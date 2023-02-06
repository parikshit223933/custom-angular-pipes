# CustomAngularPipes

A simple lightweight library exposing some very useful custom built pipes for angular projects.

## Installation

To install this package, run the following command in your project:

```shell
npm i ninjas-transforms
```

## Usage
To use this pipe in your Angular project, import the NinjasTransformsModule in your component's module:

```ts
import {NinjasTransformsModule} from 'ninjas-transforms'
```

All the pipes will be accessible to all the components declared by this module.

Finally you can use this pipe in your template like this.

```html
{{ epochsInSeconds | duration }}
```

## Options

The duration pipe accepts the following options:

- limitTo: Limits the duration to a specific entity (e.g. seconds, minutes, hours, etc.). Possible values are seconds, minutes, hours, days, weeks, months, and years.
- shortHand: Determines whether the entity names are displayed in shorthand (e.g. s, m, h, etc.).
- minDigits: Specifies the minimum number of digits to display for each entity.
- showZero: Determines whether entities with a value of zero are displayed.
- unitWithCapitalLetter: Specifies whether the first letter of the entity name is capitalized.
- entityJoiner: Specifies the string used to join the individual entities.

Here is an example of using the options:

```html
{{ epochsInSeconds | duration: 'hours': true: 2: false: true: '-' }}
```

## Contributing
If you find any bugs or have suggestions for improvements, please open an issue or a pull request on GitHub.

## License
This project is licensed under the MIT License.
