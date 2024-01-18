import {VideoType} from "./types";

let hasStarted = false;
let startTime = 0;
let showStartTimeMessage = true;
let video: VideoType;

// function for tracking progress of the video
export const videoProgressHandler = () => {
    if (video) {
        const currentTime = video.currentTime;
        const totalDuration = video.duration;
        const percentagePlayed = Math.ceil((currentTime / totalDuration) * 100);

        // needed for message "The video has played through"
        const infoMessageMileStones:number[] = [25, 50, 75, 100];

        // needed for message "The video is played continuously"
        const infoMessageTime:number = 2;

        // The video is played continuously - message
        if (showStartTimeMessage && startTime + infoMessageTime <= currentTime) {
            showStartTimeMessage = false;
            console.log(`The video is played continuously for at least ${infoMessageTime} seconds.`);
        }

        // Video has started - message
        if (!hasStarted) {
            console.log('The video has started.');
            hasStarted = true;
        }

        // Video has played through - message
        if (infoMessageMileStones.includes(percentagePlayed)) {
            console.log(`The video has played through ${percentagePlayed}% of the full video.`);
        }
    }
};

export const startVideoIfInView = () => {
    if (video) {
        const screenHeight = window.innerHeight || document.documentElement.clientHeight;
        const videoRect = video.getBoundingClientRect();
        //
        const videoTriggerPosition = videoRect.top + (videoRect.height / 2);
        const currentTime = video.currentTime;

        if (videoTriggerPosition >= 0 && videoTriggerPosition <= screenHeight) {
            if (video.paused) {
                console.log('Video is at least 50% in the viewport. Starting playback.');

                // needed for message "The video is played continuously"
                startTime = currentTime;
                showStartTimeMessage = true;

                video.play();
            }
        } else {
            if (!video.paused) {
                console.log('Video is less than 50% viewable. Pausing playback.');
                video.pause();
            }
        }
    }
};

export const setVideo = (videoTag: VideoType) => {
    video = videoTag;
}

export const getVideo = (): VideoType => {
    return video;
}
