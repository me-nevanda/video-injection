import {getVideo, setVideo, startVideoIfInView, videoProgressHandler} from "../src/videoService";

describe('videoService', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'innerHeight', {value: 0, writable: true});
        setVideo(undefined);
        jest.spyOn(console, 'log').mockRestore();
    });

    it('videoProgressHandler should display messages on the console', () => {
        console.log = jest.fn(); // mock console.log
        let mockVideo = {} as HTMLVideoElement;

        setVideo(mockVideo);
        videoProgressHandler();

        expect(console.log).toHaveBeenCalledTimes(1);
    });

    it('should get videoTag', () => {
        let mockVideo = {} as HTMLVideoElement;

        setVideo(mockVideo);
        const video = getVideo();
        expect(video).toBeDefined();
    });

    it('should not get videoTag  ', () => {
        const video = getVideo();
        expect(video).toBeUndefined()
    });

    it('should play the video', () => {
        let mockVideo = {
            getBoundingClientRect: () => ({
                top: 100,
                height: 200
            })
        } as HTMLVideoElement;
        mockVideo.play = jest.fn();
        setVideo(mockVideo);

        Object.defineProperty(mockVideo, 'paused', {value: true, writable: true});
        Object.defineProperty(window, 'innerHeight', {value: 700, writable: true});

        startVideoIfInView();

        expect(mockVideo.play).toHaveBeenCalled();
    });


    it('should not play the video', () => {
        let mockVideo = {
            getBoundingClientRect: () => ({
                top: -1000,
                height: 200
            })
        } as HTMLVideoElement;

        mockVideo.play = jest.fn(); // Mockujemy play()

        setVideo(mockVideo);

        Object.defineProperty(mockVideo, 'paused', {value: true, writable: true});
        Object.defineProperty(window, 'innerHeight', {value: 1700, writable: true});

        startVideoIfInView();

        expect(mockVideo.play).not.toHaveBeenCalled();
    });
});