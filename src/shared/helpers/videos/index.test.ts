import type { VideoThumbnails } from 'api/videos';
import youtubeVideo from '__mocks__/youtube-video';
import { formatViewCount, getBestResolutionThumbUrl } from '.';

const numbers = [
  1, 12, 123, 1_234, 12_345, 123_456, 1_234_567, 12_345_678, 123_456_789,
  1_234_567_890,
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const expectedFormatted: any = {
  1: '1',
  12: '12',
  123: '123',
  1_234: '1K',
  12_345: '12K',
  123_456: '123K',
  1_234_567: '1.2M',
  12_345_678: '12.3M',
  123_456_789: '123.4M',
  1_234_567_890: '1.2B',
};

describe('helpers: videos', () => {
  describe('getBestResolutionThumbUrl', () => {
    test('should return empty string when no option is provided', () => {
      const url = getBestResolutionThumbUrl([] as unknown as VideoThumbnails);
      expect(url).toBe('');
    });
    test('should return a url when options are provided', () => {
      const url = getBestResolutionThumbUrl(youtubeVideo.snippet.thumbnails);
      expect(url).toBe(youtubeVideo.snippet.thumbnails.maxres.url);
    });
  });
  describe('formatViewCount', () => {
    test.each(numbers)('should format correctly', (number) => {
      const formatted = formatViewCount(number.toString());
      expect(formatted).toBe(expectedFormatted[number]);
    });
  });
});
