
export type CategoryId = 'river' | 'parking' | 'culture' | 'sports';

export interface FacilityCategory {
  id: CategoryId;
  name: string;
}

export interface Facility {
  id: number;
  name: string;
  category: CategoryId;
}

export interface WeatherData {
  temperature: number;
  condition: '맑음' | '구름 많음' | '흐림' | '비' | '눈';
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}
