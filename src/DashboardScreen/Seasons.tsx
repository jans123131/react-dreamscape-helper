import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSeasons, fetchChapters } from '@/api/chapters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen } from 'lucide-react';

const Seasons = () => {
  const { data: seasonsData, isLoading: isLoadingSeasons } = useQuery({
    queryKey: ['seasons'],
    queryFn: fetchSeasons,
  });

  const { data: chaptersData, isLoading: isLoadingChapters } = useQuery({
    queryKey: ['chapters'],
    queryFn: fetchChapters,
  });

  if (isLoadingSeasons || isLoadingChapters) {
    return (
      <div className="p-6 mt-16 space-y-6">
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  return (
    <div className="p-6 mt-16 space-y-6">
      {seasonsData?.saisons.map((season) => (
        <Card key={season.id_saison} className="bg-dashboard-card border-border/40">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl font-semibold">{season.name_saison}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chaptersData?.chapters
                .filter((chapter) => chapter.id_saison === season.id_saison)
                .map((chapter) => (
                  <Card key={chapter.id_chapter} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={`https://plateform.draminesaid.com/app/uploads/${chapter.photo_chapter}`}
                        alt={chapter.name_chapter}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{chapter.name_chapter}</h3>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Seasons;