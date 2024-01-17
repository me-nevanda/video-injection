import {injectVideoTag} from "./siteService";
import {getVideo, startVideoIfInView, videoProgressHandler} from "./videoService";

const DOMContentLoadedHandler = () => {
    // inject video tag
    injectVideoTag();

    const video = getVideo();
    if (video) {
        // timeupdate event listener to track video progress
        video.addEventListener('timeupdate', videoProgressHandler);
        // scroll event listener
        window.addEventListener('scroll', startVideoIfInView);
    }
}

document.addEventListener('DOMContentLoaded', DOMContentLoadedHandler);