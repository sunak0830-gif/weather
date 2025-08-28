
import { GoogleGenAI } from "@google/genai";
import type { WeatherData, Facility, FacilityCategory } from '../types';
import { FACILITY_CATEGORIES } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This will not throw in the production environment where the key is set.
  // It's a safeguard for local development.
  console.warn("API_KEY is not set. Gemini features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateWeatherSummary = async (
  facility: Facility,
  weather: WeatherData
): Promise<string> => {
  if (!API_KEY) {
    return "AI 요약 기능을 사용하려면 API 키가 필요합니다.";
  }

  const category = FACILITY_CATEGORIES.find(c => c.id === facility.category);
  const facilityType = category ? category.name : '시설';

  const prompt = `
    당신은 송파구 시설관리공단의 친절한 날씨 알리미입니다.
    주어진 시설과 날씨 정보를 바탕으로, 방문객을 위한 짧고 유용한 활동 추천 문구를 한국어로 생성해주세요.
    문구는 2~3 문장으로 부드럽고 긍정적인 어조로 작성합니다.

    - 시설 이름: ${facility.name}
    - 시설 종류: ${facilityType}
    - 현재 날씨: 기온 ${weather.temperature}°C, 날씨 상태 '${weather.condition}', 습도 ${weather.humidity}%

    예시:
    - 좋은 날씨: "[시설 이름]은(는) 오늘 화창하고 따뜻해서 [활동]하기 완벽한 날씨입니다! 가벼운 옷차림으로 상쾌한 하루를 즐겨보세요."
    - 나쁜 날씨: "오늘은 [시설 이름]에 비가 오고 있으니, 실내 활동을 계획하시는 것이 좋겠습니다. 방문 시 우산을 꼭 챙기세요."

    이제 주어진 정보로 추천 문구를 생성해주세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    // Using the recommended way to get text
    const text = response.text;
    if (text) {
      return text.trim();
    } else {
      return "AI가 날씨 요약을 생성하는 데 실패했습니다.";
    }
  } catch (error) {
    console.error("Error generating weather summary:", error);
    return "AI 요약 정보를 불러오는 중 오류가 발생했습니다.";
  }
};
