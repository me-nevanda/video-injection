import {setVideo} from "./videoService";
import {ParagraphType} from "./types";

export const findParagraphInMiddleOfThePage = (): ParagraphType => {
    // all paragraph
    const paragraphs = document.querySelectorAll('p');
    const fullPageHeight = document.body.scrollHeight;

    // initial values
    let middleParagraph:ParagraphType = null;
    let minDistanceFromMiddle = Infinity;

    // find middle paragraph
    paragraphs?.forEach(paragraph => {
        const distanceFromMiddle = Math.abs(paragraph.offsetTop + paragraph.offsetHeight / 2 - fullPageHeight / 2);
        if (distanceFromMiddle < minDistanceFromMiddle) {
            minDistanceFromMiddle = distanceFromMiddle;
            middleParagraph = paragraph;
        }
    });
    return middleParagraph;
}

const createVideoNodeWithWrapper = () => {
    // video wrapper node
    const videoWrapper = document.createElement('div');
    videoWrapper.className = 'video-wrapper';

    // video node
    const videoElement = document.createElement('video');
    videoElement.id = 'mainVideo';
    videoElement.controls = true;
    videoElement.setAttribute('muted', 'muted');
    videoWrapper.appendChild(videoElement);

    // source node
    const sourceElement = document.createElement('source');
    sourceElement.src = 'https://cdn.yoc.com/ad/demo/airbnb.mp4';
    sourceElement.type = 'video/mp4';
    videoElement.appendChild(sourceElement);

    return videoWrapper;
}

export const injectVideoTag = () => {
    // create video node with Wrapper
    const videoWithWrapper = createVideoNodeWithWrapper();

    // inject video with wrapper
    const middleParagraph = findParagraphInMiddleOfThePage();
    middleParagraph && middleParagraph.insertAdjacentHTML('beforebegin', videoWithWrapper.outerHTML);

    // set videoNode (videoService)
    const video = document.getElementById('mainVideo') as HTMLVideoElement;
    setVideo(video);
};