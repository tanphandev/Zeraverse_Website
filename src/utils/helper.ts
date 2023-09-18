import moment from "moment";

export const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const abbreviateNumber = (num: any) => {
  if (!num) return 0;

  const unit = Math.floor(
      Math.round(num / 1.0e1)
        .toLocaleString()
        .replaceAll(",", "").length
    ),
    wunit = [
      "K",
      "M",
      "B",
      "T",
      "Quadrillion",
      "Quintillion",
      "Sextillion",
      "Septillion",
      "Octillion",
      "Nonillion",
      "Decillion",
      "Undecillion",
      "Duodecillion",
      "Tredecillion",
      "Quattuordecillion",
      "Quindecillion",
      "Sexdecillion",
      "Septemdecillion",
      "Octodecillion",
      "Novemdecillion",
      "Vigintillion",
      "Unvigintillion",
      "Duovigintillion",
      "Trevigintillion",
      "Quattuorvigintillion",
      "Quinvigintillion",
      "Sexvigintillion",
      "Septvigintillion",
      "Octovigintillion",
      "Nonvigintillion",
      "Trigintillion",
      "Untrigintillion",
      "Duotrigintillion",
    ][Math.floor(unit / 3) - 1],
    funit = Math.abs(Number(num)) / Number("1.0e+" + (unit - (unit % 3)));
  return wunit ? funit.toLocaleString() + "" + wunit : num.toString();
};

export const getBetweenTwoDate = (value: any) => {
  const currentDay = new Date();
  const prevTime = new Date(value);
  let diff =
    (currentDay.getTime() - prevTime.getTime()) / (1000 * 60 * 60 * 24);
  let betweenTwoDate;
  let string = "";

  switch (Math.floor(diff)) {
    case 0:
      if (diff * 24 >= 1) {
        string = "hours ago";
        betweenTwoDate = `${parseInt((diff * 24).toString())}`;
        return [betweenTwoDate, " ", string];
      }

      string = "minutes ago";
      betweenTwoDate = `${parseInt((diff * 24 * 60).toString())}`;
      break;

    case 1:
      string = "day ago";
      betweenTwoDate = "1";
      break;

    case 2:
      string = "day ago";
      betweenTwoDate = "2";
      break;

    default:
      string = "";
      betweenTwoDate = moment(value).format("MM/DD/YYYY");
      break;
  }

  return [betweenTwoDate, " ", string];
};

export const toUpperCaseFirstLetter = (str: string) => {
  if (str?.includes("/")) {
    return (
      str.split("/")[0]?.charAt(0)?.toUpperCase() +
      str.split("/")[0]?.slice(1)?.toLowerCase() +
      " / " +
      str.split("/")?.slice(-1).pop()?.charAt(0)?.toUpperCase() +
      str.split("/")?.slice(-1).pop()?.slice(1)?.toLowerCase()
    );
  } else {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1)?.toLowerCase();
  }
};

export const toUpperCaseFirstLetterOfWord = (s: string) => {
  const words: string[] = s.match(/\b\w+\b/g) || [];
  const capitalizedWords: string[] = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const result: string = capitalizedWords.join(" ");

  return result;
};

export const toUpperCaseFirstLetterOfDoc = (s: string) => {
  const words: string[] = s.match(/\b\w+\b/g) || [];
  if (words.length > 0) {
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  }
  const result: string = words.join(" ");

  return result;
};

export const formatDate = (date: string) => {
  if (!date) return;
  return moment(new Date(date)).format("MM/DD/YYYY h:mm A");
};

export const counterAnimate = (
  obj: any,
  start: number,
  end: number,
  duration: number
) => {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

export const inRange = (x: number, min: number, max: number) => {
  return (x - min) * (x - max) <= 0;
};
