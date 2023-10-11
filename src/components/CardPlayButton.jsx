import { Pause, Play } from "./Player";
import { usePlayerStore }  from "../store/playerStore.js";

export function CardPlayButton({ id, size = 'small' }){

    const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state)
    const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;

    const handleClick = () => {
        if(isPlayingPlaylist){
            setIsPlaying(false)
            return
        }

        fetch(`/api/get-info-playlist.json?id=${id}`)
        .then(res => res.json())
        .then(data => {
            const { songs, playlist} = data
            setIsPlaying(true)
            setCurrentMusic({songs, playlist, song: songs[0]})

        })

    }

    const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-5 h-5'


    return (
        <button className="p-4 rounded-full bg-green-500 shadow-lg
        hover:scale-105 transition hover:bg-green-400/90" onClick={handleClick}>
            {isPlayingPlaylist ?  <Pause className={iconClassName} /> : <Play className={iconClassName} />}
        </button>
    )
}