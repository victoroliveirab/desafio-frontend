import buildQuery from './youtube';

describe('build query - youtube', () => {
  test('should build query with all parameters specified', () => {
    const query = buildQuery({
      chart: 'mostPopular',
      channelId: '123456',
      id: ['abc', 'def'],
      keyword: 'keyword',
      mine: true,
      pageSize: 8,
      pageToken: 'AbCdE',
      part: ['contentDetails', 'snippet'],
      regionCode: 'BR',
      type: 'video',
    });
    expect(query).toBe(
      'chart=mostPopular&channelId=123456&id=abc,def&q=keyword&mine=true&maxResults=8&pageToken=AbCdE&part=contentDetails,snippet&regionCode=BR&type=video&key=GOOGLE_KEY'
    );
  });
});
