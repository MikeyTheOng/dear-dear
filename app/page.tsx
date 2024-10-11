"use client"
import { useEffect, useState } from "react";

import Image from "next/image";
import { Heart } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Sunflower from "@/components/illustrations/svg/sunflower";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [showBack, setShowBack] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3);
  const [showSurpriseButton, setShowSurpriseButton] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (showBack) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setShowSurpriseButton(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showBack]);

  return (
    <div className="flex flex-col items-center justify-center h-screen select-none" >
      <Card className={`w-[400px] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${!showBack ? "cursor-pointer" : ""}`}>
        <CardContent className="p-6">
          {
            showBack ?
              <BackOfCard
                timeLeft={timeLeft}
                showSurpriseButton={showSurpriseButton}
                count={count}
                handleClick={() => setCount((prevCount) => {
                  console.log(prevCount);
                  if (prevCount === 3) {
                    return 2;
                  }
                  return prevCount + 1;
                })}
              /> :
              <FrontOfCard handleClick={() => setShowBack(true)} />
          }
        </CardContent>
      </Card>

    </div>
  );
}

function FrontOfCard({ handleClick }: { handleClick: () => void }) {
  return (
    <div onClick={handleClick}>
      <CardHeader className="p-0">
        <CardTitle className="text-foreground">Dear dear,</CardTitle>
        <CardDescription className="text">I wish to cheer you up, but I know that I can't poof your sorrows away.</CardDescription>
      </CardHeader>
      <div className="w-full flex items-end justify-between">
        <p className="text-sm text-muted-foreground font-bold italic">p.s. click me</p>
        <Heart className="ml-auto text-red-400" size={48} />
      </div>
    </div>
  )
}

function BackOfCard({ timeLeft, showSurpriseButton, count, handleClick }: { timeLeft: number, showSurpriseButton: boolean, count: number, handleClick: () => void }) {
  return (
    <div className={`min-h-[247px] text-start`}>
      <BackCardContent timeLeft={timeLeft} count={count} showSurpriseButton={showSurpriseButton} handleClick={handleClick} />
    </div>
  )
}

function BackCardContent({ timeLeft, count, showSurpriseButton, handleClick }: { timeLeft: number, count: number, showSurpriseButton: boolean, handleClick: () => void }) {
  if (count === 1) {
    return (
      <div>
        <Image
          src="/images/mocha_comfort_milk.jpg"
          alt="mocha comforting milk"
          width={400}
          height={400}
          className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
        />
        <Button className="mt-4 w-full bg-secondary text-secondary-foreground hover:bg-primary/50 hover:text-primary-foreground" onClick={handleClick}>
          Almost done! One more time...<Heart className="ml-2" size={16} />
        </Button>
      </div>
    )
  } else if (count === 2) {
    return (
      <div>
        <Image
          src="/images/milk_and_mocha.jpg"
          alt="milk and mocha"
          width={400}
          height={400}
          className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
        />
        <p className="mt-4 text-center flex items-center justify-center">Tada! Hope you're smiling now! <Heart className="ml-2" size={16} /><Heart className="ml-2" size={16} /><Heart className="ml-2" size={16} /></p>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col justify-between h-[247px]">
        <p className="italic text-muted-foreground mb-4">So here's a sunflower that I hope will restore your beautiful smile...</p>
        <div className="w-full flex items-end justify-between">
          <div className="w-[160px]">
            {
              showSurpriseButton ?
                <Button className="w-full mt-4 bg-secondary text-secondary-foreground hover:bg-primary/50 hover:text-primary-foreground" onClick={handleClick}>Click me! <Heart className="ml-2" size={16} /></Button> :
                <p className={`text-sm text-muted-foreground font-bold italic ${timeLeft !== 0 ? "cursor-not-allowed" : "cursor-pointer"}`}>
                  p.s. wait for it... {timeLeft}...
                </p>
            }
          </div>
          <Sunflower />
        </div>
      </div>
    )
  }
}