// JavaScript Document
/// <reference path="jquery-1.7.2.js" />

$(document).ready(function () {
    console.log('test');
    VN.definescene('lecturehall.jpg', 'hello');
    VN.loadscene('hello');
    VN.audio.setupAudio("illurock.mp4", "hi", { action: "play" });


});
var VN = (function () {

    var imagesfolder = 'images/';
        
    var AudioManager = (function () {

        var audioFolder = 'audio/';
        var audioEnabled = false;

        //the currently playing audio
        var currentAudio;
        //stores refences to the audio objects.
        var allAudio = {};


        if (!!(document.createElement('audio').canPlayType)) {
            audioEnabled = true;
        }

        //options {loop:boolean,action:play/pause/stop}
        function setupAudio(filename, tag,options) {
            if (audioEnabled) {

                currentAudio = new Audio(audioFolder + filename);
                currentAudio.addEventListener('ended', function () {
                    console.log("ended");
                });

                currentAudio.addEventListener('timeupdate', function () {
                    console.log(this.currentTime);
                });
                
                allAudio[tag] = currentAudio;
                if (options!==null) {
                    options;
                    if (options.bob == undefined) {
                        console.log("ok");
                    }
                    if (options.action !== undefined) {
                        if (options.action === 'play') {
                            currentAudio.play();
                        }
                    }

                }
            }
        }

        return {
            IsAudioAvailable: function () {
                return audioEnabled;
            },
            setupAudio: setupAudio
        };
        

    })();


    //stores the names of background images with a key.
    var scenes = {};
    function scene(image, scenename) {
        console.log('background');
        scene[scenename] = image;
    }

    function sceneloader(scenename) {
        console.log("scene loader" + scenename);
        if (scenes[scenename] != "undefined") {
            var image = imagesfolder + scene[scenename];
            $("#background").addClass("scene").attr("src", image);
        }
    }

    


    return {
        definescene: scene,
        loadscene: sceneloader,
        audio: AudioManager        
    };


} ());