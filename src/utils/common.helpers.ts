import 'moment-timezone';
import moment from 'moment';
import { TMatches, TFormattedMatches } from '../models';

type TConvertZ = {
  tz?: string;
  time: string;
  value?: any;
};
class TimeZoneUtils {
  public static geDefaultTz(): string {
    return moment.tz.guess();
  }

  public static convertTz({ tz, time }: TConvertZ): string {
    moment.tz.setDefault('Africa/Lagos');
    let date = moment(time, 'h:mm A');
    if (tz) date = date.clone().tz(tz);
    return date.format('h:mm A');
  }

  public static convertUnixToDate({ tz, time }: TConvertZ): any {
    if (!time) {
      return '';
    }

    if (tz) {
      return moment(time).clone().tz(tz).format('h:mm A');
    }

    return moment(time).clone().local().format('h:mm A');
  }

  public static convertSecToMin(seconds: number): any {
    const formatted = moment.duration({ seconds }).minutes();
    return formatted;
  }

  public static formatSecondsToDate(seconds: number): string {
    return moment({}).seconds(seconds).format('h:mm A');
  }
}
export default TimeZoneUtils;

export const getFirstAndLastInitialsFromText = (name?: string, ignoreUserLevel = false): string => {
  if (!name) {
    return '';
  }

  const removeUserLevel = (fullName: string): string => fullName.replace(/\s?\(.*?\)/, '');
  const formattedName = ignoreUserLevel ? removeUserLevel(name) : name;
  const words = formattedName.split(' ');

  if (words.length >= 2) {
    const { 0: wordA, [words.length - 1]: wordB } = words;

    return wordA.substring(0, 1).concat(wordB.substring(0, 1)).toLocaleUpperCase();
  }

  return formattedName.length > 0 ? formattedName.substring(0, 2).toLocaleUpperCase() : '';
};

export const sortLettersAlphabetically = <T>(arr: T[], key: string): T[] => {
  if (!arr.length) {
    return [];
  }

  const sortArray = [...arr];
  const data = sortArray.sort((a: any, b: any) => a[key]?.localeCompare(b[key]));

  return data;
};

export const groupMatchesByLeague = (data: TMatches[]): any => {
  const leagues = data.map((item) => item.league);
  const matchCollections: TFormattedMatches[] = [];
  for (let index = 0; index < leagues.length; index++) {
    const element = leagues[index];
    const leagueList = data.filter((item) => item.league === element);

    const matchData = {
      league: element,
      matches: leagueList,
      countryLogo: leagueList[0]?.countryLogo,
      country: leagueList[0]?.country,
    };

    const hasBeenAdded = matchCollections.find((item: any) => item.league === matchData.league);

    if (!hasBeenAdded) {
      matchCollections.push(matchData);
    }
  }
  return matchCollections;
};

export const truncateString = (word: string, maxLength = 12): string => {
  const shortenText = word.substring(0, maxLength);
  return shortenText;
};

export const sortByStartTime = (arr: TFormattedMatches[]): TFormattedMatches[] => {
  const data = arr
    .map((item: any) => {
      const unixTs = moment(`${item.day},  ${item.year} ${item.hour}`, 'LLL').unix();
      return {
        ...item,
        hour: unixTs,
      };
    })
    .sort((a: any, b: any) => a.hour - b.hour)
    .map((item: any) => ({
      ...item,
      hour: moment.unix(item.hour).format('H:mm a'),
    }));

  return data;
};

const checkTimeZone = () => {
  const tt = '1:00 pm'.split('');

  tt.splice(4, 0, ':00');

  const formattedDate = tt.join('');
  const currentDate = moment().unix();
  const startDate = moment(`October 25,  2021 ${formattedDate}`, 'LLL').unix();
  const unixTs = moment(`October 25,  2021 ${formattedDate}`, 'LLL').add(90, 'minutes').unix();

  moment.duration();
};

export const formatDateForSports = (): void => {};
