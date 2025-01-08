import {describe, expect, it} from 'vitest';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import php from 'highlight.js/lib/languages/php';
import blade from '../src/index.js';

hljs.registerLanguage('xml', xml)
hljs.registerLanguage('blade', blade);
hljs.registerLanguage('php', php);

describe('highlight laravel blade', () => {
    it('should highlight the if else condition as keyword', () => {
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

    it('should highlight the for loop as keyword', () => {
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

    it('should highlight the foreach loop as keyword', () => {
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

    it('should highlight the while loop as keyword', () => {
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

    it('should highlight the escape template tag', () => {
        const code = '{{ $i }}';
        const result = hljs.highlightAuto(code, ['blade']);

        expect(result.value)
            .to.contain('<span class="hljs-template-tag">{{</span>')
            .to.contain('<span class="language-php"> <span class="hljs-variable">$i</span> </span>')
            .to.contain('<span class="hljs-template-tag">}}</span>');
    });

    it('should highlight the escape template tag', () => {
        const code = '{!! $i !!}';
        const result = hljs.highlightAuto(code, ['blade']);

        expect(result.value)
            .to.contain('<span class="hljs-template-tag">{!!</span>')
            .to.contain('<span class="language-php"> <span class="hljs-variable">$i</span> </span>')
            .to.contain('<span class="hljs-template-tag">!!}</span>');
    });
});