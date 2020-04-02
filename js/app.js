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
