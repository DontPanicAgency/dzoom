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
