
import type { Facility, FacilityCategory } from './types';

export const FACILITY_CATEGORIES: FacilityCategory[] = [
  { id: 'sports', name: '체육시설' },
  { id: 'culture', name: '문화시설' },
  { id: 'river', name: '하천시설' },
  { id: 'parking', name: '주차시설' },
];

export const FACILITIES: Facility[] = [
  // 체육시설
  { id: 1, name: '올림픽공원 테니스장', category: 'sports' },
  { id: 2, name: '잠실종합운동장', category: 'sports' },
  { id: 3, name: '송파여성축구장', category: 'sports' },
  { id: 4, name: '탄천유수지 축구장', category: 'sports' },

  // 문화시설
  { id: 5, name: '송파도서관', category: 'culture' },
  { id: 6, name: '한성백제박물관', category: 'culture' },
  { id: 7, name: '송파문화원', category: 'culture' },

  // 하천시설
  { id: 8, name: '성내천 물놀이장', category: 'river' },
  { id: 9, name: '탄천 자전거도로', category: 'river' },
  { id: 10, name: '장지천 산책로', category: 'river' },

  // 주차시설
  { id: 11, name: '잠실역 환승 공영주차장', category: 'parking' },
  { id: 12, name: '올림픽공원 주차장', category: 'parking' },
  { id: 13, name: '가락시장 주차장', category: 'parking' },
];
