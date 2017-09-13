# {{ name }}

[![Build Status](https://travis-ci.org/{{ organization }}/{{ name }}.svg?branch=master)](https://travis-ci.org/{{ organization }}/{{ name }})
[![Coverage Status](https://codecov.io/gh/{{ organization }}/{{ name }}/branch/master/graph/badge.svg)](https://codecov.io/gh/{{ organization }}/{{ name }})
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

{{ description }}

## Usage

```sh
npm install --save {% if scope %}@{{ scope }}/{% endif %}{{ name }}
```

