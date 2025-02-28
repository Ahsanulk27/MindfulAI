export interface Message {
  id:any;
  date: Date;
  name:string;
  role: 'user' | 'model';
  parts: {
    text: string;
  }[];
}

export interface MoodEntry {
  id: string;
  date: Date;
  mood: 1 | 2 | 3 | 4 | 5;
  note?: string;
}

export interface WellbeingTip {
  id: string;
  title: string;
  description: string;
  category: 'meditation' | 'exercise' | 'journaling' | 'selfcare';
}