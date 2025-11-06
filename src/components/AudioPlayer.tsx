
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0];
    setVolume(volumeValue);
    if (audioRef.current) {
      audioRef.current.volume = volumeValue / 100;
    }
  };

  return (
    <div className="bg-divine-light/10 border-y border-divine/10 p-3 flex items-center">
      <audio ref={audioRef} src={audioUrl} className="hidden" />
      
      <Button
        variant="ghost"
        size="icon"
        className="text-divine hover:bg-divine/10"
        onClick={togglePlayPause}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </Button>
      
      <div className="flex items-center ml-4 space-x-2">
        <Volume size={16} className="text-divine-light" />
        <Slider
          className="w-24"
          defaultValue={[volume]}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
        />
      </div>
      
      <div className="text-xs text-divine ml-3">
        आरती ऐका
      </div>
    </div>
  );
};

export default AudioPlayer;
