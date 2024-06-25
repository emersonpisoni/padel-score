'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const pointsMapper: { [key: number]: number } = {
  0: 0,
  1: 15,
  2: 30,
  3: 40
}

type PointsType = {
  points: { team1: number, team2: number }
}

const initialPoints = {
  points: {
    team1: 0,
    team2: 0
  }
}

export default function Game() {
  const [currentSet, setCurrentSet] = useState(initialPoints)
  const [currentGame, setCurrentGame] = useState<PointsType>(initialPoints)
  const [pastGames, setPastGames] = useState<PointsType[]>([])
  const searchParams = useSearchParams();
  const players = searchParams.get('players');
  const { player1, player2, player3, player4 } = JSON.parse(players!)

  function onAddScore(team: 'team1' | 'team2') {
    if (currentSet.points[team] === 3) {
      if (currentGame.points[team] === 5) {
        setPastGames(oldPastGames => [...oldPastGames, { ...currentGame, points: { ...currentGame.points, [team]: currentGame.points[team] + 1 } }])
        setCurrentGame(initialPoints)
        setCurrentSet(initialPoints)
        return
      }

      setCurrentGame(oldCurrentGame => ({ ...oldCurrentGame, points: { ...oldCurrentGame.points, [team]: oldCurrentGame.points[team] + 1 } }))
      setCurrentSet(initialPoints)
      return
    }
    setCurrentSet(oldSet => ({ ...oldSet, points: { ...oldSet.points, [team]: oldSet.points[team] + 1 } }))
  }

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="flex bg-white/85 rounded p-10">
        <div className="flex flex-col">
          <Input disabled value={`${player1.toUpperCase()} / ${player2.toUpperCase()}`} />
          <Input disabled value={`${player3.toUpperCase()} / ${player4.toUpperCase()}`} />
        </div>
        {pastGames.map(set => {
          return (
            <div key={JSON.stringify(set)} className="flex flex-col justify-around">
              <Label className="w-16">{set.points.team1}</Label>
              <Label className="w-16">{set.points.team2}</Label>
            </div>
          )
        })}
        <div className="flex flex-col justify-around">
          <Label className="w-16">{currentGame.points.team1}</Label>
          <Label className="w-16">{currentGame.points.team2}</Label>
        </div>
        <div className="flex flex-col justify-around">
          <Label className="w-16">{pointsMapper[currentSet.points.team1]}</Label>
          <Label className="w-16">{pointsMapper[currentSet.points.team2]}</Label>
        </div>

        <div className="flex flex-col">
          <Button onClick={() => onAddScore('team1')}>+</Button>
          <Button onClick={() => onAddScore('team2')}>+</Button>
        </div>
      </div>
    </div>
  );
}