# Highlight Blade

Highlight Laravel Blade syntax with [highlight.js](https://highlightjs.org/).

## Installation

Using npm to download the library.

```bash
npm install highlight.js hightlight-blade
```

## Importing the Library

To use the Blade template definition with highlight.js, you have two options for importing:

### Optimized Import (Recommended)

Load only the language definitions you need.

```javascript
// import core hljs api and required languages
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import php from 'highlight.js/lib/languages/php';
import blade from 'highlight-blade';

// register each language definition
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('php', php);
hljs.registerLanguage('blade', blade);
```

### Full Import

Load all languages of highlight.js, please note that this generates a large file.

```javascript
import hljs from 'highlight.js';
import blade from 'highlight-blade';

hljs.registerLanguage('blade', blade);
```

More information about importing highlight.js library, please refer
to [here](https://highlightjs.readthedocs.io/en/latest/readme.html#importing-the-library).

