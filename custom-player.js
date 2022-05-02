// document queries, load needed element by id and class
let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelectorAll('.title-title');
let prev_title = document.querySelectorAll('.prev-title');
let next_title = document.querySelectorAll('.next-title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let recent_volume_mobile = document.querySelector('#volume_mobile');
let volume_show_mobile = document.querySelector('#volume_show_mobile');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let artist = document.querySelectorAll('.title-artist');
let prev_artist = document.querySelectorAll('.prev-artist');
let next_artist = document.querySelectorAll('.next-artist');
let forward = document.querySelector('#forward');
let backward = document.querySelector('#backward');
let nav = document.querySelector('#song-nav');
let firstsong = document.querySelector('#first-song');
let secondsong = document.querySelector('#second-song');
let thirdsong = document.querySelector('#third-song');

// global variables
let timer;

let index_no = 0; // song index for play tracks
let list_index = 0; // index for set first song on pop up song of list
let Playing_song = false; // flag for knowing the song is playing or not

let last_volume = volume_show / 100; // for save last value of volume if we mute the audio

// create a audio Elementm
let track = document.createElement('audio');

// variable for get current time on current song
let minutes = Math.floor(track.currentTime / 60);
let seconds = Math.floor(track.currentTime - minutes * 60);

// variable for get full duration on current song
let track_minutes = Math.floor(track.duration / 60);
let track_seconds = Math.floor(track.duration - minutes * 60);



// All songs list, contains title of song, singer,  and media source(gif and audio)
let All_song = [{
        name: "Frank",
        path: "media/Alina Baraz - Frank.mp3",
        img: "media/Alina Baraz - Frank.gif",
        singer: "Alina Baraz"
    },
    {
        name: "If You Let Me",
        path: "media/Alina Baraz - If You Let Me.mp3",
        img: "media/Alina Baraz - If You Let Me.gif",
        singer: "Alina Baraz"
    },
    {
        name: "Toroka",
        path: "media/Christian Kuria - Toroka.mp3",
        img: "media/Christian Kuria - Toroka.gif",
        singer: "Christian Kuria"
    },
    {
        name: "Japanese Denim",
        path: "media/Daniel Ceasar - Japanese Denim.mp3",
        img: "media/Daniel Ceasar - Japanese Denim.gif",
        singer: "Daniel Ceasar"
    },
    {
        name: "Demons",
        path: "media/Joji - Demons.mp3",
        img: "media/Joji - Demons.gif",
        singer: "Joji"
    },
    {
        name: "Caretaker",
        path: "media/Shelley FKA DRAM_SZA - Caretaker.mp3",
        img: "media/Shelley FKA DRAM_SZA - Caretaker.gif",
        singer: "Shelley FKA DRAM & SZA"
    },
    {
        name: "Exile",
        path: "media/Taylor Swift_Bon Iver - Exile.mp3",
        img: "media/Taylor Swift_Bon Iver - Exile.gif",
        singer: "Taylor Swift & Bon Iver"
    },
    {
        name: "Found",
        path: "media/Tems_Brent Faiyaz - Found.mp3",
        img: "media/Tems_Brent Faiyaz - Found.gif",
        singer: "Tems & Brent Faiyaz"
    },
    {
        name: "Follow",
        path: "media/Tom Misch_Laura Misch - Follow.mp3",
        img: "media/Tom Misch_Laura Misch - Follow.gif",
        singer: "Tom Misch & Laura Misch"
    },
    {
        name: "Ecstasy",
        path: "media/XXXTENTACION_Noah Cyrus - Ecstasy.mp3",
        img: "media/XXXTENTACION_Noah Cyrus - Ecstasy.gif",
        singer: "XXXTENTACION & Noah Cyrus"
    },
];


// All functions

// This function is to load a track everytime we load the web
window.onload = function() {
    load_track(index_no);
}

// functions load the track
// this functions has important roles for the audio player
function load_track(index_no) {
  // we use exception handler(try, catch) to avoid track not loaded because an error
    try {
        clearInterval(timer); // we clear interval everytime we load a new track
        reset_slider(); // reset slider from beginning because we load a new track

        track.src = All_song[index_no].path; // add track source from current index
        title.forEach((element, i) => { // Because we have more than want element we need change every value
            element.innerHTML = All_song[index_no].name;
        });
        track_image.src = All_song[index_no].img;
        artist.forEach((element, i) => { // Because we have more than want element we need change every value
            element.innerHTML = All_song[index_no].singer;
        });
        track.load();
        setTimeout(function() {  // Set interval for 1 second before executes the function to avoid error
            load_prevtrack(index_no); // Load the previous track in the player
            load_nexttrack(index_no); // Load the next track in the player
        }, 1000)

        timer = setInterval(range_slider, 3000); //  Set interval for 3 second before executes the function to avoid error
    } catch (e) {}
}

// function to load previous track on list
function load_prevtrack(index_no) {
    if (index_no == 0) { // If the track is the first track on the list then the previous track will be the last one 
        prev_title.forEach((element, i) => { // Because we have more than want element we need change every value
            element.innerHTML = All_song[All_song.length - 1].name;
        });
        prev_artist.forEach((element, i) => { // Because we have more than want element we need change every value
            element.innerHTML = All_song[All_song.length - 1].singer;
        })
    } else { // Current track is not the first track on the list
        prev_title.forEach((element, i) => { // Because we have more than want element we need change every value
            element.innerHTML = All_song[index_no - 1].name;
        });
        prev_artist.forEach((element, i) => { // Because we have more than want element we need change every value
            element.innerHTML = All_song[index_no - 1].singer;
        });
    }

}

// function to load next track on list
function load_nexttrack(index_no) {
    if (index_no == All_song.length - 1) { // If the track is the first track on the list then the next track will be the first one
        next_title.forEach((element, i) => { // Because we have more than want element we need change every value
            element.innerHTML = All_song[0].name;
        });
        next_artist.forEach((element, i) => { // Because we have more than want element we need change every value
            element.innerHTML = All_song[0].singer;
        });
    } else { // Current track is not the last track on the list
        next_title.forEach((element, i) => { // Because we have more than want element we need change every value
            element.innerHTML = All_song[index_no + 1].name;
        });
        next_artist.forEach((element, i) => { // Because we have more than want element we need change every value
            element.innerHTML = All_song[index_no + 1].singer;
        });
    }

}

// function to load song in pop up song list 
function load_listtrackt(list_index) {
    firstsong.innerHTML = list_index + 1 + ". " + All_song[list_index].name + " - " + All_song[list_index].singer;  // Set the first list with value of list_index
    if (list_index + 1 == All_song.length) { // If the list_index is the last track, the second track should be the first and the third should be the second
        secondsong.innerHTML = "1" + ". " + All_song[0].name + " - " + All_song[0].singer;
        thirdsong.innerHTML = "2" + ". " + All_song[1].name + " - " + All_song[1].singer;
    } else if (list_index + 2 == All_song.length) { // If the list_index is one before the last track, the second track should be the last track and the third should be the first track
        secondsong.innerHTML = list_index + 2 + ". " + All_song[list_index + 1].name + " - " + All_song[list_index + 1].singer;
        thirdsong.innerHTML = "1" + ". " + All_song[0].name + " - " + All_song[0].singer;
    } else { // The second one should be the next of first of pop up song list track, and the third is the next one of the second one
        secondsong.innerHTML = list_index + 2 + ". " + All_song[list_index + 1].name + " - " + All_song[list_index + 1].singer;
        thirdsong.innerHTML = list_index + 3 + ". " + All_song[list_index + 2].name + " - " + All_song[list_index + 2].singer;
    }
}

//mute sound function
function mute_sound() {
    if (volume.value != 0) { // Check if current value != 0 for save last volume
        last_volume = volume.value;
    }
    // Set all value to 0
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
    // Change icon to volume up
    document.getElementById("volume_icon").classList.add('fa-volume-off');
    document.getElementById("volume_icon").classList.remove('fa-volume-up');
}

//unmute sound function
function unmute_sound() {
  // Set all value to the value before (last_volume)
    track.volume = last_volume / 100;
    volume.value = last_volume;
    volume_show.innerHTML = last_volume;
  // Change icon to volume off
    document.getElementById("volume_icon").classList.add('fa-volume-up');
    document.getElementById("volume_icon").classList.remove('fa-volume-off');
}

// Similiar with mute_sound function but it's mobile version because we use 2 different id in html
function mute_sound_mobile() {
    if (volume_mobile.value != 0) {
        last_volume = volume_mobile.value;
    }
    track.volume = 0;
    volume_mobile.value = 0;
    volume_show_mobile.innerHTML = 0;
    document.getElementById("volume_icon_mobile").classList.add('fa-volume-off');
    document.getElementById("volume_icon_mobile").classList.remove('fa-volume-up');
}

// Similiar with unmute_sound function but it's mobile version because we use 2 different id in html
function unmute_sound_mobile() {
    track.volume = last_volume / 100;
    volume_mobile.value = last_volume;
    volume_show_mobile.innerHTML = last_volume;
    document.getElementById("volume_icon_mobile").classList.add('fa-volume-up');
    document.getElementById("volume_icon_mobile").classList.remove('fa-volume-off');
}

// Function to check if we should mute or unmute
function sound_settings() {
    if (volume.value == 0) { // Check if the current state is mute
        unmute_sound();
    } else {
        mute_sound();
    }
}

// Similiar with sound_settings function but it's mobile version because we use 2 different id in html
function sound_settings_mobile() {
    if (volume_mobile.value == 0) { // Check if the current state is mute
        unmute_sound_mobile();
    } else {
        mute_sound_mobile();
    }
}

// Function to checking the song is playing or not
function justplay() {
    if (Playing_song == false) { // Check if the song is not played
        playsong();
    } else {
        pausesong();
    }
}


// reset song slider value
function reset_slider() {
    slider.value = 0;
}

// play song
function playsong() {
    track.play();
    Playing_song = true;
    play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>'; // Change icon to pause
}

//pause song
function pausesong() {
    track.pause();
    Playing_song = false;
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'; // Change icon to play
}

//stop song
function stopsong() {
    track.pause();
    track.currentTime = 0;
    Playing_song = false;
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'; // Change icon to play
}

//skip forward, this function is to skip current audio time for 10 seconds forward
function skip_forward() {
    track.currentTime += 10;
    slider_position = track.duration * (track.currentTime / 100);
}

//skip backward, this function is to skip current audio time for 10 seconds backward
function skip_backward() {
    track.currentTime += 10;
    slider_position = track.duration * (track.currentTime / 100);

}

// next song
function next_song() {
    // we use exception handler(try, catch) to avoid track not loaded because an error
    try {
        if (index_no < All_song.length - 1) {
            index_no += 1;
            load_track(index_no);
            playsong();
        } else {// Current track is last track on the list, then the next song is the first one
            index_no = 0;
            load_track(index_no);
            playsong();
        }
    } catch (e) {} finally { // Use finally because even there is an error we need to play the song
        playsong();
    }
}

// previous song
function previous_song() {
    // we use exception handler(try, catch) to avoid track not loaded because an error
    try {
        if (index_no > 0) {
            index_no -= 1;
            load_track(index_no);
            playsong();
        } else {// Current track is first track on the list, then the previous song is the last one
            index_no = All_song.length;
            load_track(index_no);
            playsong();
        }
    } catch (e) {} finally { // Use finally because even there is an error we need to play the song
        playsong();
    }
}


// change volume
function volume_change() {
  // Update volume value
    recent_volume_mobile.value = recent_volume.value;
    volume_show.innerHTML = recent_volume.value;
    volume_show_mobile.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
    last_volume = recent_volume.value;
    if (recent_volume.value == 0) { // If the value is 0 we need change the icon to volume off
        document.getElementById("volume_icon").classList.add('fa-volume-off');
        document.getElementById("volume_icon").classList.remove('fa-volume-up');
    } else {
        document.getElementById("volume_icon").classList.remove('fa-volume-off');
        document.getElementById("volume_icon").classList.add('fa-volume-up');
    }
}

// Similar to the abouve, but the mobile version because we use 2 id
function volume_change_mobile() {
  // Update volume value
    recent_volume.value = recent_volume_mobile.value
    volume_show.innerHTML = recent_volume_mobile.value;
    volume_show_mobile.innerHTML = recent_volume_mobile.value;
    track.volume = recent_volume_mobile.value / 100;
    last_volume = recent_volume_mobile.value;
    if (recent_volume_mobile.value == 0) { // If the value is 0 we need change the icon to volume off
        document.getElementById("volume_icon_mobile").classList.add('fa-volume-off');
        document.getElementById("volume_icon_mobile").classList.remove('fa-volume-up');
    } else {
        document.getElementById("volume_icon_mobile").classList.remove('fa-volume-off');
        document.getElementById("volume_icon_mobile").classList.add('fa-volume-up');
    }
}

// update duration according to music current time
track.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime; //getting playing song currentTime
    let duration = 0;
    if (!isNaN(track.duration)) {
        duration = e.target.duration; //getting playing song total duration
    } else {
        duration = 0;
    }
    let musicCurrentTime = track.currentTime;
    let musicDuration = track.duration;
    // update song total duration
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if (totalSec < 10) { //if sec is less than 10 then add 0 before it
        totalSec = `0${totalSec}`;
    }
    musicDuration = `${totalMin}:${totalSec}`;
    // update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) { //if sec is less than 10 then add 0 before it
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime = `${currentMin}:${currentSec}`;
    show_duration.innerHTML = musicCurrentTime + "/" + musicDuration;
});
// change slider position 
function change_duration() {
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

function range_slider() {
    let position = 0;

    // update slider position
    if (!isNaN(track.duration)) { // if there is a duration track 
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }


    // function will run when the song is over
    if (track.ended) {
        play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
        index_no += 1;
        load_track(index_no);
        playsong();
    }
}

// navbar functions
// function to open the pop up
function openNav() {
    nav.style.width = "250px"; // set width of the pop up to 250px
    load_listtrackt(list_index);
}
// function to close the pop up
function closeNav() {
    nav.style.width = "0"; // set width of the pop up to 0 to hide the pop up
}

// fucntion to next visible track in pop up song list
function next_list() {
    list_index += 1; // we just need add the first song index
    if (list_index == All_song.length) { // if we reach the last song of the song list, then we reset to first one
        list_index = 0;
    }
    load_listtrackt(list_index);
}

// function to play the track based on the chosen song in the pop up list
function playtrack(track) {
    if (track == 1) { // if we choose the first one
        index_no = parseInt(firstsong.innerHTML[0]) - 1; // Because the format is (1. Title) so we just need number of the track
    } else if (track == 2) { // if we choose the second one
        index_no = parseInt(secondsong.innerHTML[0]) - 1;
    } else if (track == 3) { // // if we choose the third
        index_no = parseInt(thirdsong.innerHTML[0]) - 1;
    }
    load_track(index_no);
    playsong();
}