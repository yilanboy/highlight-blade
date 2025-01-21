import {describe, expect, it} from 'vitest';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import php from 'highlight.js/lib/languages/php';
import blade from '../src/index.js';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('blade', blade);
hljs.registerLanguage('php', php);

describe('highlight laravel blade template', () => {
    it('should highlight the @if directive as keyword', () => {
        const code = `
        @if ($isTrue)
            <p>Yes</p>
        @else
            <p>No</p>
        @endif
        `;
        const result = hljs.highlightAuto(code, ['blade']);

        expect(result.value)
            .to.contain('<span class="hljs-keyword">@if</span>')
            .to.contain('<span class="language-php"><span class="hljs-variable">$isTrue</span></span>')
            .to.contain('<span class="hljs-keyword">@else</span>')
            .to.contain('<span class="hljs-keyword">@endif</span>');
    });

    it('should highlight the @for directive as keyword', () => {
        const code = `
        @for ($i = 0; $i < 10; $i++)
            <p>{{ $i }}</p>
        @endfor
        `;
        const result = hljs.highlightAuto(code, ['blade']);

        expect(result.value)
            .to.contain('<span class="hljs-keyword">@for</span>')
            .to.contain('<span class="hljs-keyword">@endfor</span>');
    });

    it('should highlight the @foreach directive as keyword', () => {
        const code = `
        @foreach ($items as $item)
            <p>{{ $item }}</p>
        @endforeach
        `;
        const result = hljs.highlightAuto(code, ['blade']);

        expect(result.value)
            .to.contain('<span class="hljs-keyword">@foreach</span>')
            .to.contain('<span class="hljs-keyword">@endforeach</span>');
    });

    it('should highlight the @while directive as keyword', () => {
        const code = `
        @while ($i < 10)
            <p>{{ $i }}</p>
            $i++;
        @endwhile
        `;
        const result = hljs.highlightAuto(code, ['blade']);

        expect(result.value)
            .to.contain('<span class="hljs-keyword">@while</span>')
            .to.contain('<span class="hljs-keyword">@endwhile</span>');
    });

    it('should highlight the escape template variable', () => {
        const code = '{{ $i }}';
        const result = hljs.highlightAuto(code, ['blade']);

        expect(result.value)
            .to.contain('<span class="hljs-template-variable">{{</span>')
            .to.contain('<span class="language-php"> <span class="hljs-variable">$i</span> </span>')
            .to.contain('<span class="hljs-template-variable">}}</span>');
    });

    it('should highlight the unescape template variable', () => {
        const code = '{!! $i !!}';
        const result = hljs.highlightAuto(code, ['blade']);

        expect(result.value)
            .to.contain('<span class="hljs-template-variable">{!!</span>')
            .to.contain('<span class="language-php"> <span class="hljs-variable">$i</span> </span>')
            .to.contain('<span class="hljs-template-variable">!!}</span>');
    });

    it('should highlight the statement after @use directive', () => {
        const code = "@use('App\\Models\\Flight')\n";
        const result = hljs.highlightAuto(code, ['blade']);

        expect(result.value)
            .to.contain('<span class="hljs-keyword">@use</span>')
            .to.contain('<span class="language-php"><span class="hljs-string">&#x27;App\\Models\\Flight&#x27;</span></span>');
    });

    it('should highlight the statement after @class directive', () => {
        const code = "@class(['p-1', 'bg-gray-100' => $active, 'bg-gray-200' => !$active])";
        const result = hljs.highlightAuto(code, ['blade']);

        expect(result.value)
            .to.contain('<span class="hljs-keyword">@class</span>')
            .to.contain('[<span class="hljs-string">&#x27;p-1&#x27;</span>, <span class="hljs-string">&#x27;bg-gray-100&#x27;</span> =&gt; <span class="hljs-variable">$active</span>, <span class="hljs-string">&#x27;bg-gray-200&#x27;</span> =&gt; !<span class="hljs-variable">$active</span>]');
    });

    it('should highlight the statement that contain parentheses', () => {
        const code = "@selected(old('version') == $version)";
        const result = hljs.highlightAuto(code, ['blade']);

        expect(result.value)
            .to.contain('<span class="hljs-keyword">@selected</span>')
            .to.contain('<span class="hljs-keyword">@selected</span><span class="hljs-punctuation">(</span><span class="language-php"><span class="hljs-title function_ invoke__">old</span>(<span class="hljs-string">&#x27;version&#x27;</span>) == <span class="hljs-variable">$version</span></span><span class="hljs-punctuation">)</span>');
    });

    it('should highlight the x-data and javascript statement', () => {
        const code = '<div x-data="{ open: false, toggle() { this.open = ! this.open } }">';
        const result = hljs.highlightAuto(code, ['blade']);

        expect(result.value)
            .to.contain('<span class="hljs-attr">x-data</span>')
            .to.contain('<span class="language-javascript">{ <span class="hljs-attr">open</span>: <span class="hljs-literal">false</span>, <span class="hljs-title function_">toggle</span>(<span class="hljs-params"></span>) { <span class="hljs-variable language_">this</span>.<span class="hljs-property">open</span> = ! <span class="hljs-variable language_">this</span>.<span class="hljs-property">open</span> } }</span>');
    });

    it('should highlight the string after x-transition', () => {
        const code = '<div x-transition="transition ease-out duration-300"></div>';
        const result = hljs.highlightAuto(code, ['blade']);

        expect(result.value)
            .to.contain('<span class="hljs-attr">x-transition</span>')
            .to.contain('<span class="hljs-string">&quot;transition ease-out duration-300&quot;</span>');
    });

    it('should highlight the x-on shorthand syntax and javascript statement', () => {
        const code = '<button @click="open = ! open">Toggle</button>';
        const result = hljs.highlightAuto(code, ['blade']);

        expect(result.value)
            .to.contain('<span class="hljs-title function_">@click</span>')
            .to.contain('<span class="language-javascript">open = ! open</span>');
    });
});
