# generator-bedrock

> Yeoman generator for laying the foundation for a GitHub repository

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Options](#options)
* [Example Output](#example-output)
* [Building and Testing](#testing)
* [Contributing](#contributing)
* [Legal](#legal)
* [Release History](#release-history)

## Installation
[[Back To Top]](#table-of-contents)

via npm
```shell
npm install -g generator-bedrock
```

Manually
```shell
git clone git://github.com/oddurs/generator-bedrock.git
```

## Usage
[[Back To Top]](#table-of-contents)

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo angular-bedrock`, optionally passing an app name:
```
yo angular-fullstack [app-name]
```

## Options
[[Back To Top]](#table-of-contents)

- `chained`: `bool`

  `chained`, which is `true` by default, is an option that can stop running commands after one of them failed. To see if it failed, it checks the exit code of the command that is run.

- `returnOutput`: `bool`

  `returnOutput` is also `true` by default. This is what returns the output in an array, parsing them line by line. I supply with this option because sometimes you might run a command that only returns server's IP address or sometimes you can run a command that just outputs very long lines and a very long text. I added the ability to opt out so that when unnecessary you might set it to false.


## Example Output
[[Back To Top]](#table-of-contents)

That example outputs something long like this:

```
├── .editorconfig
├── .gitattributes
├── .gitignore
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE.txt
└── README.md
```

See an example project.


## Testing
[[Back To Top]](#table-of-contents)

I have packaged a `Makefile`, `Gruntfile` for building and testing, and `npm` scripts point to those.

Available commands are:

- `make` (Aliases: `npm run-script preinstall`) : 
  Compiles the C++ code into node extension.

- `make clean` (Aliases: `npm run-script preuninstall`):
  Removes the `build` directory.

- `node test` (Aliases: `make test`) : 
  This is for visual testing rather than unit testing. 

- `grunt test`  (Aliases: `grunt`; `npm test`): 
  This is for unit testing. 

## Legal
[[Back To Top]](#table-of-contents)

Copyright © 2015 Oddur Sigurdsson <oddurs@gmail.com>

This software is licensed under the [MIT License](/LICENSE.txt).

## Release History
[[Back To Top]](#table-of-contents)

You can find [all the changelogs here](/CHANGELOGS.md).
