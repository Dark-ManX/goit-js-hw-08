import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

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

const playerPlay = player.on('timeupdate', throttle(function (currentTime) {

    const time = currentTime.seconds;
    console.log(time);
    return window.localStorage.setItem("videoplayerCurrentTime", [time]);
}, 1000));
    
console.log(window.localStorage);
    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });

export default {iframe, player, startTime, playerPlay}
