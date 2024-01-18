import {findParagraphInMiddleOfThePage, injectVideoTag} from "../src/siteService";

describe('findParagraphInMiddleOfThePage', () => {
    test('returns null if no paragraphs are found', () => {
        document.body.innerHTML = '';
        const middleParagraph = findParagraphInMiddleOfThePage();
        expect(middleParagraph).toBeNull();
    });
});

describe('injectVideoTag', () => {
    test('injects video tag before the middle paragraph', () => {
        document.body.innerHTML = `<p id="middle">Middle paragraph</p>`;
        injectVideoTag();
        const middleParagraph = document.getElementById('middle');
        expect(middleParagraph?.previousElementSibling?.className).toBe('video-wrapper');
        expect(middleParagraph?.previousElementSibling?.querySelector('video')).toBeTruthy();
    });
});