/**
 * Based on https://github.com/spatie/highlightjs-blade/blob/main/src/languages/blade.js
 */
import type {HLJSApi, Language} from 'highlight.js';

export default function (hljs: HLJSApi): Language {
    // {{ $escaped ? 'true' : 'false' }}
    const ESCAPED_TEMPLATE_VARIABLE = {
        begin: /\{\{/,
        beginScope: 'template-variable',
        end: /}}/,
        endScope: 'template-variable',
        subLanguage: 'php',
    };

    // {{ $unescaped ? '<p>true</p>' : '<p>false</p>' }}
    const UNESCAPED_TEMPLATE_VARIABLE = {
        begin: /\{!!/,
        beginScope: 'template-variable',
        end: /!!}/,
        endScope: 'template-variable',
        subLanguage: 'php',
    };

    // @php
    //     $foo = 'bar';
    // @endphp
    const RAW_PHP = {
        begin: /@php/,
        beginScope: 'keyword',
        end: /@endphp/,
        endScope: 'keyword',
        subLanguage: 'php',
    };

    // @somethingLikeThis
    const BLADE_DIRECTIVES = {
        scope: 'keyword',
        match: /@[a-zA-Z]+/,
    };

    // @foreach ($list as $item)
    // or
    // @foreach($list as $item)
    const STATEMENT_AFTER_BLADE_DIRECTIVES = {
        begin: /(?<=@[a-zA-Z]+\s?)\(/,
        excludeBegin: true,
        end: /\)/,
        excludeEnd: true,
        subLanguage: 'php',
    };

    return {
        aliases: ['blade'],
        case_insensitive: false,
        subLanguage: 'xml',
        contains: [
            hljs.COMMENT(/\{\{--/, /--}}/),
            ESCAPED_TEMPLATE_VARIABLE,
            UNESCAPED_TEMPLATE_VARIABLE,
            RAW_PHP,
            BLADE_DIRECTIVES,
            STATEMENT_AFTER_BLADE_DIRECTIVES,
        ],
    };
}
