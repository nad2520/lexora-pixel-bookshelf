import PixelHeader from "@/components/PixelHeader";
import WorldMap from "@/components/WorldMap";
import QuestPanel from "@/components/QuestPanel";
import SidePanel from "@/components/SidePanel";
import BookRecommendations from "@/components/BookRecommendations";

const Index = () => {
  return (
    <div className="min-h-screen parchment-bg p-2 md:p-4 max-w-7xl mx-auto">
      <PixelHeader />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left: World Map */}
        <div className="lg:col-span-5">
          <WorldMap />
        </div>

        {/* Center: Quest Panel */}
        <div className="lg:col-span-4">
          <QuestPanel />
        </div>

        {/* Right: Side Panel */}
        <div className="lg:col-span-3">
          <SidePanel />
        </div>
      </div>

      {/* Bottom: Book Recommendations */}
      <div className="mt-3">
        <BookRecommendations />
      </div>
    </div>
  );
};

export default Index;
