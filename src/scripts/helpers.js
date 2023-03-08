const formatTime = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  let secs = seconds % 60;
  secs = secs.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  return `${minutes}\:${secs}`;
};

const isSame = (a1, a2) => a1.every((element, index) => element === a2[index]);

const between = (x, min, max) => {
  return x >= min && x <= max;
};

const getCookie = (name) => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : false;
};

const formatAmount = (num) => {
  return num < 1000 ? num.toString() : String(num / 1000 + 'K').replace('.', ',')
}

export { formatTime, isSame, between, getCookie, formatAmount };
