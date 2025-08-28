
import React, { useState, useMemo } from 'react';
import type { Facility, FacilityCategory } from './types';
import { FACILITY_CATEGORIES, FACILITIES } from './constants';
import Header from './components/Header';
import CategoryTabs from './components/CategoryTabs';
import FacilityList from './components/FacilityList';
import WeatherDisplay from './components/WeatherDisplay';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<FacilityCategory>(FACILITY_CATEGORIES[0]);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  const filteredFacilities = useMemo(() => {
    return FACILITIES.filter(facility => facility.category === selectedCategory.id);
  }, [selectedCategory]);

  const handleSelectCategory = (category: FacilityCategory) => {
    setSelectedCategory(category);
    setSelectedFacility(null); // Reset facility selection when category changes
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <Header />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <CategoryTabs 
            categories={FACILITY_CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <FacilityList 
                facilities={filteredFacilities}
                onSelectFacility={setSelectedFacility}
                selectedFacility={selectedFacility}
              />
            </div>
            <div className="md:col-span-2">
              <WeatherDisplay facility={selectedFacility} />
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} 송파구 시설관리공단. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
