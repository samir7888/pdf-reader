import { Injectable } from '@nestjs/common';
// import { YoutubeTranscript } from 'youtube-transcript';
import { fetchTranscript } from 'youtube-transcript-plus';

@Injectable()
export class YoutubeService {
  async extractText(url: string): Promise<string> {
    try {
      const videoId = this.extractId(url);
      if (!videoId) return '';

      const transcript = await fetchTranscript(videoId, { lang: 'en' });
      console.log(transcript);
      const text = transcript
        .map((line) => line.text)
        .join(' ')
        .trim();

      return text;
    } catch (err) {
      console.log('Transcript Error:', err);
      return '';
    }
  }

  extractId(url: string): string {
    const match = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : '';
  }
}
