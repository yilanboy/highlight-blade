import type {CallbackResponse, HLJSApi, Language} from 'highlight.js';

function countChar(string: string, char: string) {
    let count = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] === char) {
            count++;
        }
    }

    return count;
}

export default function (hljs: HLJSApi): Language {
    // {{ $escaped ? 'true' : 'false' }}
    const ESCAPED_TEMPLATE_VARIABLE = {
        begin: /(?<begin>\{\{)/,
        beginScope: 'template-variable',
        end: /(?<end>}})/,
        endScope: 'template-variable',
        subLanguage: 'php',
    };

    // {{ $unescaped ? '<p>true</p>' : '<p>false</p>' }}
    const UNESCAPED_TEMPLATE_VARIABLE = {
        begin: /(?<begin>\{!!)/,
        beginScope: 'template-variable',
        end: /(?<end>!!})/,
        endScope: 'template-variable',
        subLanguage: 'php',
    };

    // @php
    //     $foo = 'bar';
    // @endphp
    const RAW_PHP = {
        begin: /(?<begin>@php)/,
        beginScope: 'keyword',
        end: /(?<end>@endphp)/,
        endScope: 'keyword',
        subLanguage: 'php',
    };

    // :class="open ? '' : 'hidden'"
    const ALPINE_JS_STATEMENT_AFTER_X_BIND_SHORTHAND_SYNTAX = {
        begin: /(?<=\s)(?<begin>:[a-z0-9:.-]+=")/,
        excludeBegin: true,
        end: /(?<end>")/,
        excludeEnd: true,
        subLanguage: 'javascript',
    }

    // :blade-value="$phpVar"
    const BLADE_COMPONENT_ATTRIBUTE = {
        begin: /(?<=\s)(?<begin>:[\w-]+=")/,
        excludeBegin: true,
        end: /(?<end>")/,
        excludeEnd: true,
        subLanguage: 'php',
    };

    // @click
    // @mousemove.shift
    const ALPINE_JS_X_ON_SHORTHAND_SYNTAX = {
        match: /(?<match>@[a-z0-9:.-]{2,})(?==")/,
        scope: 'title.function'
    }

    // @click="toggle()"
    const ALPINE_JS_STATEMENT_AFTER_X_ON_SHORTHAND_SYNTAX = {
        begin: /(?<=\s@[a-z0-9:.-]{2,}=)(?<begin>")/,
        excludeBegin: true,
        end: /(?<end>")/,
        excludeEnd: true,
        subLanguage: 'javascript',
    }

    // @somethingLikeThis
    const BLADE_DIRECTIVES = {
        scope: 'keyword',
        match: /(?<match>@[a-zA-Z]+)/,
    };


    // @foreach ($list as $item)
    // or
    // @foreach($list as $item)
    const STATEMENT_AFTER_BLADE_DIRECTIVES = {
        begin: /(?<=@[a-zA-Z]+\s?)(?<begin>\()/,
        beginScope: 'punctuation',
        end: /(?<end>\))/,
        endScope: 'punctuation',
        'on:begin': (match: { index: number }, response: CallbackResponse) => {
            response.data._beginIndex = match.index;
        },
        'on:end': (match: { input: string, index: number }, response: CallbackResponse) => {
            const stringBetweenBeginAndEnd: string = match.input.slice(response.data._beginIndex + 1, match.index);

            if (countChar(stringBetweenBeginAndEnd, '(') !== countChar(stringBetweenBeginAndEnd, ')')) {
                response.ignoreMatch();
            }
        },
        subLanguage: 'php',
    };

    // x-data, x-init, x-show, x-on, etc.
    const ALPINE_JS_DIRECTIVES = {
        begin: /(?<=\sx-(?!transition)[a-z0-9:.-]{2,}=)(?<begin>")/,
        excludeBegin: true,
        end: /(?<end>")/,
        excludeEnd: true,
        subLanguage: 'javascript',
    }

    return {
        aliases: ['blade'],
        case_insensitive: false,
        subLanguage: 'xml',
        contains: [
            hljs.COMMENT(/\{\{--/, /--}}/),
            ESCAPED_TEMPLATE_VARIABLE,
            UNESCAPED_TEMPLATE_VARIABLE,
            RAW_PHP,
            ALPINE_JS_STATEMENT_AFTER_X_BIND_SHORTHAND_SYNTAX,
            BLADE_COMPONENT_ATTRIBUTE,
            ALPINE_JS_X_ON_SHORTHAND_SYNTAX,
            ALPINE_JS_STATEMENT_AFTER_X_ON_SHORTHAND_SYNTAX,
            BLADE_DIRECTIVES,
            STATEMENT_AFTER_BLADE_DIRECTIVES,
            ALPINE_JS_DIRECTIVES,
        ],
    };
}
