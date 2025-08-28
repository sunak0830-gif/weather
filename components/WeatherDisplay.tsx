
import React, { useState, useEffect } from 'react';
import type { Facility, WeatherData } from '../types';
import { fetchWeather } from '../services/weatherService';
import { generateWeatherSummary } from '../services/geminiService';
import { SunIcon, CloudIcon, RainIcon, SnowIcon, LoadingSpinner, SparklesIcon } from './IconComponents';

interface WeatherDisplayProps {
  facility: Facility | null;
}

const WeatherIcon: React.FC<{ condition: WeatherData['condition'] }> = ({ condition }) => {
  const iconClass = "w-20 h-20 text-yellow-400";
  switch (condition) {
    case '맑음':
      return <SunIcon className={iconClass} />;
    case '구름 많음':
      return <CloudIcon className="w-20 h-20 text-slate-400" />;
    case '흐림':
        return <CloudIcon className="w-20 h-20 text-slate-500" />;
    case '비':
      return <RainIcon className="w-20 h-20 text-blue-500" />;
    case '눈':
      return <SnowIcon className="w-20 h-20 text-cyan-300" />;
    default:
      return <SunIcon className={iconClass} />;
  }
};

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ facility }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!facility) {
      setWeather(null);
      setSummary('');
      return;
    }

    const loadWeatherData = async () => {
      setIsLoading(true);
      setError(null);
      setSummary('');
      try {
        const weatherData = await fetchWeather(facility);
        setWeather(weatherData);

        const aiSummary = await generateWeatherSummary(facility, weatherData);
        setSummary(aiSummary);

      } catch (err) {
        setError('날씨 정보를 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadWeatherData();
  }, [facility]);

  if (!facility) {
    return (
      <div className="bg-white p-6 rounded-xl shadow flex items-center justify-center h-full">
        <p className="text-slate-500 text-center">시설을 선택하여 날씨 정보를 확인하세요.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center justify-center h-full">
        <LoadingSpinner className="w-12 h-12 text-blue-600" />
        <p className="mt-4 text-slate-600 animate-pulse">{facility.name}의 날씨를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-xl shadow flex items-center justify-center h-full bg-red-50">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 border-b pb-3">{facility.name}</h2>
      
      <div className="flex flex-col sm:flex-row items-center justify-around text-center sm:text-left gap-6">
        <div className="flex-shrink-0">
          <WeatherIcon condition={weather.condition} />
          <p className="font-semibold text-lg text-slate-600 mt-2">{weather.condition}</p>
        </div>
        <div className="text-6xl font-bold text-slate-700 tracking-tighter">
          {weather.temperature}°<span className="text-4xl">C</span>
        </div>
        <div className="space-y-2 text-slate-500">
          <p>체감: {weather.feelsLike}°C</p>
          <p>습도: {weather.humidity}%</p>
          <p>풍속: {weather.windSpeed}m/s</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <SparklesIcon className="w-6 h-6 text-indigo-500 mr-2" />
          <h3 className="text-lg font-semibold text-indigo-800">AI 날씨 요약</h3>
        </div>
        <p className="text-indigo-700 leading-relaxed">
          {summary || <span className="animate-pulse">AI가 요약 정보를 생성중입니다...</span>}
        </p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
