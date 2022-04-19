import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const startTime = player.setCurrentTime(window.localStorage.videoplayerCurrentTime).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});

const playerPlay = player.on('timeupdate', function (currentTime) {

    const time = currentTime.seconds;
    // console.log(time);
    return window.localStorage.setItem("videoplayerCurrentTime", [time]);
});
    
console.log(window.localStorage);
    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });

console.dir(window.localStorage);

export default {iframe, player, startTime, playerPlay}
