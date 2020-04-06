var $overlay = document.querySelector('.page-overlay');
var $buttons = document.querySelectorAll('.downloadToggle');

$buttons.forEach($el => {
  $el.addEventListener('click', function(e) {
    e.preventDefault();
    if($overlay.classList.contains("open")) {
      $overlay.classList.remove("open");
    } else {
      $overlay.classList.add("open");
    }
    return false;
  });
});

var $counter = document.querySelector('.counter_object');
var counterValue = 10000;
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function increase_counter() {

  counterValue+=152689;

  if(counterValue > 350000000)
    counterValue = 350000000;

  let count_str = formatNumber(counterValue);
  $counter.innerHTML = '<span class="d">' + count_str.replace(/,/gi, '</span><span class="d">') + '</span>';

  if(counterValue < 350000000) {
    window.requestAnimationFrame(increase_counter);
  }
}

increase_counter();

var $tryit = document.querySelector('.tryit');
var $video = document.querySelector('.video');
var video = document.querySelector("#videoElement");
var $requestButton = document.querySelector('.requestVideo');
var takeoverVideo = false;
var audio = document.querySelector('#audioElement');
var webcamRequested = false;
var $webcam = document.querySelector('.webcam');
var localStream;

$requestButton.addEventListener('click', function() {
  $tryit.classList.remove("prompt-step1");
  $webcam.setAttribute("data-notice", "Waiting for camera");
  if(!webcamRequested) {

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          //console.log(stream);
          localStream = stream;
          video.setAttribute('autoplay', '');
           video.setAttribute('muted', '');
           video.setAttribute('playsinline', '');
          video.srcObject = stream;
          video.play();
          $webcam.setAttribute("data-notice", "");
        })
        .catch(function (err0r) {
          $webcam.setAttribute("data-notice", "Couldn't connect to camera");
        });
    } else {
      $webcam.setAttribute("data-notice", "Device doesn't support camera");
    }
    $tryit.classList.add("show");
  } else {
    $tryit.classList.remove("show");
    video.pause();

    if(localStream && localStream.getTracks()) {
      localStream.getTracks()[0].stop();
    }
  }

  webcamRequested = !webcamRequested;
  //audio.src = '/audio/dialup.mp3';

  this.textContent = (webcamRequested ? 'Disable' : 'Enable');

  if(!webcamRequested && takeoverVideo)
    $takeoverButton.click();

});

var $takeoverButton = document.querySelector('.takeoverVideo');
$takeoverButton.addEventListener('click', function() {

  takeoverVideo = !takeoverVideo;
  $tryit.classList.remove("prompt-step1");
  if(!webcamRequested) {
    if(takeoverVideo)
      $tryit.classList.add("prompt-step1");
    takeoverVideo = false;

  }

  if(takeoverVideo) {
    $tryit.classList.add("takeover");
    audio.src = '/audio/dialup.mp3';
    audio.load();
    audio.play();
  } else {
    $tryit.classList.remove("takeover");
    audio.pause();
    audio.src = '';
    audio.load();
  }
  this.textContent = (takeoverVideo ? 'Stop' : 'Start');
});

$takeoverButton.addEventListener('blur', function() {
  $tryit.classList.remove("prompt-step1");
});

function isFacebookApp() {
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
}

if(isFacebookApp()) {

  window.location.href = 'googlechrome://navigate?url=dzoom.app';

}
